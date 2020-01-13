import { DIM_BACKGROUND } from '../../constants/actionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case DIM_BACKGROUND:
      return action.dimBackground || initialState;
    default:
      return state;
  }
};
