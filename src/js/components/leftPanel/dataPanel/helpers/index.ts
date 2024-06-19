interface TimestampDateParams {
  checkList: string[];
  value: number | undefined | null;
  label: string;
}

interface FieldParams {
  label: string;
  fieldExpression: string;
}
interface ContentParams {
  content: {
    en: FieldParams[];
    title: string;
  };
}

interface AttributesToDisplayParams {
  attributes: any;
  fieldNames: any;
  newFields: any;
}

export interface IContent {
  label: string;
  fieldExpression: string;
}

export interface IPopup {
  title: { en: string };
  content: { en: IContent[] };
}

export interface ILayer {
  id: string;
  label?: { en: string };
  popup?: IPopup;
  type: string;
  url: string;
}

interface SetLocalStorageAttributesParams extends AttributesToDisplayParams {
  layerTitle: string;
}

const IMAGE_TYPES = ['jpg', 'png', 'jpeg', 'webp'];
const VIDEO_TYPES = ['mp4', 'mov'];

const convertTimestampToStringDate = (value: number) => {
  return new Date(value).toLocaleString();
};

/**
 *
 * @param params {
 * checkList: string[];  list of labels to convert to string date
 * value: number | undefined | null;  value to convert to string date
 * label: string;  label to check if it is in checkList
 * }
 * @returns string date or empty string
 */
export const handleTimestampDate = (params: TimestampDateParams) => {
  const { checkList, value, label } = params;

  if (value === undefined || value === null) return '';

  if (typeof value === 'string') return value;

  if (label.toLocaleLowerCase().includes('date') || checkList?.includes(label)) {
    return convertTimestampToStringDate(value);
  }

  return value;
};

export const updateContentProperties = (content: ContentParams | null, lang: string) => {
  if (!content) return null;

  let defaultLang = 'en';

  let fields;
  if (content.content[lang]) {
    fields = content.content[lang];
  } else {
    // if lang is not available, default to english
    fields = content.content[defaultLang];
  }

  return fields.map((field) => {
    const { label, fieldExpression } = field;
    return { fieldName: fieldExpression, label, format: null };
  });
};

/**
 * @description if hosted layers are available, check if the layer has a popup available, if so we need to prioritaze it to display it on the popup template
 * @param hostedLayers
 * @param layerId
 * @returns popup object or null
 */
export const getLayerPopupIfAvailable = (hostedLayers: any, layerId: string) => {
  let popup: IPopup | null = null;

  for (const property in hostedLayers) {
    if (hostedLayers[property]?.layers) {
      const layers = hostedLayers[property].layers as ILayer[];

      layers.forEach((layer) => {
        if (layer.id === layerId) {
          popup = layer?.popup ? layer.popup : null;
          return popup;
        }
      });
    }
  }
  return popup;
};

export const getAttributesToDisplay = (params: AttributesToDisplayParams) => {
  const { attributes, fieldNames, newFields } = params;
  const attributesDateListToConvert = ['DteApplied', 'DteGranted', 'DteExpires', 'Date', 'Expires'];

  let updatedFields: any = fieldNames;
  if (newFields !== null) {
    updatedFields = newFields;
  }

  return updatedFields?.map((field) => {
    //Grab attribute value irrespective if fieldName is appropriately cased!
    const attributeKey = Object.keys(attributes).find((a) => a.toLowerCase() === field.fieldName.toLowerCase());
    if (attributeKey) {
      // Use label unless it is not set, then default to fieldName
      const label = field?.label || field.label !== '' ? field.label : attributeKey;
      let value = attributes[attributeKey] as any;

      const updatedValue = handleTimestampDate({
        checkList: attributesDateListToConvert,
        label,
        value,
      });

      return {
        label,
        value: updatedValue,
      };
    } else {
      return null;
    }
  });
};

export const setAttributesToLocalStorage = (params: SetLocalStorageAttributesParams) => {
  const { layerTitle } = params;
  const attributes = getAttributesToDisplay(params);
  localStorage.setItem('shareAttributes', JSON.stringify({ layerTitle, attributes }));
};

export const checkForPopupImage = (value: string | number | null) => {
  if (value && typeof value === 'string') {
    const splitStr = value?.split('.');
    if (splitStr.length <= 1) return false;

    const getLastItem = splitStr[splitStr.length - 1].toLowerCase();

    if (IMAGE_TYPES.includes(getLastItem)) {
      return true;
    }
  }
  return false;
};

export const checkForPopupVideos = (value: string | null) => {
  if (value && typeof value === 'string') {
    const splitStr = value?.split('.');
    if (splitStr.length <= 1) return false;

    const getLastItem = splitStr[splitStr.length - 1];
    if (VIDEO_TYPES.includes(getLastItem)) {
      return true;
    }
  }
  return false;
};

export const generateDefaultFieldNames = (attributes: any) => {
  const fieldNames = Object.keys(attributes).map((attribute) => {
    return { fieldName: attribute, label: attribute, format: null };
  });
  return fieldNames;
};
