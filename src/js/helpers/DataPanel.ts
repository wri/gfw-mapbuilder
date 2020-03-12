import MapView from 'esri/views/MapView';
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

//Helper fn to get all available layer fields for the data tab. If layer has fields itself we are using those, but if that is not the case, attempt to fetch it by hitting layer url endpoint with pjson prefix
async function getAllLayerFields(
  layer: __esri.FeatureLayer
): Promise<__esri.Field[] | undefined> {
  let layerFields = [] as __esri.Field[] | undefined;
  if (layer.fields) {
    layerFields = layer.fields;
  } else {
    layerFields = await fetch(`${layer.url}?f=pjson`, {
      body: null,
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data?.fields) {
          return data.fields;
        }
      });
  }
  return layerFields;
}

//Helper fn to grab WHICH attributes we want to show in the data panel. Those can be coming from either popupTemplate in case of webmaps or it can also come from layer metadata which is fetched at the layer loading point. This is the case with most non webmap layers.
interface FieldInfo {
  fieldName: string;
  label: string;
}
function getAttributesToFetch(
  layer: __esri.FeatureLayer | __esri.Sublayer,
  isSubLayer?: boolean,
  availableFields?: __esri.Field[] | undefined
): FieldInfo[] | null {
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
    const { allAvailableLayers } = store.getState().mapviewState;
    const { selectedLanguage } = store.getState().appState;
    //@ts-ignore -- weird issue when sublayer suppose to have layer prop but TS does not agree
    const layerID = isSubLayer ? layer.layer.id : layer.id;
    const layerInfo = allAvailableLayers.find(l => l.id === layerID);

    //TODO: There is a situation where metada has a field, but layer itself does not, we need to filter those out
    const availableFieldsNames = availableFields?.map(f =>
      f.name.toLowerCase().trim()
    );

    //TODO: 3x supported modifiers on the fieldName eg ACQ_DATE:DateString(hideTime:true), 4x this is no longer supported and modifiers should be added to FieldInfoFormat class. For now we are going to be sanitizing fieldNames that come from metadata (gfw api) so queries do not break. But this would need to be changed on their api end
    const fieldsFromMetadataCleaned = layerInfo?.popup?.content[
      selectedLanguage
    ].map((f: any) => {
      const newFieldName = f.fieldExpression.includes(':')
        ? f.fieldExpression.substring(0, f.fieldExpression.indexOf(':'))
        : f.fieldExpression;
      return { fieldName: newFieldName, label: f.label };
    });

    //how do we handle no metadata on popup?
    const fieldNamesFromMetadata = fieldsFromMetadataCleaned?.map((f: any) => {
      return f.fieldName.toLowerCase().trim();
    });
    // Deal with matching names from metadata and from layer itself
    if (availableFieldsNames && fieldNamesFromMetadata) {
      const attributeFieldsToInclude = fieldNamesFromMetadata
        .filter((f: any) => availableFieldsNames.includes(f))
        .map((f: any) => {
          const matchingLabel = availableFields?.find(
            (allowedField: any) => allowedField.name.toLowerCase() === f
          );
          return {
            fieldName: f,
            label: matchingLabel?.alias
          };
        });
      enabledFieldInfos =
        attributeFieldsToInclude && attributeFieldsToInclude.length > 0
          ? attributeFieldsToInclude
          : [{ fieldName: '*', label: '*' }];
    } else {
      console.log('no metadata stuff or no fieldnames?');
      enabledFieldInfos = [{ fieldName: '*', label: '*' }];
    }
  }
  return enabledFieldInfos;
}

async function fetchQueryTask(
  layer: __esri.FeatureLayer,
  mapview: MapView,
  event: __esri.MapViewClickEvent,
  isSubLayer?: boolean
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
    const allLayerFields = await getAllLayerFields(layer);
    let objectid: string | null = null;
    if (allLayerFields) {
      const layerObjectField = allLayerFields.find(
        field =>
          field.type.toLowerCase() === 'esrifieldtypeoid' ||
          field.type.toLowerCase() === 'oid'
      );
      if (layerObjectField?.name) {
        objectid = layerObjectField?.name;
        queryParams.outFields = [layerObjectField.name];
      }
    }
    const attributesToFetch = getAttributesToFetch(
      layer,
      isSubLayer,
      allLayerFields
    );
    const newOutFields = attributesToFetch?.map(f => f.fieldName);
    queryParams.outFields = queryParams.outFields.concat(newOutFields);
    const sublayerResult = await esriQuery(url, queryParams);

    if (sublayerResult.features.length > 0) {
      featureResult = sublayerResult.features.map(f => {
        return {
          attributes: f.attributes,
          geometry: f.geometry,
          objectid: objectid ? f.attributes[objectid] : null
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
  const allLayerFields = await getAllLayerFields(layer);
  let objectid: string | null = null;
  if (allLayerFields) {
    const layerObjectField = allLayerFields.find(
      field =>
        field.type.toLowerCase() === 'esrifieldtypeoid' ||
        field.type.toLowerCase() === 'oid'
    );
    if (layerObjectField?.name) {
      objectid = layerObjectField?.name;
      queryParams.outFields = [layerObjectField.name];
    }
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
          objectid: objectid ? f.attributes[objectid] : null
        };
      });
    }
  } catch (e) {
    console.error(e);
  }
  return featureResult;
}

//Feature Fetching Logic starts
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
          const features = await fetchQueryTask(sublayer, mapview, event, true);
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
          const features = await fetchQueryTask(layer, mapview, event, false);
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
