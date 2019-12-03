import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';

  // Power function to determine intensity
  const getScalePowFunc = (exp) => {
  // y = m * x ^ k + b
  const domain = [0, 256];
  const range = [0, 256];
  const b = range[0] - domain[0];
  const m = (range[1] - b) / (Math.pow(domain[1], exp));

  return (x) => {
    return Math.pow(x, exp) * m + b;
  };
};

const intensityBank = {};
// Populate the intensity bank
for (let z = 1; z < 21; z++) { //each zoom level on the map
  intensityBank[z] = [];
  const exp = z < 11 ? 0.3 + ((z - 3) / 20) : 1;
  const lMoney = getScalePowFunc(exp);
  for (let f = 0; f < 256; f++) { //each potential intensity value
    intensityBank[z][f] = [];
    intensityBank[z][f].push((33 - z) + 153 - ((lMoney(f)) / z));
    intensityBank[z][f].push(z < 13 ? lMoney(f) : f);
    intensityBank[z][f].push(220);
    intensityBank[z][f].push((72 - z) + 102 - (3 * lMoney(f) / z));
  }
}

export default declare('TreeCoverLossLayer', [TileCanvasLayer], {

  setUrl: function (url) {
    this.options.url = url;
    //- Delete tiles from other canopy densities
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].canvas.remove();
      delete this.tiles[i];
    }

    for (var t = 0; t < this.tileRequests.length; t++) {
      this.tileRequests[t].abort();
    }
    this.tileRequests = [];

    const tilesToDelete = [];

    for (var c = 0; c < this._container.children.length; c++) {
      var tileId = this._container.children[c].id;
      tileId = tileId.split('_');
      if (tileId.length > 0) {
        let tileIdLevel = tileId[3];
        if (tileIdLevel) {
          tileIdLevel = parseInt(tileIdLevel);
        }
        let tileIdThresh = tileId[0];
        if (tileIdThresh) {
          tileIdThresh = parseInt(tileIdThresh);
          if (tileIdThresh !== parseInt(this.options.url.split('tc')[1].substr(0, 2))) {
            tilesToDelete.push(this._container.children[c]);
          }
        }
      }
    }
    tilesToDelete.forEach(tile => {
      tile.remove();
    });

    if (this.visible) { this.show(); }
  },

  // Filter Data Method
  filter: function(data, zoom) {
    const z = zoom;

    for (let i = 0; i < data.length; i += 4) {
      // Decode the rgba/pixel so I can filter on date ranges
      const slice = [data[i], data[i + 1], data[i + 2]];
      const values = this.decodeDate(slice);

      if (!values.intensity) { values.intensity = 0; }
      if (values.year >= (this.options.minYear) && values.year <= (this.options.maxYear)) {
        data[i] = intensityBank[z][values.intensity][2];
        data[i + 1] = intensityBank[z][values.intensity][3];
        data[i + 2] = intensityBank[z][values.intensity][0];
        data[i + 3] = intensityBank[z][values.intensity][1];
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

  decodeDate: function(pixel) {
    const year = pixel[2];
    const intensity = pixel[0];
    return { intensity, year };
  },

  setDateRange: function setDateRange (minYear, maxYear) {
    this.options.minYear = parseInt(minYear);
    this.options.maxYear = parseInt(maxYear);
    this.refresh();
  }

});
