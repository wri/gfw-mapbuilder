import { AppSettings, AppSettingsTypes, OVERWRITE_SETTINGS } from './types';

const initialState: AppSettings = {
  webmap: '512eef95997b4e7486cdbdc45078739d',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  language: 'en',
  layerPanel: {
    GROUP_WEBMAP: {},
    GROUP_BASEMAP: {},
    GROUP_LC: {},
    GROUP_LCD: {},
    GROUP_IMAGERY: {},
    extraLayers: {}
  }
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
