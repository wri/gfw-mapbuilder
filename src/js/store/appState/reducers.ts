import {
  AppState,
  AppStateTypes,
  SHOW_TABVIEW_PANEL,
  HIDE_TABVIEW_PANEL
} from './types';

const initialState: AppState = {
  leftPanel: {
    tabviewHidden: false
  }
};

export function appStateReducer(
  state = initialState,
  action: AppStateTypes
): AppState {
  switch (action.type) {
    case SHOW_TABVIEW_PANEL:
      return { ...state, ...action.payload };
    case HIDE_TABVIEW_PANEL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
