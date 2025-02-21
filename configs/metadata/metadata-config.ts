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
    /*  az: umdTreeCoverLoss.az,
    nl: umdTreeCoverLoss.nl,
    hy: umdTreeCoverLoss.hy,
    ka: umdTreeCoverLoss.ka,
    fr: umdTreeCoverLoss.fr,
    es: umdTreeCoverLoss.es,
    pt: umdTreeCoverLoss.pt,
    id: umdTreeCoverLoss.id,
    zh: umdTreeCoverLoss.zh, */
  },
  [CARBON_SEQ]: {
    en: co2AccomulationPotential.en,
    /*  az:co2AccomulationPotential.az,
    nl:co2AccomulationPotential.nl,
    hy:co2AccomulationPotential.hy,
    ka:co2AccomulationPotential.ka,
    fr:co2AccomulationPotential.fr,
    es:co2AccomulationPotential.es,
    pt:co2AccomulationPotential.pt,
    id:co2AccomulationPotential.id,
    zh:co2AccomulationPotential.zh, */
  },
  [FOREST_CARBON_NET_FLUX]: {
    en: gfwForestCarbonNetflux.en,
    /*  az: gfwForestCarbonNetflux.az,
    nl: gfwForestCarbonNetflux.nl,
    hy: gfwForestCarbonNetflux.hy,
    ka: gfwForestCarbonNetflux.ka,
    fr: gfwForestCarbonNetflux.fr,
    es: gfwForestCarbonNetflux.es,
    pt: gfwForestCarbonNetflux.pt,
    id: gfwForestCarbonNetflux.id,
    zh: gfwForestCarbonNetflux.zh, */
  },
  [GFW_INTEGRATED_ALERTS]: {
    en: gfwIntegratedAlerts.en,
    /*  az:gfwIntegratedAlerts.az,
    nl:gfwIntegratedAlerts.nl,
    hy:gfwIntegratedAlerts.hy,
    ka:gfwIntegratedAlerts.ka,
    fr:gfwIntegratedAlerts.fr,
    es:gfwIntegratedAlerts.es,
    pt:gfwIntegratedAlerts.pt,
    id:gfwIntegratedAlerts.id,
    zh:gfwIntegratedAlerts.zh, */
  },
  [GLAD_ALERTS]: {
    en: umdLandsatAlerts.en,
    /*  az: umdLandsatAlerts.az,
    nl: umdLandsatAlerts.nl,
    hy: umdLandsatAlerts.hy,
    ka: umdLandsatAlerts.ka,
    fr: umdLandsatAlerts.fr,
    es: umdLandsatAlerts.es,
    pt: umdLandsatAlerts.pt,
    id: umdLandsatAlerts.id,
    zh: umdLandsatAlerts.zh, */
  },
  [INPE_AMAZON_PRODES]: {
    en: inpeAmazonProdes.en,
    /*  az:inpeAmazonProdes.az,
    nl:inpeAmazonProdes.nl,
    hy:inpeAmazonProdes.hy,
    ka:inpeAmazonProdes.ka,
    fr:inpeAmazonProdes.fr,
    es:inpeAmazonProdes.es,
    pt:inpeAmazonProdes.pt,
    id:inpeAmazonProdes.id,
    zh:inpeAmazonProdes.zh, */
  },
  [INPE_CERRADO_PRODES]: {
    en: inpeAmazonProdes.en,
    /*  az:inpeAmazonProdes.az,
    nl:inpeAmazonProdes.nl,
    hy:inpeAmazonProdes.hy,
    ka:inpeAmazonProdes.ka,
    fr:inpeAmazonProdes.fr,
    es:inpeAmazonProdes.es,
    pt:inpeAmazonProdes.pt,
    id:inpeAmazonProdes.id,
    zh:inpeAmazonProdes.zh, */
  },

  [TREE_COVER_GAIN]: {
    en: umdTreeCoverGainFromHeight.en,
    /*  az: umdTreeCoverGainFromHeight.az,
    nl: umdTreeCoverGainFromHeight.nl,
    hy: umdTreeCoverGainFromHeight.hy,
    ka: umdTreeCoverGainFromHeight.ka,
    fr: umdTreeCoverGainFromHeight.fr,
    es: umdTreeCoverGainFromHeight.es,
    pt: umdTreeCoverGainFromHeight.pt,
    id: umdTreeCoverGainFromHeight.id,
    zh: umdTreeCoverGainFromHeight.zh, */
  },

  [AG_BIOMASS]: {
    en: abovegroundBiomassTropics.en,
    az: abovegroundBiomassTropics.az,
    nl: abovegroundBiomassTropics.nl,
    hy: abovegroundBiomassTropics.hy,
    ka: abovegroundBiomassTropics.ka,
    fr: abovegroundBiomassTropics.fr,
    es: abovegroundBiomassTropics.es,
    pt: abovegroundBiomassTropics.pt,
    id: abovegroundBiomassTropics.id,
    zh: abovegroundBiomassTropics.zh,
  },

  [TREE_COVER]: {
    en: treeCover.en,
    /*  az:treeCover.az,
    nl:treeCover.nl,
    hy:treeCover.hy,
    ka:treeCover.ka,
    fr:treeCover.fr,
    es:treeCover.es,
    pt:treeCover.pt,
    id:treeCover.id,
    zh:treeCover.zh, */
  },
  [FOREST_CARBON_GROSS_EMISSIONS]: {
    en: gfwForestCarbonGrossEmissions.en,
    /*  az: gfwForestCarbonGrossEmissions.az,
    nl: gfwForestCarbonGrossEmissions.nl,
    hy: gfwForestCarbonGrossEmissions.hy,
    ka: gfwForestCarbonGrossEmissions.ka,
    fr: gfwForestCarbonGrossEmissions.fr,
    es: gfwForestCarbonGrossEmissions.es,
    pt: gfwForestCarbonGrossEmissions.pt,
    id: gfwForestCarbonGrossEmissions.id,
    zh: gfwForestCarbonGrossEmissions.zh, */
  },

  [UMD_LAND_COVER]: {
    en: umdLandCover.en,
    /*  az:umdLandCover.az,
    nl:umdLandCover.nl,
    hy:umdLandCover.hy,
    ka:umdLandCover.ka,
    fr:umdLandCover.fr,
    es:umdLandCover.es,
    pt:umdLandCover.pt,
    id:umdLandCover.id,
    zh:umdLandCover.zh, */
  },

  [IFL]: {
    en: intactForestLandscapesChange.en,
    /*  az: intactForestLandscapesChange.az,
    nl: intactForestLandscapesChange.nl,
    hy: intactForestLandscapesChange.hy,
    ka: intactForestLandscapesChange.ka,
    fr: intactForestLandscapesChange.fr,
    es: intactForestLandscapesChange.es,
    pt: intactForestLandscapesChange.pt,
    id: intactForestLandscapesChange.id,
    zh: intactForestLandscapesChange.zh, */
  },
  [LAND_COVER]: {
    en: globalLandcover.en,
    /*  az:globalLandcover.az,
    nl:globalLandcover.nl,
    hy:globalLandcover.hy,
    ka:globalLandcover.ka,
    fr:globalLandcover.fr,
    es:globalLandcover.es,
    pt:globalLandcover.pt,
    id:globalLandcover.id,
    zh:globalLandcover.zh, */
  },

  [PRIMARY_FORESTS]: {
    en: regionalPrimaryForest.en,
    /*  az: regionalPrimaryForest.az,
    nl: regionalPrimaryForest.nl,
    hy: regionalPrimaryForest.hy,
    ka: regionalPrimaryForest.ka,
    fr: regionalPrimaryForest.fr,
    es: regionalPrimaryForest.es,
    pt: regionalPrimaryForest.pt,
    id: regionalPrimaryForest.id,
    zh: regionalPrimaryForest.zh, */
  },

  [TREE_COVER_HEIGHT]: {
    en: treeCoverHeight.en,
    /*  az:treeCoverHeight.az,
    nl:treeCoverHeight.nl,
    hy:treeCoverHeight.hy,
    ka:treeCoverHeight.ka,
    fr:treeCoverHeight.fr,
    es:treeCoverHeight.es,
    pt:treeCoverHeight.pt,
    id:treeCoverHeight.id,
    zh:treeCoverHeight.zh, */
  },
  [FOREST_CARBON_GROSS_REMOVALS]: {
    en: gfwForestCarbonGrossRemovals.en,
    /*  az: gfwForestCarbonGrossRemovals.az,
    nl: gfwForestCarbonGrossRemovals.nl,
    hy: gfwForestCarbonGrossRemovals.hy,
    ka: gfwForestCarbonGrossRemovals.ka,
    fr: gfwForestCarbonGrossRemovals.fr,
    es: gfwForestCarbonGrossRemovals.es,
    pt: gfwForestCarbonGrossRemovals.pt,
    id: gfwForestCarbonGrossRemovals.id,
    zh: gfwForestCarbonGrossRemovals.zh, */
  },

  [VIIRS_ACTIVE_FIRES]: {
    en: viirsFires.en,
    /*  az:viirsFires.az,
    nl:viirsFires.nl,
    hy:viirsFires.hy,
    ka:viirsFires.ka,
    fr:viirsFires.fr,
    es:viirsFires.es,
    pt:viirsFires.pt,
    id:viirsFires.id,
    zh:viirsFires.zh, */
  },
  [TROPICAL_TREE_COVER]: {
    en: wriTreesInMosaicLandscapes.en,
    /*  az: wriTreesInMosaicLandscapes.az,
    nl: wriTreesInMosaicLandscapes.nl,
    hy: wriTreesInMosaicLandscapes.hy,
    ka: wriTreesInMosaicLandscapes.ka,
    fr: wriTreesInMosaicLandscapes.fr,
    es: wriTreesInMosaicLandscapes.es,
    pt: wriTreesInMosaicLandscapes.pt,
    id: wriTreesInMosaicLandscapes.id,
    zh: wriTreesInMosaicLandscapes.zh, */
  },

  [DRY_SPELLS]: {
    en: projectedChangeDrySpells.en,
    /* az:projectedChangeDrySpells.az,
    nl:projectedChangeDrySpells.nl,
    hy:projectedChangeDrySpells.hy,
    ka:projectedChangeDrySpells.ka,
    fr:projectedChangeDrySpells.fr,
    es:projectedChangeDrySpells.es,
    pt:projectedChangeDrySpells.pt,
    id:projectedChangeDrySpells.id,
    zh:projectedChangeDrySpells.zh, */
  },

  [AIR_QUALITY]: {
    en: airQuality.en,
    az: airQuality.az,
    nl: airQuality.nl,
    hy: airQuality.hy,
    ka: airQuality.ka,
    fr: airQuality.fr,
    es: airQuality.es,
    pt: airQuality.pt,
    id: airQuality.id,
    zh: airQuality.zh,
  },

  [WIND_SPEED]: {
    en: windSpeed.en,
    /* az:windSpeed.az,
    nl:windSpeed.nl,
    hy:windSpeed.hy,
    ka:windSpeed.ka,
    fr:windSpeed.fr,
    es:windSpeed.es,
    pt:windSpeed.pt,
    id:windSpeed.id,
    zh:windSpeed.zh, */
  },
  [RECENT_IMAGERY]: {
    en: satelliteImagery.en,
    /*  az:satelliteImagery.az,
    nl:satelliteImagery.nl,
    hy:satelliteImagery.hy,
    ka:satelliteImagery.ka,
    fr:satelliteImagery.fr,
    es:satelliteImagery.es,
    pt:satelliteImagery.pt,
    id:satelliteImagery.id,
    zh:satelliteImagery.zh, */
  },
};
