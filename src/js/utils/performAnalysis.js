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
      analysisUtils.getMosaic(language, landCoverConfig.rasterId, geometry).then(promise.resolve);
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
      analysisUtils.getCrossedWithLoss(config, analysisConfig[analysisKeys.TC_LOSS], geometry, {
        canopyDensity: canopyDensity,
        simple: true
      }).then(response => {
        if (typeof response === 'object' && response.hasOwnProperty('error')) {
          promise.resolve({ error: response.error, message: text[language].ANALYSIS_ERROR_INTACT_LOSS});
        } else {
          promise.resolve(response);
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
    default:
      //- This should only be the restoration analysis, since analysisType is a rasterId
      analysisUtils.getRestoration(restorationUrl, type, geometry, settings).then(promise.resolve);
    break;
  }

  return promise;
}
