import projectedChangeDrySpells from './protected-change-dry-spells';
import potentialCarbonSequestrationRate from './potential-carbon-sequestration-rate';
import airQuality from './air-quality';
import windSpeed from './wind-speed';
import forestCarbonGrossRemovals from './forest-carbon-gross-removals';
import forestGreenhouseGasEmissions from './forest-greenhouse-gas-emissions';
import forestGreenhouseNetFlux from './forest-greenhouse-net-flux';
import treeCoverLoss from './tree-cover-loss';
import treeCoverGain from './tree-cover-gain';
import gladAlerts from './glad-alerts';
import terraIAlerts from './terra-i-alerts';
import viirsActiveFires from './viirs-active-fires';
import integratedDeforestationAlerts from './integrated-deforestation-alerts';
import gladS2Alerts from './glad-s2-alerts';
import raddAlerts from './radd-alerts';
import prodesDeforestation from './prodes-deforestation';
import prodesAmazonBiome from './prodes-amazon-biome';
import intactForestLandscapes from './intact-forest-landscape';
import primaryForest from './primary-forest';
import aboveGroundLiveWoodyBiomassDensity from './above-ground-live-woody-biomas-density';
import treeCover from './tree-cover';
import landCover from './land-cover';
import landCover2000_2020 from './land-cover-2000-2020';
import treeCoverHeight from './tree-cover-height';
import tropicalTreeCover from './tropical-tree-cover';
import satelliteImagery from './satellite-imagery';

export const layersContentConfig = [
  projectedChangeDrySpells,
  potentialCarbonSequestrationRate,
  airQuality,
  windSpeed,
  forestCarbonGrossRemovals,
  forestGreenhouseGasEmissions,
  forestGreenhouseNetFlux,

  treeCoverLoss,
  treeCoverGain,
  gladAlerts,
  terraIAlerts,
  viirsActiveFires,
  integratedDeforestationAlerts,
  gladS2Alerts,
  raddAlerts,
  prodesDeforestation,
  prodesAmazonBiome,
  intactForestLandscapes,
  primaryForest,
  aboveGroundLiveWoodyBiomassDensity,
  treeCover,
  landCover,
  landCover2000_2020,
  treeCoverHeight,
  tropicalTreeCover,
  satelliteImagery,
] as any;
