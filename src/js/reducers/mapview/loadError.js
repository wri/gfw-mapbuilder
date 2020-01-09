import { MAP_ERROR } from '../../constants/actionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_ERROR:
      return action.loadError || initialState;
    default:
      return state;
  }
};
