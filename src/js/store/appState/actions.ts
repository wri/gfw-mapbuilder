import { OVERWRITE_SETTINGS, AppState } from './types';

export function overwriteSettings(newSettings: AppState) {
  return {
    type: OVERWRITE_SETTINGS,
    payload: newSettings
  };
}
