import React, { FunctionComponent } from 'react';

import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';
import LeftPanel from './leftPanel/LeftPanel';
import Footer from './Footer';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <LeftPanel />
      <MapWidgets />
      <Mapview />
      <Footer />
    </>
  );
};

export default MapContent;
