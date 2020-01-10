import { combineReducers } from 'redux';

import isMapReady from './mapview/mapview';
import loadError from './mapview/loadError';

export default combineReducers({
  isMapReady,
  loadError
});
