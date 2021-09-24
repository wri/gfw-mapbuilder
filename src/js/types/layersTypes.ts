type Label = { [key: string]: string };

export interface RemoteApiLayerConfig {
  groupId: string;
  id: string;
  order: number;
  type: string;
  uuid: string;
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
