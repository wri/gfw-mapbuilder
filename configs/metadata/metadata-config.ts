import treeCoverLoss from './tree-cover-loss';
import co2AccomulationPotential from './co2-accoumulation-potential-2020';
import { LAYER_IDS } from '../layer-config';

export const METADATA_CONFIG = {
  [LAYER_IDS.TREE_COVER_LOSS]: {
    en: treeCoverLoss.en,
  },
  [LAYER_IDS.TREE_COVER_LOSS]: {
    en: co2AccomulationPotential.en,
  },
};
