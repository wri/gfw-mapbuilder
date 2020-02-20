import * as React from 'react';

const DataTabFooter = (): JSX.Element => {
  return (
    <div className="data-tabview-footer">
      <button onClick={(): void => console.log('Print Report!')}>
        Print Report{' '}
        <img
          src="https://my.gfw-mapbuilder.org/img/print-icon.svg"
          alt="print"
        />
      </button>
    </div>
  );
};

export default DataTabFooter;
