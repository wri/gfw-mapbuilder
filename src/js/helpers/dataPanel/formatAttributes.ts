import * as esriIntl from 'esri/intl';
import { FieldInfo } from './DataPanel';

//Helper to fetch format options for each attribute and format it according to the instruction found
export function formatAttributeValues(
  attributes: __esri.Graphic['attributes'],
  fields: FieldInfo[] | null
): object {
  const formatAttributeObject = {} as object;
  Object.keys(attributes).forEach(attribute => {
    const attributeField = fields?.find(f => f.fieldName === attribute);
    if (attributeField?.format?.dateFormat) {
      //format the date if formatting options exist
      const dateFormatIntlOptions = esriIntl.convertDateFormatToIntlOptions(
        attributeField?.format?.dateFormat
      );
      const formattedDate = esriIntl.formatDate(
        Number(attributes[attribute]),
        dateFormatIntlOptions
      );
      formatAttributeObject[attribute] = formattedDate;
    } else if (attributeField?.format?.digitSeparator) {
      //format the number if formatting options exist
      const numberFormatIntlOptions = esriIntl.convertNumberFormatToIntlOptions(
        {
          places: attributeField?.format?.places,
          digitSeparator: attributeField?.format?.digitSeparator
        }
      );
      const formattedNumber = esriIntl.formatNumber(
        attributes[attribute],
        numberFormatIntlOptions
      );
      formatAttributeObject[attribute] = formattedNumber;
    } else {
      //no formatting options found,  use original value
      formatAttributeObject[attribute] = attributes[attribute];
    }
  });
  return formatAttributeObject;
}
