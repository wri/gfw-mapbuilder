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
