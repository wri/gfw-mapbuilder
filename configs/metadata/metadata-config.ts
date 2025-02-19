import umdTreeCoverLoss from './umd-tree-cover-loss';
import co2AccomulationPotential from './co2-accoumulation-potential-2020';
import gfwForestCarbonNetflux from './gfw-forest-carbon-net-flux';
import gfwIntegratedAlerts from './gfw-integrated-alerts';
import umdLandsatAlerts from './umd-landsat-alerts';
import inpeAmazonProdes from './inpe-amazon-prodes';
import umdTreeCoverGainFromHeight from './umd-tree-cover-gain-from-height';
import gfwForestCarbonGrossRemovals from './gfw-forest-carbon-gross-removals';
import abovegroundBiomassTropics from './aboveground-biomass-tropics';
import treeCover from './tree-cover';
import umdLandCover from './umd-land-cover';
import gfwForestCarbonGrossEmissions from './gfw-forest-carbon-gross-emissions';
import intactForestLandscapesChange from './intact-forest-landscapes-change';
import globalLandcover from './global-landcover';
import regionalPrimaryForest from './regional-primary-forest';
import treeCoverHeight from './tree-cover-height';
import wriTreesInMosaicLandscapes from './wri-trees-in-mosaic-landscapes';
import viirsFires from './viirs-fires';
import projectedChangeDrySpells from './projected-change-dry-spells';
import airQuality from './air-quality';
import windSpeed from './wind-speed';
import satelliteImagery from './satellite-imagery';
import { LAYER_IDS } from '../layer-config';
const {
  GLAD_ALERTS,
  UMD_LAND_COVER,
  TREE_COVER_LOSS,
  GFW_INTEGRATED_ALERTS,
  INPE_AMAZON_PRODES,
  INPE_CERRADO_PRODES,
  TREE_COVER_GAIN,
  VIIRS_ACTIVE_FIRES,
  IFL,
  PRIMARY_FORESTS,
  AG_BIOMASS,
  TREE_COVER,
  LAND_COVER,
  TREE_COVER_HEIGHT,
  TROPICAL_TREE_COVER,
  CARBON_SEQ,
  DRY_SPELLS,
  AIR_QUALITY,
  WIND_SPEED,
  FOREST_CARBON_GROSS_REMOVALS,
  FOREST_CARBON_GROSS_EMISSIONS,
  FOREST_CARBON_NET_FLUX,
  RECENT_IMAGERY,
} = LAYER_IDS;

export const METADATA_CONFIG = {
  [TREE_COVER_LOSS]: {
    en: umdTreeCoverLoss.en,
  },
  [CARBON_SEQ]: {
    en: co2AccomulationPotential.en,
  },
  [FOREST_CARBON_NET_FLUX]: {
    en: gfwForestCarbonNetflux.en,
  },
  [GFW_INTEGRATED_ALERTS]: {
    en: gfwIntegratedAlerts.en,
  },
  [GLAD_ALERTS]: {
    en: umdLandsatAlerts.en,
  },
  [INPE_AMAZON_PRODES]: {
    en: inpeAmazonProdes.en,
  },
  [INPE_CERRADO_PRODES]: {
    en: inpeAmazonProdes.en,
  },

  [TREE_COVER_GAIN]: {
    en: umdTreeCoverGainFromHeight.en,
  },

  [AG_BIOMASS]: {
    en: abovegroundBiomassTropics.en,
  },

  [TREE_COVER]: {
    en: treeCover.en,
  },
  [FOREST_CARBON_GROSS_EMISSIONS]: {
    en: gfwForestCarbonGrossEmissions.en,
  },

  [UMD_LAND_COVER]: {
    en: umdLandCover.en,
  },

  [IFL]: {
    en: intactForestLandscapesChange.en,
  },
  [LAND_COVER]: {
    en: globalLandcover.en,
  },

  [PRIMARY_FORESTS]: {
    en: regionalPrimaryForest.en,
  },

  [TREE_COVER_HEIGHT]: {
    en: treeCoverHeight.en,
  },
  [FOREST_CARBON_GROSS_REMOVALS]: {
    en: gfwForestCarbonGrossRemovals.en,
  },

  [VIIRS_ACTIVE_FIRES]: {
    en: viirsFires.en,
  },
  [TROPICAL_TREE_COVER]: {
    en: wriTreesInMosaicLandscapes.en,
  },

  [DRY_SPELLS]: {
    en: projectedChangeDrySpells.en,
  },

  [AIR_QUALITY]: {
    en: airQuality.en,
  },

  [WIND_SPEED]: {
    en: windSpeed.en,
  },
  [RECENT_IMAGERY]: {
    en: satelliteImagery.en,
  },
};
