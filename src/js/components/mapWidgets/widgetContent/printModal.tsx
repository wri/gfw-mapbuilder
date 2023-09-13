import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { mapController } from '../../../../js/controllers/mapController';
import { printContent } from '../../../../../configs/translations/modal.tanslations';
import { RootState } from '../../../../js/store/index';
import { handleCustomColorTheme } from '../../../../utils';

export const PrintModal: FunctionComponent = () => {
  const [pdfLoading, setPDFLoading] = useState(false);
  const [url, setURL] = useState('');

  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const customColorTheme = useSelector((state: RootState) => state.appSettings.customColorTheme);

  const { buttonLabel, printOptions } = printContent[selectedLanguage];

  const themeColor = handleCustomColorTheme(customColorTheme);

  const printMap = async (printType: string): Promise<void> => {
    setPDFLoading(true);
    setURL('');

    const { url } = await mapController.generateMapPDF(printType);

    if (url) {
      setURL(url);
    } else {
      alert('PDF could not be generated');
    }
    setPDFLoading(false);
  };

  return (
    <div>
      <div className="directions">
        <p>{buttonLabel}</p>
        {printOptions.map((printOption: string, index: number) => {
          return (
            <button
              className="orange-button"
              style={{ backgroundColor: themeColor }}
              key={index}
              onClick={(e): Promise<void> => printMap(printOption)}
            >
              {printOption}
            </button>
          );
        })}
        {pdfLoading ? <div className="spinner" /> : null}
        {url.length > 0 && (
          <>
            <br />
            <a href={url} target="_blank" rel="noopener noreferrer">
              View PDF
              <span className="esri-icon-link-external" />
            </a>
          </>
        )}
      </div>
    </div>
  );
};
