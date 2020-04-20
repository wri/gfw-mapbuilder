import * as React from 'react';

interface ReportTableProps {
  attr: any;
}

export const ReportTable = (props: ReportTableProps): JSX.Element => {
  const { attributes, fields } = props.attr;
  //If we have fieldNames on activeLayerInfo we use it to map over attributes, otherwise, we use all attributes available
  return (
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        {fields
          ? fields.map((field: any, i: number) => {
              //Grab attribute value irrespective if fieldName is appropriately cased!
              const attributeKey = Object.keys(attributes).find(
                a => a.toLowerCase() === field.fieldName.toLowerCase()
              );
              if (attributeKey) {
                return (
                  <tr key={i}>
                    <td className="first-cell">{field.label}</td>
                    <td className="second-cell">{attributes[attributeKey]}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })
          : Object.keys(attributes).map((attribute, i) => {
              return (
                <tr key={i}>
                  <td className="first-cell">{attribute}</td>
                  <td className="second-cell">{attributes[attribute]}</td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};
