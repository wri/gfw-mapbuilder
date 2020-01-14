import { AppSettings, AppSettingsTypes, OVERWRITE_SETTINGS } from './types';

const initialState: AppSettings = {
  webmap: 'e691172598f04ea8881cd2a4adaa45ba',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  language: 'en'
};

export function appSettingsReducer(
  state = initialState,
  action: AppSettingsTypes
): AppSettings {
  switch (action.type) {
    case OVERWRITE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
