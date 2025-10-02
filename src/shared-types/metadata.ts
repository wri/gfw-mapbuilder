export interface LayerMetadataContent {
  label: string;
  value: string;
}

export interface LayerMetadata {
  title: string;
  subtitle: string;
  download_data: string;
  learn_more: string;
  content: LayerMetadataContent[];
  overview: LayerMetadataContent;
  citation: LayerMetadataContent;
}
