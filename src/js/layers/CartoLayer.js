import CartoLayerBase from './CartoLayerBase';
import declare from 'dojo/_base/declare';

export default declare('CartoLayer', [CartoLayerBase], {
  queryBuilder: function() {
    this.getLayers();
  }
});
