import * as React from 'react';

interface ReportTableProps {
  attributes: any;
}

export const ReportTable = ({ attributes }: ReportTableProps): JSX.Element => {
  return (
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        {!!attributes.length &&
          attributes.map((attribute, i) => (
            <tr key={i}>
              <td className="first-cell">{attribute.label}</td>
              <td className="second-cell">{attribute.value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
