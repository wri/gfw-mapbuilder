import React from 'react';
import { AttributeObject } from './DataTabView';
import { checkForPopupImage, checkForPopupVideos, handleTimestampDate } from './helpers';
const attributesDateListToConvert = ['DteApplied', 'DteGranted', 'DteExpires', 'Date', 'Expires'];

interface PopupContentTypes {
  attributes: AttributeObject | any;
  fieldNames: any;
}

const RenderAttachements = ({ attributes, fieldNames }: PopupContentTypes) => {
  return fieldNames?.map((field, i) => {
    //Grab attribute value irrespective if fieldName is appropriately cased!

    const attributeKey = Object.keys(attributes).find((a) => a.toLowerCase() === field.fieldName.toLowerCase());
    if (attributeKey) {
      // Use label unless it is not set, then default to fieldName
      const label = field?.label || field.label !== '' ? field.label : attributeKey;
      let value = attributes[attributeKey] as any;

      const isImage = checkForPopupImage(value);
      const isVideo = checkForPopupVideos(value);

      return (
        <div>
          {isImage ? <img alt={label} className="image-popup" src={value} /> : null}
          {isVideo ? <video loop={true} autoPlay={true} className="image-popup" src={value} /> : null}
        </div>
      );
    } else {
      return null;
    }
  });
};

const RenderPopup = ({ attributes, fieldNames }: PopupContentTypes) => {
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

      const isImage = checkForPopupImage(value);
      const isVideo = checkForPopupVideos(value);

      // use module operator to determine if odd or even and apply classname based on that
      const className = i % 2 === 1 ? 'odd' : '';
      return (
        <div>
          <tr className={className} key={i}>
            <td className={'first-cell'}>{label}</td>
            <td className="second-cell">
              {isImage || isVideo ? (
                <a target="_blank" href={updatedValue as string}>
                  {label}
                </a>
              ) : (
                updatedValue
              )}
            </td>
          </tr>
        </div>
      );
    } else {
      return null;
    }
  });
};

const RenderPopupContent = ({ attributes, fieldNames }: PopupContentTypes) => {
  return (
    <>
      <RenderAttachements attributes={attributes} fieldNames={fieldNames} />
      <RenderPopup attributes={attributes} fieldNames={fieldNames} />
    </>
  );
};

export default RenderPopupContent;
