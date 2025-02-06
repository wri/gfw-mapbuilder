import treeCoverLoss from './tree-cover-loss';
import co2AccomulationPotential from './co2-accoumulation-potential-2020';
import gfwForestCarbonNetflux from './gfw-forest-carbon-net-flux';
import gfwIntegratedAlerts from './gfw-integrated-alerts';
import { LAYER_IDS } from '../layer-config';

export const METADATA_CONFIG = {
  [LAYER_IDS.TREE_COVER_LOSS]: {
    en: treeCoverLoss.en,
  },
  ['pding']: {
    en: co2AccomulationPotential.en,
  },
  ['pending']: {
    en: gfwForestCarbonNetflux.en,
  },
  [LAYER_IDS.GFW_INTEGRATED_ALERTS]: {
    en: gfwIntegratedAlerts.en,
  },
};
