import * as webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
import { arcgisToGeoJSON } from 'src/js/utils/geojson.config';
import { FeatureResult } from 'js/store/mapview/types';

//TODO: Will need to type this better
export function registerGeometry(feature: FeatureResult): Promise<any> {
  const geographic = webMercatorUtils.webMercatorToGeographic(feature.geometry);
  const geojson = arcgisToGeoJSON(geographic);
  const geoStore = {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: geojson
        }
      ]
    }
  };
  const content = JSON.stringify(geoStore);

  //TODO: Extract to the endpoints config file
  return fetch('https://production-api.globalforestwatch.org/v1/geostore', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: content
  });
}
