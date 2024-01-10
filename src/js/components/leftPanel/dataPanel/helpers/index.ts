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

interface SetLocalStorageAttributesParams extends AttributesToDisplayParams {
  layerTitle: string;
}

interface IAttributes {
  [key: string]: number | string | null;
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

export const updateContentProperties = (content: ContentParams | null) => {
  if (!content) return null;

  const fields = content.content.en;

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
  if (hostedLayers?.HOSTED_LAYERS) {
    const layers = hostedLayers.HOSTED_LAYERS.layers;
    const findById = layers.find((layer: any) => layer.id === layerId);
    if (findById) {
      return findById?.popup ? findById.popup : null;
    }
    return null;
  }
  return null;
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

    const getLastItem = splitStr[splitStr.length - 1];
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

export const generateDefaultFieldNames = (attributes: IAttributes) => {
  const fieldNames = Object.keys(attributes).map((attribute) => {
    return { fieldName: attribute, label: attribute, format: null };
  });
  return fieldNames;
};
