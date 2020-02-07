import Layer from 'esri/layers/Layer';

export function LayerFactory(): Layer | Error {
  // return 'hey';
  return new Layer();
}
