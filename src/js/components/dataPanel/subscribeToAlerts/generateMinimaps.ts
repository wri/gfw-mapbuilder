import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import Map from '@arcgis/core/Map';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import * as print from '@arcgis/core/rest/print';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate';
import PrintParameters from '@arcgis/core/rest/support/PrintParameters';

import { geojsonToArcGIS } from '../../../../js/helpers/spatialDataTransformation';
import store from '../../../../js/store/index';
import { setAreaImages } from '../../../../js/store/appState/actions';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';

export async function generateMinimaps(areas: any): Promise<void> {
  const areaIds = areas.map((a: any) => {
    return {
      id: a.id,
      geostore: a.attributes.geostore,
    };
  });

  const localStorageAreas = Object.keys(localStorage)
    .filter((k) => k.includes('areaID'))
    .map((k) => k.split('-')[1]);

  //Any area that is not in the local storage needs to be generated
  const areasToGenerate: any[] = [];

  areaIds.forEach((area: any) => {
    if (localStorageAreas.includes(area.id)) {
      store.dispatch(setAreaImages(area.id));
    } else {
      areasToGenerate.push({ id: area.id, geostore: area.geostore });
    }
  });

  localStorageAreas.forEach((areaID) => {
    const areaInAPI = areaIds.find((area: any) => area.id === areaID);
    if (!areaInAPI) {
      localStorage.removeItem(`areaID-${areaID}`);
    }
  });

  if (areasToGenerate.length === 0) return;

  const mapRef = document.createElement('div');
  mapRef.id = 'minimap-print';
  mapRef.style.width = '500px';
  mapRef.style.height = '500px';
  mapRef.style.position = 'absolute';
  mapRef.style.left = '-999px';
  const root = document.getElementById('root');
  root?.appendChild(mapRef);
  const miniMap = new Map({
    basemap: 'streets',
  });

  const miniMapView = new MapView({
    map: miniMap,
    container: mapRef,
  });

  miniMapView.ui.remove('zoom');
  miniMapView.ui.remove('attribution');

  let gLayer = miniMap?.findLayerById('screenshot-graphics-layer') as __esri.GraphicsLayer;

  if (!gLayer) {
    gLayer = gLayer = new GraphicsLayer({
      id: 'screenshot-graphics-layer',
    });
  }
  miniMap.add(gLayer);

  const printServiceURL = store.getState().appSettings.printServiceUrl;

  const template = new PrintTemplate({
    format: 'png8',
    layout: 'map-only',
    attributionVisible: false,
    exportOptions: {
      width: 600,
      height: 500,
    },
  });

  async function executePrintTask(areaGeometry: any): Promise<__esri.PrintResponse | void | null> {
    //Check if our helper map is on the dom, if user closes the popup before it finished working through creating minimaps, it can cause issues. Thus the return here
    const mapDOMRef = document.getElementById('minimap-print');
    if (!mapDOMRef) {
      return null;
    }
    const poly = new Polygon(areaGeometry);
    const aoiGraphic = new Graphic({
      geometry: poly,
      symbol: new SimpleFillSymbol({
        style: 'solid',
        color: [210, 210, 210, 0.0],
        outline: {
          color: [3, 188, 255],
          width: 3,
        },
      }),
    });

    gLayer.graphics.removeAll();
    gLayer.graphics.add(aoiGraphic);

    return miniMapView.goTo({ target: aoiGraphic }).then(async () => {
      const params = new PrintParameters({
        view: miniMapView,
        template,
      });
      const img = await print.execute(printServiceURL!, params).catch((e: Error) => console.log(e));
      return img;
    });
  }

  async function getGeometryFromGeostore(geostore: string): Promise<any> {
    return fetch(`${geostoreURL}${geostore}`)
      .then((response) => response.json())
      .then((data) => {
        const esriGeo = geojsonToArcGIS(data.data.attributes.geojson);
        return esriGeo[0];
      })
      .catch((e) => console.error(e));
  }

  function generateDataURI(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  miniMapView.when(async () => {
    for await (const area of areasToGenerate) {
      const areaGeometry = await getGeometryFromGeostore(area.geostore);
      const img = await executePrintTask(areaGeometry.geometry);
      if (img) {
        const dataURI = await generateDataURI(img.url);
        localStorage.setItem(`areaID-${area.id}`, dataURI);
        store.dispatch(setAreaImages(area.id));
      }
    }
  });
}
