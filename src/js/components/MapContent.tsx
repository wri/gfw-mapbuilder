import React from 'react';
import { useSelector } from 'react-redux';
import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';
import Legend from './legend/Legend';
import LeftPanel from './leftPanel/LeftPanel';
import Footer from './Footer';
import Report from './Report';
import UserPointPopup from './mapWidgets/userPointPopup';

import { RootState } from '../../js/store';

interface MapContentProps {
  report: boolean;
}

function determineMapContent(renderReport?: boolean, hideFooter?: boolean): JSX.Element {
  if (renderReport) {
    return <Report mapview={Mapview} />;
  } else {
    return (
      <>
        <LeftPanel />
        <MapWidgets />
        <Mapview />
        <Legend />
        <UserPointPopup />
        {!hideFooter && <Footer />}
      </>
    );
  }
}

const MapContent = (props: MapContentProps): JSX.Element => {
  const hideFooter = useSelector((store: RootState) => store.appSettings.hideFooter);
  return <>{determineMapContent(props.report, hideFooter)}</>;
};

export default MapContent;
