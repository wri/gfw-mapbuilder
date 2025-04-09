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
] as any;
