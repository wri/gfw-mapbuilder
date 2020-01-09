import { MAP_READY } from '../../constants/actionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_READY:
      console.log('Redux store knows the map has loaded', action.mapReady);
      return action.mapReady || initialState;
    default:
      return state;
  }
};
