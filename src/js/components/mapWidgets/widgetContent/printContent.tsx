import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { printContent } from '../../../../../configs/modal.config';
import { RootState } from 'js/store/index';

const PrintContent: FunctionComponent = () => {
  const [url, setURL] = useState('');
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { buttonLabel, dropdownLabel, printOptions } = printContent[
    selectedLanguage
  ];

  const printMap = async (printType: string): Promise<void> => {
    setURL('');
    const { url } = await mapController.generateMapPDF(printType);
    setURL(url);
  };

  const returnPrintContent = (): JSX.Element | void => {
    if (url.length) {
      return (
        <>
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer">
            Printout
          </a>
        </>
      );
    }
  };

  return (
    <div>
      <div className="directions">
        <p>{buttonLabel}</p>
        <select
          onBlur={(e): Promise<void> => printMap(e.target.value)}
          onChange={(e): Promise<void> => printMap(e.target.value)}
        >
          <option value={''}>{dropdownLabel}</option>
          {printOptions.map((printOption: string, index: string) => {
            return <option key={index}>{printOption}</option>;
          })}
        </select>
        {returnPrintContent()}
      </div>
    </div>
  );
};

export default PrintContent;
