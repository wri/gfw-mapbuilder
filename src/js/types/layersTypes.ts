type Label = { [key: string]: string };

export interface RemoteApiLayerConfig {
  groupId: string;
  id: string;
  order: number;
  type: string;
  uuid: string;
  opacity?: number;
  origin?: string;
}

export interface RWLayerConfig {
  id: string;
  groupId: string;
  order: number;
  type: string;
  datasetURL: string;
  datasetLegendConfigURL: string;
  origin?: string;
  opacity?: number;
}

export interface FlagshipLayerConfig {
  groupId: string;
  id: string;
  order: number;
  type: string;
  uuid: string;
  opacity: number;
  legend: any;
  sublabel: Label;
  origin?: string;
}

export interface RecentImageryLayerConfig {
  dynamicSublabel: {
    [key: string]: string;
  };
  groupId: 'GROUP_IMAGERY';
  id: 'RECENT_IMAGERY';
  label: Label;
  order: number;
  technicalName: string;
  type: string;
  visible: boolean;
  opacity?: number;
  origin?: string;
}

export interface CustomLayerConfig {
  filterField?: { [key: string]: string };
  filterLabel?: { [key: string]: string };
  groupId: string;
  id: string;
  label: Label;
  order: number;
  type: 'feature';
  url: string;
}
