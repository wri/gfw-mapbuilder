import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';

interface Props {
  key: string;
  label: string;
}

const DocumentsTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );
  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const { iso } = useSelector((store: RootState) => store.appSettings);
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  /**
   * * TODO
   * if (tabViewIsVisible) make a fetch request for all
   * attachments related to activeFeatures & activeFeatureIndex
   */

  const grabID = (attributes: any): void => {
    console.log(attributes);
    debugger;
  };

  const getAndSetDocuments = async (): Promise<any> => {
    const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

    const specificFeature =
      activeFeatures[featureCollectionIndex].features[featureIndex];
    0;
    const { layerTitle, sublayerID } = activeFeatures[featureCollectionIndex];

    const specificFeatureID = specificFeature.attributes.objectid
      ? specificFeature.attributes.objectid
      : grabID(specificFeature.attributes);

    const urlProperties = {
      iso: iso.toLowerCase(),
      layerTitle,
      sublayerID,
      specificFeatureID
    };
    const attachments = await mapController.getDocuments(urlProperties);

    if (attachments) {
      console.log('We have attachments:', attachments);
    } else {
      console.log('No attachments... :(', attachments);
    }
  };

  useEffect(() => {
    if (tabViewIsVisible) {
      getAndSetDocuments();
      // TODO [ ] - grab featureCollection.layerTitle
      // TODO [ ] - fetch attachments related to the activeFeature
    }
  });

  return <>{tabViewIsVisible && <div>Documents Tab View</div>}</>;
};

export default DocumentsTabView;
