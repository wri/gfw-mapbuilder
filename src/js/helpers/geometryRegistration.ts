import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import { arcgisToGeoJSON } from '../../js/helpers/spatialDataTransformation';
import { FeatureResult } from '../../js/store/mapview/types';

export async function registerGeometry(feature: FeatureResult): Promise<any> {
  let geographic;

  if (feature.geometry.spatialReference.wkid === 4326) {
    geographic = feature.geometry;
  } else {
    geographic = webMercatorUtils.webMercatorToGeographic(feature.geometry);
  }

  const geojson = arcgisToGeoJSON(geographic);
  const geoStore = {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: geojson,
        },
      ],
    },
  };
  const content = JSON.stringify(geoStore);

  //Geostore API endpoint sometimes fails to register geometry, we are trying up to 3 times and then failing out
  function fetchRetry(url: string, options = {}, retries = 3): any {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) return res;
        if (retries > 0) {
          return fetchRetry(url, options, retries - 1);
        } else {
          throw new Error('error in fetching geostore results');
        }
      })
      .catch((e) => console.error(e));
  }
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: content,
  };

  const res = fetchRetry('https://production-api.globalforestwatch.org/v1/geostore', options, 3);
  return res;
}
