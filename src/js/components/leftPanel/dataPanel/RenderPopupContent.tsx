import React from 'react';
import { AttributeObject } from './DataTabView';
import { handleTimestampDate } from './helpers';
const attributesDateListToConvert = ['DteApplied', 'DteGranted', 'DteExpires', 'Date', 'Expires'];

interface PopupContentTypes {
  attributes: AttributeObject | any;
  fieldNames: any;
}

const RenderPopupContent = ({ attributes, fieldNames }: PopupContentTypes) => {
  return fieldNames?.map((field, i) => {
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

      //Users can set the href tag on the data attribute on the service, we want to show an actual link instead of plain text
      if (typeof value === 'string' && value?.includes('href')) {
        value = <div dangerouslySetInnerHTML={{ __html: value }}></div>;
      }
      return (
        <tr key={i}>
          <td className="first-cell">{label}</td>
          <td className="second-cell">{updatedValue}</td>
        </tr>
      );
    } else {
      return null;
    }
  });
};

export default RenderPopupContent;
