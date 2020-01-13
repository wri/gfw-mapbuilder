export interface AppState {
  webmap?: string;
  title: string;
  subtitle?: string;
  logoUrl?: string;
  logoLinkUrl?: string;
  language?: string;
}

//Action names available
export const OVERWRITE_SETTINGS = 'OVERWRITE_SETTINGS';

interface OverwriteSettingsAction {
  type: typeof OVERWRITE_SETTINGS;
  payload: AppState;
}

export type AppStateTypes = OverwriteSettingsAction;
