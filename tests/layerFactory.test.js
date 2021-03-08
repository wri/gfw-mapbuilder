import { LayerFactory } from '../js/helpers/LayerFactory';
import { allowedLayers } from '../configs/layer-config';

const noTypeLayer = {
  type: ''
};

test('LayerFactory does good', () => {
  const noType = LayerFactory({}, noTypeLayer);
  expect(noType).toBeUndefined();

  allowedLayers.forEach(allowedLayer => {
    const allowedLayerType = {
      type: allowedLayer
    };

    const allowedMapLayer = LayerFactory({}, allowedLayerType);
    expect(allowedMapLayer).toBeDefined();
  });
});
