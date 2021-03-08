//Helper fn to grab WHICH attributes we want to show in the data panel. Those can be coming from either popupTemplate in case of webmaps or it can also come from layer metadata which is fetched at the layer loading point. This is the case with most non webmap layers.
import store from '../../../js/store';

import { FieldInfo } from './DataPanel';

export function getAttributesToFetch(
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
          label: f.label,
          format: f.format
        };
      });
  } else {
    //TODO: How should we handle 'service' layers with no metadata and no popup template? are those outfields supposed to be in the config? currently we are not handling such scenario
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

    const fieldNamesFromMetadata = fieldsFromMetadataCleaned?.map((f: any) => {
      return f.fieldName.toLowerCase().trim();
    });
    // Deal with matching names from metadata and from layer itself
    if (availableFieldsNames && fieldNamesFromMetadata) {
      const attributeFieldsToInclude = fieldNamesFromMetadata
        .filter((f: any) => availableFieldsNames.includes(f))
        .map((f: any) => {
          return {
            fieldName: f,
            label: fieldsFromMetadataCleaned.find(
              (field: any) => field.fieldName.toLowerCase() === f.toLowerCase()
            ).label
          };
        });
      enabledFieldInfos =
        attributeFieldsToInclude && attributeFieldsToInclude.length > 0
          ? attributeFieldsToInclude
          : null;
    } else {
      enabledFieldInfos = null;
    }
  }
  return enabledFieldInfos;
}
