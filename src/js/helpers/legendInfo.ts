import { LayerProps } from '../store/mapview/types';
import { mapController } from '../controllers/mapController';
import { generateLegendInfo } from '../components/legend/LegendInfo';

class LegendInfoController {
  fetchLegendInfo = async (layerUrl: string): Promise<any> => {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 2500, 'Legend info request time out');
    });

    const fetchLegendInfo = new Promise((resolve, reject) => {
      fetch(`${layerUrl}/legend?f=pjson`)
        .then((result) => result.json())
        .then((data) => resolve(data))
        .catch(reject);
    });

    return Promise.race([timeout, fetchLegendInfo])
      .then((legendInfoJSON) => legendInfoJSON)
      .catch((e) => console.error(e));
  };

  getLegendInfoFromRenderer = (layer: LayerProps): any => {
    const esriLayer = mapController._map?.findLayerById(layer.id) as any;

    if (!esriLayer) return;

    function createLegendSymbol(esriLayer: any): any {
      const container: any[] = [];

      if (esriLayer.type === 'group') {
        esriLayer.layers.forEach((layer) => {
          const newLegend = generateLegendInfo(layer);
          container.push(...newLegend);
        });
      } else {
        const newLegend = generateLegendInfo(esriLayer);
        container.push(...newLegend);
      }
      return container;
    }

    return createLegendSymbol(esriLayer);
  };
}
const legendInfoController = new LegendInfoController();
export default legendInfoController;
