import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';
import moment from 'moment';

// Modify the JS Date object
Date.prototype.getJulian = function() {
  // Convert date into moment Object
  const date = moment(this);
  // Get the year
  const year = date.year();
  // Create a moment object of the beginning of the year
  const startOfYear = moment(`${year}/01/01`, 'YYYY/MM/DD');
  // Find number of days passed
  const daysPassed = date.diff(startOfYear, 'days');
  // Append leading zeros if needed
  let daysPassedFormatted = daysPassed.toString();
  if (daysPassedFormatted.length < 3) {
    while (daysPassedFormatted.length < 3) {
      daysPassedFormatted = `0${daysPassedFormatted}`;
    }
  }
  // Return the correct Julian
  return `${date.format('YY')}${daysPassedFormatted}`;
};

export default declare('GladLayer', [TileCanvasLayer], {

  filter: function (data) {
    const todayDate = new Date().getJulian();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const weekAgoJulian = twoWeeksAgo.getJulian();
    for (var i = 0; i < data.length; i += 4) {
      var values = this.decodeDate(data[i], data[i + 1], data[i + 2]);

      // Check if pixel date is between Julian Date properties above
      if (values.date > this.options.minDateValue && values.date < this.options.maxDateValue) {
        // Check if we are only examining confirmed cases or not
        if (this.options.confidence.length === 1) {
          if (values.confidence > 0) {
            data[i + 3] = values.intensity;
            // Make the pixel pink for glad alerts
            if (values.date > weekAgoJulian && values.date < todayDate) {
              // Make the pixel yellow for recent alerts
              data[i] = 224; // R
              data[i + 1] = 190; // G
              data[i + 2] = 7; // B
            } else {
              data[i] = 220; // R
              data[i + 1] = 102; // G
              data[i + 2] = 153; // B
            }
          } else {
            // Hide the pixel
            data[i + 3] = 0;
            data[i + 2] = 0;
            data[i + 1] = 0;
            data[i] = 0;
          }
        // Glad is not confirmed
        } else {
          data[i + 3] = values.intensity;
          if (values.date > weekAgoJulian && values.date < todayDate) {
            // Make the pixel yellow for recent alerts
            data[i] = 224; // R
            data[i + 1] = 190; // G
            data[i + 2] = 7; // B
          } else {
              // Make the pixel pink for glad alerts
            data[i] = 220; // R
            data[i + 1] = 102; // G
            data[i + 2] = 153; // B
          }
        }
      // Hide pixel if outside of date range
      } else {
        // Hide the pixel
        data[i + 3] = 0;
        data[i + 2] = 0;
        data[i + 1] = 0;
        data[i] = 0;
      }

    }
    return data;
  },

  pad: function (num) {
    var str = '00' + num;
    return str.slice(str.length - 3);
  },

  decodeDate: function (pixelOne, pixelTwo, pixelThree) {

    const total_days = pixelOne * 255 + pixelTwo;
    const year_int = parseInt(total_days / 365) + 15;

    const band3_str = this.pad(pixelThree.toString());

    const intensity_raw = parseInt(band3_str.slice(1, 3));

    let intensity = intensity_raw * 50;
    if (intensity > 255) {
      intensity = 255;
    }
    return {
      confidence: parseInt(band3_str[0]) - 1,
      intensity: intensity,
      date: parseInt(year_int * 1000) + total_days % 365
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
