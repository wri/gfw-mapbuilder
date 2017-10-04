import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';

export default declare('TreeCoverLossLayer', [TileCanvasLayer], {

  setUrl: function (url) {
    this.options.url = url;
    // this.refresh();
  },

  filter: function (data) {
      for (var i = 2; i < data.length + 2; i += 4) {
        // Decode the rgba/pixel so I can filter on confidence and date ranges
        var slice = [data[i], data[i + 1], data[i + 2]];
        var values = this.decodeDate(slice);
        //- Check against min and max date

        if (
          values.year >= this.options.minYear &&
          values.year <= this.options.maxYear
        ) {
          // Set the alpha to the intensity
          data[i + 3] = values.intensity;
          // Make the pixel pink for HANSEN alerts

          data[i] = 153; // B
          data[i + 1] = values.intensity;
          data[i + 2] = 220; // R
          data[i + 3] = 102; // G
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

  decodeDate: function (pixel) {
    var year = pixel[0];
    var intensity = pixel[2];

    return {
      intensity: intensity,
      year: year
    };
  },

  setDateRange: function setDateRange (minYear, maxYear) {
    this.options.minYear = parseInt(minYear);
    this.options.maxYear = parseInt(maxYear);
    this.refresh();
  }

});
