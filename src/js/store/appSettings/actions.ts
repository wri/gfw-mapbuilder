import {
  OVERWRITE_SETTINGS,
  OVERWRITE_COLOR_THEME,
  SET_HIDE_LEGEND,
  AppSettings
} from './types';

export function overwriteSettings(newSettings: AppSettings) {
  return {
    type: OVERWRITE_SETTINGS,
    payload: newSettings
  };
}

export function overwriteColorTheme(colorTheme: string) {
  return {
    type: OVERWRITE_COLOR_THEME as typeof OVERWRITE_COLOR_THEME,
    payload: colorTheme
  };
}

export function setHideLegend(hideLegend: boolean) {
  return {
    type: SET_HIDE_LEGEND as typeof SET_HIDE_LEGEND,
    payload: hideLegend
  };
}
