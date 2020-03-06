import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import 'css/canopyDensityModal';

//TODO: Language aware
//
//slider: [0, 10, 15, 20, 25, 30, 50, 75, 100]
//hard coded to 10 -75 in PROD
/*
/////- These tells me the raster id needed to filter the biomass layer based on canopyDensity > this is from rasterFunction utils
const BIOMASS_DENSITY_ID_LOOKUP = {
  '10': '1',
  '15': '2',
  '20': '3',
  '25': '4',
  '30': '5',
  '50': '6',
  '75': '7'
};
*/

const CanopyDensityContent = (): JSX.Element => {
  const { density } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  return (
    <div className="canopy-density-container">
      <div>
        Adjust the minimum canopy density for tree cover and tree cover loss
      </div>
      <div className="tree-range">
        <div className="tree"></div>
        <div className="forest"></div>
      </div>
      <div>slider{density}</div>
    </div>
  );
};

export default CanopyDensityContent;
