import React from 'react';

import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';
import Legend from './legend/Legend';
import LeftPanel from './leftPanel/LeftPanel';
import Footer from './Footer';
import Report from './Report';

interface MapContentProps {
  report: boolean;
}

function determineMapContent(renderReport?: boolean): JSX.Element {
  if (renderReport) {
    return <Report mapview={Mapview} />;
  } else {
    return (
      <>
        <LeftPanel />
        <MapWidgets />
        <Mapview />
        <Legend />
        <Footer />
      </>
    );
  }
}

const MapContent = (props: MapContentProps): JSX.Element => {
  return <>{determineMapContent(props.report)}</>;
};

export default MapContent;
