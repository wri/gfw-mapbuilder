import * as types from 'constants/actionTypes';

export function dimBackground(dimBackground) {
  return {
    type: types.DIM_BACKGROUND,
    dimBackground
  };
}
