import React, { FunctionComponent } from 'react';

import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';
import Legend from './legend/Legend';
import LeftPanel from './leftPanel/LeftPanel';
import Footer from './Footer';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <LeftPanel />
      <MapWidgets />
      <Mapview />
      <Legend />
      <Footer />
    </>
  );
};

export default MapContent;
