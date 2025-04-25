export interface IDataLayer {
  id: string;
  order: number;
  type: string;
  uuid: string;
  groupId: string;
}

export interface ILayerLabel {
  en: string;
  fr: string;
  es: string;
  pt: string;
  id: string;
  zh: string;
  ka: string;
}

export interface ILayerSubLabel {
  en: string;
  fr: string;
  es: string;
  pt: string;
  id: string;
  zh: string;
  ka: string;
}

export interface ILegendConfigItem {
  color: string;
  name: ILayerLabel;
}

export interface ILayerLegendConfig {
  type: string;
  source?: string;
  name: ILayerLabel;
  items: ILegendConfigItem[];
}

export interface ILayerMetadata {
  metadata?: any;
  legendConfig: ILayerLegendConfig;
  interactionConfig: any;
}

export interface ILayer {
  label: ILayerLabel;
  sublabel: ILayerSubLabel;
  technicalName: string;
  url: string;
  type: string;
  id: string;
  metadata: ILayerMetadata;
  popup?: any;
  // TODO: Properties below may not actually be needed, if so, remove them from codebase
  colormap?: any;
  inputRange?: any;
  outputRange?: any;
}

export interface IMBLayer {
  order: number;
  layerGroupId: string;
  dataLayer: IDataLayer;
  layer: ILayer;
  isError?: boolean;
  isMetadataError?: boolean;
  // TODO: check if properties below are actually needed, if not remove them from codebase
  versions?: any;
  popup?: any;
  searchField?: any;
  layerIds?: any;
  url?: string;
  dashboardURL?: any;
  versionIndex?: any;
  type?: any;
  layerName?: any;
  id?: any;
  label?: any;
  groupId?: any;
  technicalName?: any;
  portalItemID?: any;
  sublabel?: any;
  filterLabel?: any;
  filterField?: any;
  versionHeaderText?: any;
  metadata?: any;
}
