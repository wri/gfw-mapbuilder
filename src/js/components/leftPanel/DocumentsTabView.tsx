import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';

interface Props {
  key: string;
  label: string;
}

interface Attachment {
  id: number;
  contentType: string;
  size: number;
  name: string;
}

interface AttachmentWithURLProps {
  id: number;
  contentType: string;
  size: number;
  name: string;
  iso: string;
  layerTitle: string;
  sublayerID: number;
  specificFeatureID: number;
}

const DocumentsTabView = (props: Props): JSX.Element => {
  const [allAttachments, setAllAttachments] = useState([]);
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );
  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const { iso } = useSelector((store: RootState) => store.appSettings);
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

  const featureCollectionTitle = activeFeatures[featureCollectionIndex]
    ? activeFeatures[featureCollectionIndex].sublayerTitle
    : null;
  console.log('TOPP LEVELL', featureCollectionTitle);

  const grabID = (attributes: any): void => {
    // * I may need to refactor
    // * to account for different objectID names
    const hasdefaultID = attributes.objectid ? true : false;
    const forestProductionID = Object.keys(attributes).includes(
      'forets_production.objectid'
    );
    //
    if (hasdefaultID) {
      return attributes.object;
    }
    if (forestProductionID) {
      return attributes['forets_production.objectid'];
    } else {
      console.log('error with attributes in grabID()', attributes);
      debugger;
    }
  };

  const getAndSetDocuments = async (): Promise<any> => {
    const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

    const specificFeature =
      activeFeatures[featureCollectionIndex].features[featureIndex];
    const { layerTitle, sublayerID } = activeFeatures[featureCollectionIndex];

    const urlProperties = {
      iso: iso.toLowerCase(),
      layerTitle,
      sublayerID,
      specificFeatureID: grabID(specificFeature.attributes)
    };
    const attachments = await mapController.getDocuments(urlProperties);

    if (attachments !== allAttachments) {
      const attachmentInfo = attachments?.map((attachment: Attachment) => {
        return { ...attachment, ...urlProperties };
      }) as any;
      setAllAttachments(attachmentInfo);
    }
  };

  const returnDocuments = (): any => {
    if (allAttachments && allAttachments.length) {
      console.log('We have attachments... :)', allAttachments);
      return allAttachments.map(
        (attachment: AttachmentWithURLProps, key: number) => {
          const {
            id,
            contentType,
            size,
            name,
            iso,
            layerTitle,
            sublayerID,
            specificFeatureID
          } = attachment;
          console.log('doc size', size);
          // TODO [ ] styling!
          return (
            <a
              href={`https://gis.forest-atlas.org/server/rest/services/${iso.toLowerCase()}/${layerTitle}/MapServer/${sublayerID}/${specificFeatureID}/attachments/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={key}
            >
              <div className="attachment-container">
                <p>
                  {name} is a {contentType}
                </p>
              </div>
            </a>
          );
        }
      );
    } else {
      console.log('No attachments... :(', allAttachments);
      return <>There are no attachments at this time.</>;
    }
  };

  useEffect(() => {
    if (tabViewIsVisible) {
      getAndSetDocuments();
    }
  }, [tabViewIsVisible]);

  return (
    <div className="documents-container">
      {tabViewIsVisible && (
        <>
          <h3>{featureCollectionTitle}</h3>
          <p>Documents Tab View</p>
          {returnDocuments()}
        </>
      )}
    </div>
  );
};

export default DocumentsTabView;
