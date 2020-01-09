import * as React from 'react';
import { Mapview } from './mapview/Mapview';
import { mapController } from '../controllers/mapController';
import 'arcgis-js-api/themes/light/main.scss';
import '../../css/index.scss';

function handleClick() {
  mapController.log();
}

export function App() {
  handleClick();
  return (
    <>
      <div onClick={handleClick}>Hi</div>
      <Mapview />
    </>
  );
}
