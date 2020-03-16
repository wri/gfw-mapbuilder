import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';

import { Attachment, AttachmentWithURLProps } from 'js/interfaces/Attachment';

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
  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

  const featureCollectionTitle = activeFeatures[featureCollectionIndex]
    ? activeFeatures[featureCollectionIndex].sublayerTitle
    : null;

  useEffect(() => {
    if (tabViewIsVisible) {
      getAndSetDocuments();
    }
  }, [tabViewIsVisible]);

  const grabID = (attributes: any): number | null => {
    // * May need to refactor
    // * to account for different objectID names
    const hasdefaultID = attributes.objectid ? true : false;
    const forestProductionID = Object.keys(attributes).includes(
      'forets_production.objectid'
    );

    if (hasdefaultID) {
      return attributes.object;
    } else if (forestProductionID) {
      return attributes['forets_production.objectid'];
    } else {
      console.log('error with attributes in grabID()', attributes);
      return null;
    }
  };

  const getAndSetDocuments = async (): Promise<void> => {
    const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

    const specificFeature =
      activeFeatures[featureCollectionIndex].features[featureIndex];
    const { sublayerID, layerID } = activeFeatures[featureCollectionIndex];

    const urlProperties = {
      sublayerID,
      specificFeatureID: grabID(specificFeature.attributes),
      layerID
    } as any;

    const attachments = await mapController.getDocuments(urlProperties);

    if (attachments !== allAttachments) {
      setAllAttachments(attachments as any);
    }
  };

  const returnDocuments = (): Array<JSX.Element> | JSX.Element => {
    if (allAttachments && allAttachments.length) {
      return allAttachments.map(
        (attachment: AttachmentWithURLProps, key: number) => {
          const { url, size, name } = attachment;
          return (
            <>
              <tr>
                <td key={key} title={name} className="file-name">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </td>
                <td>{Math.round(size / 1000)} KB</td>
                <td>
                  <DocIcon height={20} width={20} fill={'#555'} />
                </td>
              </tr>
            </>
          );
        }
      );
    } else {
      return <>There are no attachments at this time.</>;
    }
  };

  return (
    <div className="documents-container">
      {tabViewIsVisible && (
        <>
          <table className="documents-table">
            <thead className="feature-collection-title">
              {featureCollectionTitle}
            </thead>
            <hr />
            {allAttachments && allAttachments.length ? (
              <thead className="table-headers">
                <th>Name</th>
                <th>Size</th>
                <th>PDF</th>
              </thead>
            ) : null}
            <tbody>{returnDocuments()}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DocumentsTabView;
