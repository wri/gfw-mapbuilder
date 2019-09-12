import SpatialReference from 'esri/SpatialReference';
import {attributes} from 'constants/AppConstants';
import InfoTemplate from 'esri/InfoTemplate';
import Polygon from 'esri/geometry/Polygon';
import symbols from 'utils/symbols';
import Graphic from 'esri/graphic';
import Deferred from 'dojo/Deferred';
import analysisUtils from 'utils/analysisUtils';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';

//- Really crappy UUID generator but it works
let cfid = 0;
const customFeatureUUIDGenerator = () => ++cfid;

export default {

  /**
  * @param {object} geometry - Valid esri grometry from the draw tool, any valid polygon geo would work
  * @return {Graphic}
  */
  generateDrawnPolygon: (geom) => {
    let geometry = geom;
    if (geometry.spatialReference.isWebMercator() === false) {
      geometry = webMercatorUtils.geographicToWebMercator(geometry);
    }
    const deferred = new Deferred();
    analysisUtils.registerGeom(geometry).then(res => {
      const id = customFeatureUUIDGenerator();
      deferred.resolve(new Graphic(
        new Polygon(geometry),
        symbols.getCustomSymbol(),
        {
          cfid: id,
          source: attributes.SOURCE_DRAW,
          title: `Custom Feature #${id}`,
          geostoreId: res.data.id
        },
        new InfoTemplate({
          title: '${title}',
          content: '<div class=\'custom-feature__content\'>Temp Id: ${cfid}</div>'
        })
      ));
    });
    return deferred;
  },

  /**
  * Create a polygon so I have a valid ArcGIS Polygon to use for requests since querying a
  * MapService/dynamicLayer would return just the geometry and not a polygon
  * @param {object} geometry - returned from a query against a MapService/dynamicLayer
  * @param {number} spatialReference - numeric value for the desired spatial ref, e.g. 102100 or 4326
  * @return {Polygon} - Valid Esri Polygon
  */
  generatePolygonInSr: (geometry, spatialReference) => {
    const polygon = new Polygon(geometry);
    polygon.setSpatialReference(new SpatialReference(spatialReference));
    return polygon;
  },

  /**
  * This currently only supports polygon uploads
  * @param {object} - featureCollection - Feature Collection returned from Esri's generate features API
  * @return {array<Graphic>}
  */
  generatePolygonsFromUpload: (featureCollection) => {
    const graphics = [];
    // Create an array of features from all the layers and feature sets
    featureCollection.layers.forEach((layer) => {
      const {featureSet} = layer;
      featureSet.features.forEach((feature) => {
        graphics.push(new Graphic(
          new Polygon(feature.geometry),
          symbols.getCustomSymbol(),
          {
            ...feature.attributes,
            source: attributes.SOURCE_UPLOAD
          }
        ));
      });
    });

    return graphics;
  }

};
