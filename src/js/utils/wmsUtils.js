import esriRequest from 'esri/request';
import geometryUtils from './geometryUtils';
import geojsonUtil from './arcgis-to-geojson';
import Deferred from 'dojo/Deferred';

export const getWMSFeatureInfo = (evt, url, layerName, extent) => {
  const deferred = new Deferred();
  const { xmin, ymin, xmax, ymax } = extent;
  esriRequest({
    url: url,
    content: {
      REQUEST: 'GetFeatureInfo',
      VERSION: '1.1.1',
      SRS: 'EPSG:3857',
      BBOX: `${xmin},${ymin},${xmax},${ymax}`,
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      QUERY_LAYERS: layerName,
      LAYERS: layerName,
      FEATURE_COUNT: 25,
      X: evt.screenPoint.x,
      Y: evt.screenPoint.y,
      INFO_FORMAT: 'application/json',
    },
  }).then((res) => {
    if (res.features && res.features.length > 0) {
      const features = res.features;
      const convertedFeatures = [];
      // create a list to hold all of the features to return
      features.forEach((feature) => {
        // create a new feature object
        const convertedFeature = {};
        // convert feature geometry to esri geometry
        const esriGeometry = geojsonUtil.geojsonToArcGIS(feature.geometry);
        // create a polygon from esri geometry
        const geometry = geometryUtils.generatePolygonInSr(esriGeometry, 4326);
        // populate the new feature object with the converted geometry and attributes
        convertedFeature.geometry = geometry;
        convertedFeature.attributes = feature.properties || {};
        // add the id in case we need to differentiate later
        convertedFeature.attributes.id = feature.id;
        // this is so we can break out of the getRawGeometry
        // function when performing analysis
        convertedFeature.attributes.isWMSFeature = true;
        convertedFeatures.push(convertedFeature);
      });
      deferred.resolve(convertedFeatures);
    }
  }, (err) => {
    console.error(err);
    deferred.resolve({ error: err });
  });
  return deferred;
};

export const getWMSLegendGraphic = (url, layerName) => {
  const deferred = new Deferred();
  esriRequest({
    url: url,
    content: {
      REQUEST: 'GetLegendGraphic',
      LAYER: layerName,
      FORMAT: 'image/png',
    },
    handleAs: 'blob',
  }).then((res) => {
    const reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onload = () => {
      const base64data = reader.result;
      deferred.resolve(base64data);
    };

    reader.onerror = () => {
      deferred.resolve({ error: 'there was a problem converting to base64' });
    };
  }, (err) => {
    console.error(err);
    deferred.resolve({ error: err });
  });
  return deferred;
};
