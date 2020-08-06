import VectorTileLayer from 'esri/layers/VectorTileLayer';
import moment from 'moment';

const maxDateURL =
  'https://tiles.globalforestwatch.org/nasa_viirs_fire_alerts/latest/max_alert__date';
const layerURL =
  'https://tiles.globalforestwatch.org/nasa_viirs_fire_alerts/latest/dynamic/{start_date}/{end_date}/VectorTileServer';
//Getting the latest available day for tiles as it will not always be today or yesterday.
//Those assuptions cannot be made so that is why they have this endpoint to check the day.
async function getMaxDateForViirsTiles(): Promise<string> {
  const dateRes = await fetch(maxDateURL)
    .then(res => res.json())
    .catch(e => console.log(e));
  return dateRes.data.max_date;
}

export async function viirsLayerCreator(
  id: string,
  visible = false,
  order = undefined,
  dayRange = 7
): Promise<VectorTileLayer> {
  const maxDate = await getMaxDateForViirsTiles();
  const startDate = moment(maxDate)
    .subtract(dayRange, 'days')
    .format('YYYY-MM-DD');
  let url = layerURL;
  url = url.replace('{end_date}', maxDate);
  url = url.replace('{start_date}', startDate);
  console.log(url);

  //This json is reponsonsible for VIIRS layer visualization
  //We can adjust the size of the dots, color and scaling stops to our needs
  //This follows mapbox styling spec: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
  const viirsStyleJSON = {
    version: 8,
    sources: {
      nasa_viirs_fire_alerts: {
        type: 'vector',
        url: url
      }
    },
    layers: [
      {
        id: 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 1],
              [5, 1.5],
              [7, 2],
              [8, 2.5],
              [9, 3],
              [10, 3.5],
              [11, 4],
              [12, 5]
            ]
          },
          'circle-color': '#F76000'
        },
        type: 'circle',
        'source-layer': 'nasa_viirs_fire_alerts',
        source: 'nasa_viirs_fire_alerts'
      }
    ]
  };

  return new VectorTileLayer({
    style: viirsStyleJSON,
    id,
    visible
  });
}
