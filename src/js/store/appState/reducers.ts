import {
  AppState,
  AppStateTypes,
  SHOW_TABVIEW_PANEL,
  HIDE_TABVIEW_PANEL,
  RENDER_MODAL
} from './types';

const initialState: AppState = {
  renderModal: '',
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
    case RENDER_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
