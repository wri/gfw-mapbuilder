import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Map from 'esri/Map';
import store from 'js/store';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { LayerFeatureResult, FeatureResult } from 'js/store/mapview/types';
import { selectActiveTab } from 'js/store/appState/actions';

//Generic ESRI query helper
function esriQuery(url: string, queryParams: any): Promise<__esri.FeatureSet> {
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}

//Helper to fetch name field for the objectids due to inconsistent naming and application requiring object id for attachment fetching
async function getLayerFields(
  layer: __esri.FeatureLayer
): Promise<__esri.Field | undefined> {
  let layerObjectField = {} as __esri.Field | undefined;
  if (layer.fields) {
    layerObjectField = layer.fields.find(
      field =>
        field.type.toLowerCase() === 'esrifieldtypeoid' ||
        field.type.toLowerCase() === 'oid'
    );
  } else {
    layerObjectField = await fetch(`${layer.url}?f=pjson`, {
      body: null,
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data?.fields) {
          const objectidName = data.fields.find(
            (field: __esri.Field) =>
              field.type.toLowerCase() === 'esrifieldtypeoid' ||
              field.type.toLowerCase() === 'oid'
          );
          return objectidName;
        }
      });
  }
  return layerObjectField;
}

interface FieldInfo {
  fieldName: string;
  label: string;
}
function getAttributesToFetch(layer: __esri.FeatureLayer): FieldInfo[] | null {
  //Check for popupTemplate > this handles webmap layers
  let enabledFieldInfos: FieldInfo[] | null = null;
  if (layer.popupTemplate) {
    enabledFieldInfos = layer.popupTemplate.fieldInfos
      .filter(f => f.visible)
      .map(f => {
        return {
          fieldName: f.fieldName,
          label: f.label
        };
      });
  } else {
    //No popup template found, check the metadata
    debugger;
    enabledFieldInfos = [{ fieldName: '*', label: '*' }];
    console.log('no popupTemplate found, lets dig into metadata');
    console.log(layer);
  }
  return enabledFieldInfos;
}

async function fetchQueryTask(
  layer: __esri.FeatureLayer,
  mapview: MapView,
  event: __esri.MapViewClickEvent
): Promise<FeatureResult[]> {
  let featureResult = [] as FeatureResult[];
  const queryParams: any = {
    where: '1=1',
    outFields: [],
    units: 'miles',
    distance: 0.02 * mapview.resolution,
    geometry: event.mapPoint,
    returnGeometry: true
  };
  const url = layer.url;
  try {
    const layerFields = await getLayerFields(layer);
    if (layerFields?.name) {
      queryParams.outFields.push(layerFields.name);
    }
    const attributesToFetch = getAttributesToFetch(layer);
    const newOutFields = attributesToFetch?.map(f => f.fieldName);
    queryParams.outFields.push(newOutFields);
    const sublayerResult = await esriQuery(url, queryParams);

    if (sublayerResult.features.length > 0) {
      featureResult = sublayerResult.features.map(f => {
        return {
          attributes: f.attributes,
          geometry: f.geometry,
          objectid: layerFields?.name ? f.attributes[layerFields.name] : null
        };
      });
    }
  } catch (e) {
    console.error(e);
  }
  return featureResult;
}

async function fetchQueryFeatures(
  layer: __esri.FeatureLayer,
  mapview: MapView,
  event: __esri.MapViewClickEvent
): Promise<FeatureResult[]> {
  let featureResult = [] as FeatureResult[];
  const queryParams: any = {
    where: '1=1',
    outFields: [],
    units: 'miles',
    distance: 0.02 * mapview.resolution,
    geometry: event.mapPoint,
    returnGeometry: true
  };
  const attributesToFetch = getAttributesToFetch(layer);
  const layerFields = await getLayerFields(layer);
  if (layerFields?.name) {
    queryParams.outFields.push(layerFields.name);
  }
  const newOutFields = attributesToFetch?.map(f => f.fieldName);
  queryParams.outFields.push(newOutFields);
  try {
    const featureResults = await layer.queryFeatures(queryParams);
    //Ignore empty results
    if (featureResults.features.length > 0) {
      featureResult = featureResults.features.map((f: any) => {
        return {
          attributes: f.attributes,
          geometry: f.geometry,
          objectid: layerFields?.name ? f.attributes[layerFields.name] : null
        };
      });
    }
  } catch (e) {
    console.error(e);
  }
  return featureResult;
}

//Client Side Feature Fetching
export async function queryLayersForFeatures(
  mapview: MapView,
  map: Map | undefined,
  event: __esri.MapViewClickEvent
): Promise<void> {
  const layerFeatureResults: LayerFeatureResult[] = [];

  //TODO: This is where we would add exceptions to layers (e.g. TREE_COVER_LOSS/GAIN should not be querable etc)
  // we need exhaustive list here!
  const allLayersVisibleLayers: any = map?.layers
    .filter(
      l =>
        l.visible &&
        l.type !== 'graphics' &&
        l.type !== 'base-tile' &&
        l.type !== 'imagery'
    )
    .toArray();
  if (allLayersVisibleLayers) {
    for await (const layer of allLayersVisibleLayers) {
      //for each layer we check if it has subs or not
      if (layer.sublayers && layer.sublayers.length > 0) {
        for (const sublayer of layer.sublayers.items) {
          //sublayers do not have a type, so it always defaults to QueryTask
          //use generic QueryTask approach
          const features = await fetchQueryTask(sublayer, mapview, event);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              sublayerID: sublayer.id,
              sublayerTitle: sublayer.title,
              features: features
            });
          }
        }
      } else {
        //layer does not have subs, query just the layer itself!
        if (
          layer.type === 'feature' ||
          layer.type === 'csv' ||
          layer.type === 'geojson' ||
          layer.type === 'scene'
        ) {
          //deal with queryFeatures() approach
          const features = await fetchQueryFeatures(layer, mapview, event);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              sublayerID: null,
              sublayerTitle: null,
              features: features
            });
          }
        } else {
          //use generic QueryTask approach
          const features = await fetchQueryTask(layer, mapview, event);
          if (features.length > 0) {
            layerFeatureResults.push({
              layerID: layer.id,
              layerTitle: layer.title,
              sublayerID: null,
              sublayerTitle: null,
              features: features
            });
          }
        }
      }
    }
  }
  //Save all features to the redux store
  store.dispatch(setActiveFeatures(layerFeatureResults));

  //Open data tab
  const { appState } = store.getState();
  if (appState.leftPanel.activeTab !== 'data') {
    store.dispatch(selectActiveTab('data'));
  }
}
