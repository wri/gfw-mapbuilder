import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';


export default declare('GFWImageryLayer', [TileCanvasLayer], {
  filter: function (data) {
    return data;
  },

  setUrl: function setUrl (url) {
    this.options.url = url;
    this._extentChanged(true);
  }

});
