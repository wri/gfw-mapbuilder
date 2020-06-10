export interface Attachment {
  id: number;
  contentType: string;
  size: number;
  name: string;
  url: string;
}

export type AttachmentWithURLProps = Attachment & URLProperties;

export interface URLProperties {
  sublayerID?: number | string;
  specificFeatureID: number;
  layerID: string;
  iso?: string;
  layerTitle?: string;
}
