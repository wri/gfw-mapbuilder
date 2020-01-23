import {
  AppState,
  AppStateTypes,
  SHOW_TABVIEW_PANEL,
  HIDE_TABVIEW_PANEL,
  RENDER_MODAL,
  SELECT_ACTIVE_TAB
} from './types';

const initialState: AppState = {
  renderModal: '',
  leftPanel: {
    tabviewHidden: false,
    activeTab: 'layers'
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
      return { ...state, renderModal: action.payload };
    case SELECT_ACTIVE_TAB:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          activeTab: action.payload
        }
      };
    default:
      return state;
  }
}
