import Graphic from '@arcgis/core/Graphic';
import * as esriIntl from '@arcgis/core/intl';
import store from '../../../js/store';
import { esriQuery } from './esriQuery';
import { getAttributesToFetch } from './getAttributes';
import { formatAttributeValues } from './formatAttributes';
import { setActiveFeatures } from '../../../js/store/mapview/actions';
import { LayerFeatureResult, FeatureResult, FieldName } from '../../../js/store/mapview/types';
import { selectActiveTab } from '../../../js/store/appState/actions';
import { layerIsInScale } from '../../../js/helpers/layerScaleCheck';
import { viirsFieldNames } from '../../../js/helpers/viirsLayerUtil';

export interface FormatOptions {
  dateFormat: null | any;
  digitSeparator: boolean;
  places: number;
}
export interface FieldInfo {
  fieldName: string;
  label: string;
  format?: FormatOptions;
}

//Helper fn to get all available layer fields for the data tab. If layer has fields itself we are using those, but if that is not the case, attempt to fetch it by hitting layer url endpoint with pjson prefix
type LayerFieldInfos = {
  layerFields: __esri.Field[] | undefined;
  displayField: string;
};

async function fetchVIIRSFeatures(mapview: __esri.MapView, mapPoint: any, viirsConfig: any): Promise<any> {
  const { appState } = store.getState();
  //@ts-ignore
  let url = viirsConfig?.metadata.interactionConfig.config.url;

  const params = `?lat=${mapPoint.latitude}&lng=${mapPoint.longitude}&z=${mapview.zoom}&start_date=${appState.leftPanel.viirsStart}&end_date=${appState.leftPanel.viirsEnd}`;
  url = url.concat(params);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((e) => console.log(e));
}

export async function getAllLayerFields(layer: __esri.FeatureLayer): Promise<LayerFieldInfos> {
  let layerFields = [] as __esri.Field[] | undefined;
  let displayField = '';
  if (layer.fields) {
    layerFields = layer.fields;
    displayField = layer.displayField;
  } else {
    layerFields = await fetch(`${layer.url}?f=pjson`, {
      body: null,
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.fields) {
          displayField = data.displayField;
          return data.fields;
        }
      });
  }
  return { layerFields, displayField };
}

async function fetchQueryTask(
  layer: __esri.FeatureLayer,
  mapview: __esri.MapView,
  event: __esri.MapViewClickEvent,
  isSubLayer?: boolean
): Promise<{
  fieldNames: FieldName[] | null;
  features: FeatureResult[];
  displayField: string;
}> {
  let featureResult = [] as FeatureResult[];
  let fieldNames = [] as FieldName[] | null;
  const queryParams: any = {
    where: '1=1',
    outFields: ['*'],
    units: 'miles',
    // distance: 0.01 * mapview.resolution, //reduce the distance if you want more precision
    geometry: event.mapPoint,
    // geometryPrecision: 1,
    returnGeometry: true,
  };
  const url = layer.url;
  let displayField = '';
  try {
    const { layerFields: allLayerFields, displayField: fetchedField } = await getAllLayerFields(layer);
    displayField = fetchedField;
    let objectid: string | null = null;
    if (allLayerFields) {
      const layerObjectField = allLayerFields.find(
        (field) => field.type.toLowerCase() === 'esrifieldtypeoid' || field.type.toLowerCase() === 'oid'
      );
      if (layerObjectField?.name) {
        objectid = layerObjectField?.name;
        queryParams.outFields = [layerObjectField.name];
      }
    }
    const attributesToFetch = getAttributesToFetch(layer, isSubLayer, allLayerFields);
    fieldNames = attributesToFetch;
    const newOutFields = attributesToFetch?.map((f) => f.fieldName);
    queryParams.outFields = newOutFields ? queryParams.outFields.concat(newOutFields) : ['*'];
    const sublayerResult = await esriQuery(url, queryParams);

    if (sublayerResult.features.length > 0) {
      featureResult = sublayerResult.features.map((f) => {
        const formattedAttributes = formatAttributeValues(f.attributes, fieldNames, esriIntl);
        return {
          attributes: formattedAttributes,
          geometry: f.geometry,
          objectid: objectid ? f.attributes[objectid] : null,
        };
      });
    }
  } catch (e) {
    console.error(e);
  }

  return { features: featureResult, fieldNames, displayField };
}

async function fetchQueryFeatures(
  layer: __esri.FeatureLayer,
  event: __esri.MapViewClickEvent,
  view: __esri.MapView
): Promise<any> {
  let featureResult = [] as FeatureResult[];
  let fieldNames = [] as any[] | null;

  const queryParams: any = {
    where: '1=1',
    outFields: ['*'],
    geometry: event.mapPoint || event,
    returnGeometry: true,
    units: 'miles',
    distance: 0.02 * view.resolution,
  };

  const attributesToFetch = getAttributesToFetch(layer);
  fieldNames = attributesToFetch;
  const { layerFields: allLayerFields, displayField } = await getAllLayerFields(layer);
  let objectid: string | null = null;
  if (allLayerFields) {
    const layerObjectField = allLayerFields.find(
      (field) => field.type.toLowerCase() === 'esrifieldtypeoid' || field.type.toLowerCase() === 'oid'
    );
    if (layerObjectField?.name) {
      objectid = layerObjectField?.name;
      queryParams.outFields = [layerObjectField.name];
    }
  }

  queryParams.outFields = ['*'];
  try {
    const featureResults = await layer.queryFeatures(queryParams);
    //Ignore empty results
    if (featureResults.features.length > 0) {
      featureResult = featureResults.features.map((f: any) => {
        return {
          attributes: f.attributes,
          geometry: f.geometry,
          objectid: objectid ? f.attributes[objectid] : null,
        };
      });
    }
  } catch (e) {
    console.error(e);
  }

  return { features: featureResult, fieldNames, displayField };
}

//Feature Fetching Logic starts
export async function queryLayersForFeatures(
  mapview: __esri.MapView,
  map: __esri.Map | undefined,
  event: __esri.MapViewClickEvent
): Promise<void> {
  //Figure out if we have custom popup from the config or not
  const { mapviewState, appState } = store.getState();
  const lang = appState.selectedLanguage;
  const layerFeatureResults: LayerFeatureResult[] = [];
  //TODO: This is where we would add exceptions to layers (e.g. TREE_COVER_LOSS/GAIN should not be querable etc)
  // we need exhaustive list here!
  const allLayersVisibleLayers: any = map?.layers
    .filter(
      (l: any) =>
        l.visible &&
        layerIsInScale(l, mapview.scale) &&
        l.type !== 'graphics' &&
        l.type !== 'base-tile' &&
        l.type !== 'imagery' &&
        l.id !== 'MASK'
    )
    .toArray();

  if (allLayersVisibleLayers) {
    for await (const layer of allLayersVisibleLayers) {
      //for each layer we check if it has subs or not
      if (layer.sublayers && layer.sublayers.length > 0) {
        for (const sublayer of layer.sublayers.items) {
          if (!sublayer.visible) continue;
          //sublayers do not have a type, so it always defaults to QueryTask
          const { features, fieldNames, displayField } = await fetchQueryTask(sublayer, mapview, event, true);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              sublayerID: sublayer.id,
              sublayerTitle: sublayer.title,
              features: features,
              fieldNames,
              displayField,
            });
          }
        }
      } else {
        //layer does not have subs, query just the layer itself!
        if (layer.type === 'feature' || layer.type === 'csv' || layer.type === 'geojson' || layer.type === 'scene') {
          //deal with queryFeatures() approach
          const { features, fieldNames, displayField } = await fetchQueryFeatures(layer, event, mapview);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              features: features,
              fieldNames,
              displayField,
            });
          }
        } else if (layer.type === 'vector-tile' && layer.id === 'VIIRS_ACTIVE_FIRES') {
          const viirsConfig = mapviewState.allAvailableLayers.find((l) => l.id === 'VIIRS_ACTIVE_FIRES');
          if (!viirsConfig) return;

          const viirsFeatures = await fetchVIIRSFeatures(mapview, event.mapPoint, viirsConfig);

          if (viirsFeatures.length > 0) {
            const popFeats = viirsFeatures.map((f: any) => {
              const markerSymbol = {
                type: 'simple-marker',
                color: [226, 119, 40],
              };
              const point: any = {
                type: 'point',
                longitude: f.longitude,
                latitude: f.latitude,
              };
              const popF = new Graphic({
                geometry: point,
                symbol: markerSymbol,
                attributes: f,
              });
              return popF;
            });

            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: viirsConfig.label[lang],
              features: popFeats,
              fieldNames: viirsFieldNames,
            });
          }
        } else {
          //use generic QueryTask approach
          const { features, fieldNames, displayField } = await fetchQueryTask(layer, mapview, event, false);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              features: features,
              fieldNames,
              displayField,
            });
          }
        }
      }
    }
  }

  //Save all features to the redux store
  store.dispatch(setActiveFeatures(layerFeatureResults));

  //Open data tab
  // const { appState } = store.getState();
  if (appState.leftPanel.activeTab !== 'data') {
    store.dispatch(selectActiveTab('data'));
  }
}
