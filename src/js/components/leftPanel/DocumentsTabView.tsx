import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';
import { Attachment } from '../../../js/types/Attachment';
import { documentsContent } from '../../../../configs/translations/leftPanel.translations';
import { DocIcon } from '../../../images/documentIcon';
import { handleCustomColorTheme } from '../../../utils';

interface Props {
  key: string;
  label: string;
}

const DocumentsTabView = (props: Props): JSX.Element => {
  const { activeTab, tabViewVisible } = useSelector((store: RootState) => store.appState.leftPanel);
  const activeFeatureIndex = useSelector((store: RootState) => store.mapviewState.activeFeatureIndex);
  const activeFeatures = useSelector((store: RootState) => store.mapviewState.activeFeatures);
  const documents = useSelector((store: RootState) => store.mapviewState.documents);
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);
  const customColorTheme = useSelector((state: RootState) => state.appSettings.customColorTheme);

  const themeColor = handleCustomColorTheme(customColorTheme);

  const { instructions, name, pdf, size } = documentsContent[selectedLanguage];
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  let documentTitle = '';
  if (activeFeatures && activeFeatures.length) {
    documentTitle =
      activeFeatures[activeFeatureIndex[0]]?.sublayerTitle || activeFeatures[activeFeatureIndex[0]]?.layerTitle;
  }

  const documentsList: React.ReactFragment[] | undefined = documents?.map((attachment: Attachment, key: number) => {
    const { url, size, name } = attachment;
    return (
      <Fragment key={key}>
        <tr>
          <td title={name} className="file-name">
            {name}
          </td>
          <td>{Math.round(size / 1000)} KB</td>
          <td>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <DocIcon height={20} width={20} fill={themeColor} />
            </a>
          </td>
        </tr>
      </Fragment>
    );
  });

  return (
    <>
      {tabViewIsVisible && (
        <div className="documents-container">
          {documents && documents.length ? (
            <div>
              <h3 className="feature-collection-title">{documentTitle}</h3>
              <table className="documents-table">
                <thead className="table-headers">
                  <tr>
                    <th>{name}</th>
                    <th>{size}</th>
                    <th>{pdf}</th>
                  </tr>
                </thead>
                <tbody>{documentsList}</tbody>
              </table>
            </div>
          ) : (
            <p className="no-documents">{instructions}</p>
          )}
        </div>
      )}
    </>
  );
};

export default DocumentsTabView;
