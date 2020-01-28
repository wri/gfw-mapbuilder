export interface AppSettings {
  webmap?: string;
  title: string;
  subtitle?: string;
  logoUrl?: string;
  logoLinkUrl?: string;
  language?: string;
  includeDocumentsTab?: boolean;
  layerPanel?: object;
}

//Action names available
export const OVERWRITE_SETTINGS = 'OVERWRITE_SETTINGS';

interface OverwriteSettingsAction {
  type: typeof OVERWRITE_SETTINGS;
  payload: AppSettings;
}

export type AppSettingsTypes = OverwriteSettingsAction;
