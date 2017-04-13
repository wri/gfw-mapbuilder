import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';

export default declare('TreeCoverGainLayer', [TileCanvasLayer], {

  filter: function (data) {
    for (var i = 0; i < data.length; i += 4) {
      // Decode the rgba/pixel so I can filter on confidence and date ranges
      var slice = [data[i], data[i + 1], data[i + 2]];

      var values = this.decodeIntensity(slice);
      //- Check against confidence, min date, and max date
      if (data[i + 3] > 0) {
        data[i] = 0; // R
        data[i + 1] = 0; // G
        data[i + 2] = 255; // B
        data[i + 3] = values.intensity;
      } else {
        data[i] = 0; // R
        data[i + 1] = 0; // G
        data[i + 2] = 0; // B
        data[i + 3] = 0;
      }

    }
    return data;
  },

  decodeIntensity: function (pixel) {
    var intensity = pixel[2];

    return {
      intensity: intensity
    };

  }

});
