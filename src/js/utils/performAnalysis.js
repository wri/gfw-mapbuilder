import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import analysisUtils from 'utils/analysisUtils';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import utils from 'utils/AppUtils';
import text from 'js/languages';

/**
* @param {object} options - Value from Analysis Select, also key to options in config
* @param {string} options.type - Value from Analysis Select, also key to options in config
* @param {Polygon} options.geometry - Esri Polygon
* @param {number} options.canopyDensity - Tree Canopy Density Value
* @param {string} options.language - current language, Needed to get layer config from settings
* @param {string=} options.activeSlopeClass - Current slope class setting
* @param {object=} options.settings - Application settings from resources.
* @return {promise}
*/
export default function performAnalysis (options) {
  const {
    language,
    type,
    geometry,
    canopyDensity,
    activeSlopeClass,
    settings,
    geostoreId,
    tcLossFrom,
    tcLossTo,
    gladFrom,
    gladTo,
    terraIFrom,
    terraITo,
    viirsFrom,
    viirsTo,
    modisFrom,
    modisTo
  } = options;
  const restorationUrl = settings && settings.restorationImageServer;
  const landCoverConfig = settings && settings.layerPanel && settings.layerPanel.GROUP_LC ?
    utils.getObject(settings.layerPanel.GROUP_LC.layers, 'id', layerKeys.LAND_COVER) : {};
  const config = analysisConfig[type];
  const promise = new Deferred();

  switch (type) {
    case analysisKeys.VIIRS_FIRES:
      analysisUtils.getFireCount(config.url, geometry, viirsFrom, viirsTo, language).then(promise.resolve);
    break;
    case analysisKeys.MODIS_FIRES:
      analysisUtils.getFireCount(config.url, geometry, modisFrom, modisTo, language).then(promise.resolve);
    break;
    case analysisKeys.LCC:
      analysisUtils.getLandCover(geostoreId, 'gfw-landcover-2015').then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_LAND_COVER_COMPOSITION});
        } else {
          const data = {
            counts: []
          };
          response.data.attributes.histogram.forEach(histo => {
            if (!data[histo.className]) {
              data[histo.className] = 0;
            }
            histo.result.forEach(year => {
              data[histo.className] += year.result;
            });
            data.counts.push(Math.round(data[histo.className] * 100) / 100);
          });
          promise.resolve(data);
        }
      });
      // analysisUtils.getMosaic(language, landCoverConfig.rasterId, geometry).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS:
      analysisUtils.getCountsWithDensity(geostoreId, canopyDensity, tcLossFrom, tcLossTo).then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({error: response.error, message: text[language].ANALYSIS_ERROR_TC_LOSS});
        } else {
          const lossObj = response.data.attributes.loss;
          const counts = Object.values(lossObj);
          promise.resolve({ counts });
        }
      });
    break;
    case analysisKeys.SLOPE:
      const slopeValue = settings.slopeClasses.indexOf(activeSlopeClass);
      analysisUtils.getSlope(restorationUrl, slopeValue, config.id, config.restoration, geometry, language).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS_GAIN:
      analysisUtils.getCountsWithDensity(geostoreId, canopyDensity, tcLossFrom, tcLossTo).then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_TC_LOSS_GAIN});
        } else {
          const lossObj = response.data.attributes.loss;
          const lossCounts = Object.values(lossObj);
          const lossTotal = parseInt(lossCounts.reduce((a, b) => a + b, 0));
          const gainTotal = parseInt(response.data.attributes.gain);
          promise.resolve({ lossCounts, lossTotal, gainTotal });
        }
      });
      break;
    case analysisKeys.LC_LOSS:
      analysisUtils.getCrossedWithLoss({
        id: landCoverConfig.rasterId,
        bounds: landCoverConfig.bounds
      }, analysisConfig[analysisKeys.TC_LOSS], geometry, {
        canopyDensity: canopyDensity
      }).then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_LAND_COVER_LOSS});
        } else {
          promise.resolve(response);
        }
      });
    break;
    case analysisKeys.BIO_LOSS:
      // const generalizedGeometry = GeometryEngine.generalize(geometry, 10, true, 'miles');
      analysisUtils.getBiomassLoss(geostoreId, canopyDensity, language).then(promise.resolve, promise.reject);
    break;
    case analysisKeys.INTACT_LOSS:
      analysisUtils.getLandCover(geostoreId, 'ifl2000').then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_LAND_COVER_COMPOSITION});
        } else {
          const counts = [];
          response.data.attributes.histogram[0].result.forEach(histo => {
            counts.push(Math.round(histo.result * 100) / 100);
          });
          promise.resolve({
            counts: counts,
            options: {
              canopyDensity: canopyDensity,
              simple: true
            },
            encoder: analysisUtils.getEncoder(config, analysisConfig[analysisKeys.TC_LOSS])
          });
        }
      });
    break;
    case analysisKeys.MANGROVE_LOSS:
      analysisUtils.getCrossedWithLoss(config, analysisConfig[analysisKeys.TC_LOSS], geometry, {
        canopyDensity: canopyDensity,
        simple: true
      }).then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_MANGROVE_LOSS});
        } else {
          promise.resolve(response);
        }
      });
    break;
    case analysisKeys.SAD_ALERTS:
      analysisUtils.getSADAlerts(config, geometry, language).then(promise.resolve);
    break;
    case analysisKeys.GLAD_ALERTS:
      analysisUtils.getGLADAlerts(config, geostoreId, gladFrom, gladTo, language).then(promise.resolve);
    break;
    case analysisKeys.TERRA_I_ALERTS:
      analysisUtils.getTerraIAlerts(config, geostoreId, terraIFrom, terraITo, language).then(promise.resolve);
    break;
    // case 'custom':
    // // TODO: don't hardcode 'custom'
    // // find a way to create a 'case' in this switch for each item in the array
    //   analysisUtils.getCustomAnalysis(settings.customAnalysisModules.filter(a => a.value === 'custom')[0], geostoreId).then(promise.resolve);
    // break;
    // case 'custom2':
    // // TODO: don't hardcode 'custom'
    // // find a way to create a 'case' in this switch for each item in the array
    //   analysisUtils.getCustomAnalysis(settings.customAnalysisModules.filter(a => a.value === 'custom2')[0], geostoreId).then(promise.resolve);
    // break;

    case 'default':
      return null;
    default:
      // //- This should only be the restoration analysis, since analysisType is a rasterId
      analysisUtils.getRestoration(restorationUrl, type, geometry, settings).then(promise.resolve);


      // TESTING CUSTOM ANALYSIS
      // const customAnalysisModule = settings.customAnalysisModules.filter(a => a.value === type)[0];
      // analysisUtils.getCustomAnalysis(customAnalysisModule, geostoreId).then(promise.resolve);
    break;
  }

  return promise;
}
