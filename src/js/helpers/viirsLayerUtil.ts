import VectorTileLayer from 'esri/layers/VectorTileLayer';
import { format, subDays, parse } from 'date-fns';
const maxDateURL =
  'https://tiles.globalforestwatch.org/nasa_viirs_fire_alerts/latest/max_alert__date';

//Getting the latest available day for tiles as it will not always be today or yesterday.
//Those assuptions cannot be made so that is why they have this endpoint to check the day.
export async function getMaxDateForViirsTiles(): Promise<string> {
  const dateRes = await fetch(maxDateURL)
    .then(res => res.json())
    .catch(e => console.log(e));
  return dateRes.data.max_date;
}

async function viirsLayer(
  id: string,
  url: string,
  visible = false,
  dayRange = 1,
  customDaterange?: string[]
): Promise<any> {
  if (customDaterange) {
    url = url.replace('{end_date}', customDaterange[1]);
    url = url.replace('{start_date}', customDaterange[0]);
  } else {
    const maxDate = await getMaxDateForViirsTiles();
    const fDate = parse(maxDate, 'yyyy-MM-dd', new Date());
    const startDate = format(subDays(fDate, dayRange), 'yyyy-MM-dd');
    url = url.replace('{end_date}', maxDate);
    url = url.replace('{start_date}', startDate);

    console.log(url);
  }
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
        id: 'viirs-points_0-1',
        type: 'circle',
        filter: ['<', 'count', 1],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#FFDA07'
        }
      },
      {
        id: 'viirs-points_1-2',
        type: 'circle',
        filter: ['all', ['>=', 'count', 1], ['<', 'count', 2]],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#FFCC00'
        }
      },
      {
        id: 'viirs-points_2-4',
        type: 'circle',
        filter: ['all', ['>=', 'count', 2], ['<', 'count', 4]],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#F76000'
        }
      },
      {
        id: 'viirs-points_4-8',
        type: 'circle',
        filter: ['all', ['>=', 'count', 4], ['<', 'count', 8]],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#FF0000'
        }
      },
      {
        id: 'viirs-points_8-16',
        type: 'circle',
        filter: ['all', ['>=', 'count', 8], ['<', 'count', 16]],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#B51212'
        }
      },
      {
        id: 'viirs-points_0-2',
        type: 'circle',
        filter: ['>=', 'count', 16],
        source: 'nasa_viirs_fire_alerts',
        'source-layer': 'nasa_viirs_fire_alerts',
        paint: {
          'circle-radius': {
            base: 0.5,
            stops: [
              [3, 0.75],
              [5, 1],
              [7, 1.5],
              [8, 1.75],
              [9, 2],
              [10, 2.5],
              [11, 3],
              [12, 4]
            ]
          },
          'circle-color': '#000000'
        }
      }
    ]
  };

  const l = new VectorTileLayer({
    style: viirsStyleJSON,
    id,
    url,
    visible
  });
  console.log(l);
  return l;
}

export default viirsLayer;
