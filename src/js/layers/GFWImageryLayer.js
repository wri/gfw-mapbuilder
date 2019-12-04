import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';


export default declare('GFWImageryLayer', [TileCanvasLayer], {
  filter: function (data) {
    return data;
  },

  setUrl: function setUrl (url) {
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

    this._extentChanged(true);
  }

});
