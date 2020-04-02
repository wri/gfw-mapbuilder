export interface LayerFactoryObject {
  id: string;
  title: string;
  opacity: number;
  visible: boolean;
  definitionExpression: string | undefined;
  url: string;
  type: string;
  metadata: any;
  layerIds?: number[];
}
