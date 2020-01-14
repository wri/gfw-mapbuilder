import { OVERWRITE_SETTINGS, AppSettings } from './types';

export function overwriteSettings(newSettings: AppSettings) {
  return {
    type: OVERWRITE_SETTINGS,
    payload: newSettings
  };
}
