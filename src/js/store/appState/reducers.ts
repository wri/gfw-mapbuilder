import { AppState, AppStateTypes, OVERWRITE_SETTINGS } from './types';

const initialState: AppState = {
  webmap: 'e691172598f04ea8881cd2a4adaa45ba',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  language: 'en'
};

export function appStateReducer(
  state = initialState,
  action: AppStateTypes
): AppState {
  switch (action.type) {
    case OVERWRITE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
