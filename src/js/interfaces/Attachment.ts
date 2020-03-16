export interface Attachment {
  id: number;
  contentType: string;
  size: number;
  name: string;
}

export interface AttachmentWithURLProps {
  id: number;
  contentType: string;
  size: number;
  name: string;
  iso: string;
  layerTitle: string;
  sublayerID: number;
  specificFeatureID: number;
}

export interface URLProperties {
  iso: string;
  layerTitle: string;
  sublayerID: number;
  specificFeatureID: number;
}
