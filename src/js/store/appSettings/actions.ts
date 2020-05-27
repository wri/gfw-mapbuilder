import {
  OVERWRITE_SETTINGS,
  OVERWRITE_COLOR_THEME,
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
