import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';

function pad (num) {
  var str = '00' + num;
  return str.slice(str.length - 3);
}

export default declare('GladLayer', [TileCanvasLayer], {

  filter: function (data) {
    for (var i = 0; i < data.length; i += 4) {
      // Decode the rgba/pixel so I can filter on confidence and date ranges
      var slice = [data[i], data[i + 1], data[i + 2]];
      var values = this.decodeDate(slice);
      //- Check against confidence, min date, and max date
      if (
        values.date >= this.options.minDateValue &&
        values.date <= this.options.maxDateValue &&
        this.options.confidence.indexOf(values.confidence) > -1
      ) {
        // Set the alpha to the intensity
        data[i + 3] = values.intensity;
        // Make the pixel pink for glad alerts
        // Note, this may mess up the decode date function if it's called at a future date as the decoded information comes from the pixel
        data[i] = 220; // R
        data[i + 1] = 102; // G
        data[i + 2] = 153; // B
      } else {
        // Hide the pixel
        data[i + 3] = 0;
      }
    }
    return data;
  },

  decodeDate: function (pixel) {
    // Find the total days of the pixel by multiplying the red band by 255 and adding the green band
    const totalDays = (pixel[0] * 255) + pixel[1];
    // Dived the total days by 365 to get the year offset, add 15 to this to get current year
    // Example, parseInt(totalDays / 365) = 1, add 15, year is 2016
    const yearAsInt = totalDays / 365 + 15;
    // Multiple by 1000 to get in YYDDD format, i.e. 15000 or 16000
    const year = yearAsInt * 1000;
    // Add the remaining days to get the julian day for that year
    const julianDay = totalDays % 365;
    // Add julian to year to get the data value
    const date = ~~(year + julianDay);
    // Convert the blue band to a string and pad with 0's to three digits
    // It's rarely not three digits, except for cases where there is an intensity value and no date/confidence.
    // This is due to bilinear resampling
    const band3Str = pad(pixel[2]);
    // Parse confidence, confidence is stored as 1/2, subtract 1 so it's values are 0/1
    const confidence = ~~band3Str[0] - 1;
    // Parse raw intensity to make it visible, it is the second and third character in blue band, it's range is 1 - 55
    const rawIntensity = band3Str.slice(1, 3);
    // Scale it to make it visible
    let intensity = rawIntensity * 50;
    // Prevent intensity from being higher then the max value
    if (intensity > 255) { intensity = 255; }
    intensity = ~~intensity;
    // Return all components needed for filtering/labeling
    return {
      confidence: confidence,
      intensity: intensity,
      date: date
    };
  },

  setDateRange: function setDateRange (minDate, maxDate) {
    this.options.minDateValue = parseInt(minDate);
    this.options.maxDateValue = parseInt(maxDate);
    this.refresh();
  },

  setConfidenceLevel: function setConfidenceLevel (confidence) {
    //- Confidence can be 'all' or 'confirmed'
    this.options.confidence = confidence === 'all' ? [0, 1] : [1];
    this.refresh();
  }

});
