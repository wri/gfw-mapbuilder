import treeCoverLoss from './tree-cover-loss';
import co2AccomulationPotential from './co2-accoumulation-potential-2020';
import gfwForestCarbonNetflux from './gfw-forest-carbon-net-flux';
import gfwIntegratedAlerts from './gfw-integrated-alerts';
import umdLandsatAlerts from './umd-landsat-alerts';
import inpeAmazonProdes from './inpe-amazon-prodes';
import terraIAlerts from './terra-i-alerts';
import umdTreeCoverGainFromHeight from './umd-tree-cover-gain-from-height';
import { LAYER_IDS } from '../layer-config';
const { UMD_LAND_COVER, TREE_COVER_LOSS, GFW_INTEGRATED_ALERTS, INPE_AMAZON_PRODES } = LAYER_IDS;

export const METADATA_CONFIG = {
  [TREE_COVER_LOSS]: {
    en: treeCoverLoss.en,
  },
  ['pding']: {
    en: co2AccomulationPotential.en,
  },
  ['pending']: {
    en: gfwForestCarbonNetflux.en,
  },
  [GFW_INTEGRATED_ALERTS]: {
    en: gfwIntegratedAlerts.en,
  },
  [UMD_LAND_COVER]: {
    en: umdLandsatAlerts.en,
  },
  [INPE_AMAZON_PRODES]: {
    en: inpeAmazonProdes.en,
  },
  ['ddd']: {
    en: terraIAlerts.en,
  },
  ['dfdfdd']: {
    en: umdTreeCoverGainFromHeight.en,
  },
};
