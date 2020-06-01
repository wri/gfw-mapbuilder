import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { getDocuments } from 'js/helpers/mapController/Documents';

import { RootState } from 'js/store';
import { AttachmentWithURLProps } from 'js/interfaces/Attachment';

import { documentsContent } from 'configs/leftPanel.translations';

import { ReactComponent as DocIcon } from 'src/images/documentIcon.svg';

interface Props {
  key: string;
  label: string;
}

const DocumentsTabView = (props: Props): JSX.Element => {
  const [allAttachments, setAllAttachments] = useState([]);
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );
  const activeFeatures = useSelector(
    (store: RootState) => store.mapviewState.activeFeatures
  );
  const activeFeatureIndex = useSelector(
    (store: RootState) => store.mapviewState.activeFeatureIndex
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const customColorTheme = useSelector(
    (state: RootState) => state.appSettings.customColorTheme
  );

  const { instructions, name, pdf, size } = documentsContent[selectedLanguage];
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  const [featureCollectionIndex] = activeFeatureIndex;

  const returnFeatureCollectionTitle = (): string => {
    if (activeFeatures[featureCollectionIndex].sublayerTitle) {
      return activeFeatures[featureCollectionIndex].sublayerTitle as string;
    } else {
      return activeFeatures[featureCollectionIndex].layerTitle;
    }
  };

  const featureCollectionTitle = activeFeatures[featureCollectionIndex]
    ? returnFeatureCollectionTitle()
    : null;

  useEffect(() => {
    const getAndSetDocuments = async (): Promise<void> => {
      const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

      const specificFeature =
        activeFeatures[featureCollectionIndex]?.features[featureIndex];
      if (specificFeature) {
        const { sublayerID, layerID } = activeFeatures[featureCollectionIndex];

        const urlProperties = {
          sublayerID,
          specificFeatureID: specificFeature.objectid,
          layerID
        } as any;

        const attachments = await getDocuments(urlProperties);

        if (attachments !== allAttachments) {
          setAllAttachments(attachments as any);
        }
      }
    };

    if (tabViewIsVisible) {
      // TODO dispatch loader
      getAndSetDocuments();
    }
  }, [tabViewIsVisible]);

  const returnDocuments = (): Array<JSX.Element> | undefined => {
    return allAttachments.map(
      (attachment: AttachmentWithURLProps, key: number) => {
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
                  <DocIcon height={20} width={20} fill={customColorTheme} />
                </a>
              </td>
            </tr>
          </Fragment>
        );
      }
    );
  };

  return (
    <div>
      {tabViewIsVisible && (
        <div className="documents-container">
          {allAttachments && allAttachments.length ? (
            <h3 className="feature-collection-title">
              {featureCollectionTitle}
            </h3>
          ) : null}
          {allAttachments && allAttachments.length ? (
            <>
              <table className="documents-table">
                <thead className="table-headers">
                  <tr>
                    <th>{name}</th>
                    <th>{size}</th>
                    <th>{pdf}</th>
                  </tr>
                </thead>
                <tbody>{returnDocuments()}</tbody>
              </table>
            </>
          ) : (
            <>
              <p className="no-documents">{instructions}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentsTabView;
