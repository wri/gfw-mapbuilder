import esriRequest from 'esri/request';
import esriConfig from 'esri/config';
import Graphic from 'esri/graphic';
import InfoTemplate from 'esri/InfoTemplate';
import symbols from 'utils/symbols';
import geometryUtils from './geometryUtils';
import geojsonUtil from './arcgis-to-geojson';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';

export const getWMSFeatureInfo = (evt, layer, extent) => {
  const deferred = new Deferred();
  const { xmin, ymin, xmax, ymax } = extent;
  esriRequest({
    url: layer.url,
    content: {
      REQUEST: 'GetFeatureInfo',
      VERSION: layer.version,
      ...(layer.version === '1.3.0' ? {CRS: 'EPSG:3857'} : {SRS: 'EPSG:3857'}),
      BBOX: `${xmin},${ymin},${xmax},${ymax}`,
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      QUERY_LAYERS: layer.visibleLayers[0],
      LAYERS: layer.visibleLayers[0],
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
        // if we don't have a geometry it's a point or line or something we won't run analysis on
        if (!feature.geometry) { return; }
        // create a new feature object
        const convertedFeature = {};
        // convert feature geometry to esri geometry
        const esriGeometry = geojsonUtil.geojsonToArcGIS(feature.geometry);
        // create a polygon from esri geometry in WebMercator
        const geometry = geometryUtils.generatePolygonInSr(esriGeometry, 102100);
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
  }, () => {
    deferred.resolve({
      error: 'an error occurred while getting feature info. This usually means layer \'' + layer.visibleLayers[0] + '\' is not queryable'
    });
  });
  return deferred;
};

export const getWMSLegendGraphic = (url, layerName, version) => {
  const deferred = new Deferred();
  if (esriConfig.defaults.io.corsEnabledServers.indexOf(url) === -1) {
    esriConfig.defaults.io.corsEnabledServers.push(url);
  }
  esriRequest({
    url: url,
    content: {
      REQUEST: 'GetLegendGraphic',
      LAYER: decodeURIComponent(layerName),
      FORMAT: 'image/png',
      VERSION: version
    },
    handleAs: 'blob',
  }).then((res) => {

    if (res.type !== 'image/png') {
      deferred.resolve({
        error: 'there was an error retrieving legend info. Expected type: \'image/png\', got \'' + res.type + '\''
      });
      return;
    }
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

export const wmsClick = (evt, layers, extent) => {
  const wmsPromises = {};

  layers.forEach(layer => {
    wmsPromises[layer.id] = getWMSFeatureInfo(evt, layer, extent);
  });
  return all(wmsPromises);
};

export const createWMSGraphics = (responses, layerId, wmsGraphics) => {
  responses[layerId].forEach((feature) => {
    const { attributes, geometry } = feature;

    const attributesToSkip = [
      'isWMSFeature'
    ];

    let infoTemplateContent = '<div class="esriViewPopup"><div class="mainSection">';
    infoTemplateContent += '<table class="attrTable">';
    Object.keys(attributes).forEach(attr => {
      if (attributesToSkip.includes(attr)) { return; }

      infoTemplateContent += '<tr><td class="attrName">' + attr + '</td>'
        + '<td class="attrValue">' + attributes[attr] + '</td></tr>';
    });
    infoTemplateContent += '</table></div></div>';

    const graphic = new Graphic(
      geometry,
      symbols.getCustomSymbol(),
      {
        ...attributes,
      },
      new InfoTemplate({
        content: infoTemplateContent
      })
    );
    wmsGraphics.push(graphic);
  });
};
