import { FieldInfo } from './DataPanel';

//Helper to fetch format options for each attribute and format it according to the instruction found
export function formatAttributeValues(
  attributes: __esri.Graphic['attributes'],
  fields: FieldInfo[] | null,
  esriIntl: any
): object {
  const formatAttributeObject = {} as object;
  Object.keys(attributes).forEach((attribute) => {
    const attributeField = fields?.find((f) => f.fieldName === attribute);
    if (attributeField?.format?.dateFormat) {
      if (attributes[attribute] === null || attributes[attribute] === undefined) {
        formatAttributeObject[attribute] = '';
      } else {
        //format the date if formatting options exist
        const dateFormatIntlOptions = esriIntl.convertDateFormatToIntlOptions(attributeField?.format?.dateFormat);
        // if (!attributes[attribute]) return;
        const formattedDate = esriIntl.formatDate(Number(attributes[attribute]), dateFormatIntlOptions);
        formatAttributeObject[attribute] = formattedDate;
      }
    } else if (attributeField?.format?.digitSeparator) {
      //format the number if formatting options exist
      const numberFormatIntlOptions = esriIntl.convertNumberFormatToIntlOptions({
        places: attributeField?.format?.places,
        digitSeparator: attributeField?.format?.digitSeparator,
      });
      if (attributes[attribute] === null || attributes[attribute] === undefined) {
        formatAttributeObject[attribute] = '';
      } else {
        const formattedNumber = esriIntl.formatNumber(attributes[attribute], numberFormatIntlOptions);
        formatAttributeObject[attribute] = formattedNumber;
      }
    } else {
      //We are doing a string matching against attribute name, this is not ideal and should be addressed on the API level with new formatting options compatible with 4x esri api
      //TODO: This is a short term workaround as proper solution needs to modify all datasets with correct formatting options as described in this issue:
      // https://github.com/wri/gfw-mapbuilder/issues/1051
      if (attribute.toLowerCase().includes('date')) {
        const dateFormatIntlOptions = esriIntl.convertDateFormatToIntlOptions('long-date');
        if (attributes[attribute] === null || attributes[attribute] === undefined) {
          formatAttributeObject[attribute] = '';
        } else {
          const formatDate = esriIntl.formatDate(attributes[attribute], dateFormatIntlOptions);
          formatAttributeObject[attribute] = formatDate;
        }
      } else {
        //no formatting options found,  use original value
        formatAttributeObject[attribute] = attributes[attribute];
      }
    }
  });
  return formatAttributeObject;
}
