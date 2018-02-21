import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import CompositionPieChart from 'components/AnalysisPanel/CompositionPieChart';
import AnalysisTypeSelect from 'components/AnalysisPanel/AnalysisTypeSelect';
import RestorationCharts from 'components/AnalysisPanel/RestorationCharts';
import TimeSeriesChart from 'components/AnalysisPanel/TimeSeriesChart';
import TotalLossChart from 'components/AnalysisPanel/TotalLossChart';
import SadAlertsChart from 'components/AnalysisPanel/SadAlertsChart';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import SlopeSelect from 'components/AnalysisPanel/SlopeClassSelect';
import LossGainBadge from 'components/AnalysisPanel/LossGainBadge';
import SlopeBarChart from 'components/AnalysisPanel/SlopeBarChart';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import BiomassChart from 'components/AnalysisPanel/BiomassChart';
import FiresBadge from 'components/AnalysisPanel/FiresBadge';
import Badge from 'components/AnalysisPanel/Badge';
import BarChart from 'components/AnalysisPanel/BarChart';
import VegaChart from 'components/AnalysisPanel/VegaChart';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import {attributes} from 'constants/AppConstants';
import tabKeys from 'constants/TabViewConstants';
import layerKeys from 'constants/LayerConstants';
import {analysisConfig} from 'js/config';
import {formatters} from 'utils/analysisUtils';
import Loader from 'components/Loader';
import esriRequest from 'esri/request';
// import Deferred from 'dojo/Deferred';
import moment from 'moment';
import request from 'utils/request';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';
import analysisUtils from '../../utils/analysisUtils';
import MapActions from '../../actions/MapActions';

export default class Analysis extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  state = {
    error: false,
    isLoading: false,
    chartComponent: null,
  };

  componentDidMount() {
    const { settings } = this.context;
    const { analysisModules } = settings;

    analysisModules.forEach((analysisModule) => {
      MapActions.updateAnalysisParams.defer({ id: analysisModule.analysisId });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeAnalysisType !== this.props.activeAnalysisType) {
      this.setState({ chartComponent: null });
    }
  }

  renderResults = (type, results, language, config) => {
    const { chartType, label } = config;
    const { analysisSliderIndices } = this.props;
    let chartComponent = null;

    switch (chartType) {
      case 'bar': {
        const { chartBounds, color, analysisId, valueAttribute } = config;
        const labels = [...Array(chartBounds[1] + 1 - chartBounds[0])] // create a new arr out of the bounds difference
        .map((i, idx) => idx + chartBounds[0]); // fill in the values based on the bounds

        let startIndex = 0;
        let endIndex = labels.length - 1;

        if (analysisSliderIndices[analysisId]) {
          startIndex = analysisSliderIndices[analysisId][0];
          endIndex = analysisSliderIndices[analysisId][1];
        }

        let counts = [];
        let encoder = null;

        switch (analysisId) {
          case 'TC_LOSS': {
            const lossObj = results.data.attributes.loss;
            counts = Object.values(lossObj);
            break;
          }
          case 'IFL': {
            results.data.attributes.histogram[0].result.forEach(histo => {
              counts.push(Math.round(histo.result * 100) / 100);
            });
            encoder = analysisUtils.getEncoder({
              bounds: [labels[0], labels[labels.length - 1]]
              },
              analysisConfig[analysisKeys.TC_LOSS]
            );
            break;
          }
          default:
            if (valueAttribute) {
              counts = valueAttribute.split('.').reduce((prevVal, currentVal) => {
                if (!prevVal.hasOwnProperty(currentVal)) {
                  throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
                }
                return prevVal[currentVal];
              }, results);
              break;
            }
            counts = results;
        }

        chartComponent = <BarChart
          name={label[language]}
          counts={counts}
          colors={color ? [color] : ['#cf5188']}
          labels={labels.slice(startIndex, endIndex + 1)}
          results={results}
          encoder={encoder}
        />;

        break;
      }
      case 'timeSeries': {
        const data = formatters.alerts(results.data.attributes.value);
        chartComponent = <TimeSeriesChart data={data} name={label[language] ? label[language] : ''} />;
        break;
      }
      case 'badge': {
        const {
          activeAnalysisType,
          lossFromSelectIndex,
          lossToSelectIndex,
          viirsFrom,
          viirsTo,
        } = this.props;

        const { valueAttribute, color, badgeLabel } = config;

        if (activeAnalysisType === 'TC_LOSS_GAIN') {
          chartComponent = <LossGainBadge results={results} lossFromSelectIndex={lossFromSelectIndex} lossToSelectIndex={lossToSelectIndex} />;
        }

        if (activeAnalysisType === 'VIIRS_FIRES') {
          // chartComponent = <FiresBadge results={results} from={viirsFrom} to={viirsTo} />;
          chartComponent = <Badge results={results} valueAttribute={valueAttribute} color={color} label={badgeLabel[language]} />;
        }

        break;
      }
      case 'biomassLoss': {
        chartComponent = <BiomassChart
          payload={results}
          colors={analysisConfig.BIO_LOSS.colors}
          />;
        break;
      }
      case 'lccPie': {
        const data = {
          counts: []
        };
        results.data.attributes.histogram.forEach(histo => {
          if (!data[histo.className]) {
            data[histo.className] = 0;
          }
          histo.result.forEach(year => {
            data[histo.className] += year.result;
          });
          data.counts.push(Math.round(data[histo.className] * 100) / 100);
        });

        chartComponent = <CompositionPieChart
          results={results}
          name={label[language]}
          counts={data.counts}
          colors={config.colors}
          labels={config.classes[language]}
        />;
        break;
      }
      case 'vega':
        chartComponent = <VegaChart config={results.data.attributes.widgetConfig} />;
        break;
      default:
        break;
    }

    this.setState({ chartComponent });
  }

  setLoader = loadingObj => { //isLoading and possibly error
    this.setState(loadingObj);
  }

  runAnalysis = () => {
    const { analysisParams, activeAnalysisType, selectedFeature, canopyDensity } = this.props;
    const { settings: { analysisModules }, language } = this.context;
    this.setState({
      isLoading: true,
      results: null,
      isError: false
    });
    Object.keys(analysisParams).forEach(analysisId => {
      if (analysisId === activeAnalysisType) {
        const analysisSettings = analysisModules.filter(cam => cam.analysisId === analysisId)[0];
        const geostoreId = selectedFeature.attributes.geostoreId;

        const uiParamsToAppend = analysisParams[analysisId];
        uiParamsToAppend.geostore = geostoreId;

        if (analysisSettings.uiParams && analysisSettings.uiParams !== 'none') {
          const TCDConfig = analysisSettings.uiParams.filter(p => p.inputType === 'tcd')[0];
          if (TCDConfig) { uiParamsToAppend[TCDConfig.name] = canopyDensity; }
        }

        if (analysisSettings.params && analysisSettings.params.length !== 0) {
          analysisSettings.params.forEach(param => {
            uiParamsToAppend[param.name] = param.value;
          });
        }

        if (analysisSettings.useGfwWidget) {
          analysisSettings.chartType = 'vega';

          analysisUtils.getCustomAnalysis(analysisSettings, uiParamsToAppend).then(results => {
            this.setState({ isLoading: false });
            this.renderResults(analysisId, results, language, analysisSettings);
          });
          return;
        }

        esriRequest({
          url: analysisSettings.analysisUrl,
          callbackParamName: 'callback',
          content: uiParamsToAppend,
          handleAs: 'json',
          timeout: 30000
        }, { usePost: false }).then(results => {
          this.setState({ isLoading: false });
          this.renderResults(analysisId, results, language, analysisSettings);
        }, (error) => {
          this.setState({
            isLoading: false,
            results: {
              error: error,
              message: 'there was an error'
            },
            isError: true,
          });
        });
      }
    });
  }

  render () {
    const {selectedFeature, activeAnalysisType, activeSlopeClass, editingEnabled} = this.props;
    const { isLoading, error, chartComponent} = this.state;
    const {language, settings} = this.context;
    let title, slopeSelect;

    // If we have the restoration module, add in the slope select
    if (settings.restorationModule) {
      slopeSelect = (
        <div className={`analysis-results__density-display ${activeAnalysisType === analysisKeys.SLOPE ? '' : 'hidden'}`}>
          <SlopeSelect activeSlopeClass={activeSlopeClass}/>
        </div>
      );
    }

    if (selectedFeature.attributes.source === attributes.SOURCE_DRAW ||
      selectedFeature.attributes.source === attributes.SOURCE_UPLOAD
    ) {
      title = (
        <div className='analysis-results__title'>
          <CustomFeatureControl feature={selectedFeature} editingEnabled={editingEnabled} />
        </div>
      );
    } else {
      title = (
        <h3 className='analysis-results__title'>
          {selectedFeature.getTitle ? selectedFeature.getTitle() : ''}
        </h3>
      );
    }

    return (
      <div className='analysis-results'>
        <Loader active={isLoading} />
        <div className='analysis-results__content custom-scroll'>
          {title}
          <div className='analysis-results__select-label'>
            {text[language].ANALYSIS_SELECT_TYPE_LABEL}
          </div>
          <AnalysisTypeSelect {...this.props} analysisItems={settings.analysisModules} chartVisible={!!chartComponent} />
          {error ?
            <div className=''>Error Here</div> :
            <div className='analysis-results__chart-component-container'>
              {slopeSelect}
              {chartComponent}
            </div>
          }
        </div>
        <div className='analysis-results__footer'>
          {activeAnalysisType !== 'default' && !chartComponent && <div className='report-sub-buttons'>
            <button className='fa-button gold' onClick={this.runAnalysis}>
              {text[language].RUN_ANALYSIS_BUTTON_TEXT}
            </button>
          </div>}
          <ReportSubscribeButtons setLoader={this.setLoader} />
        </div>
      </div>
    );
  }

}

Analysis.propTypes = {
  selectedFeature: PropTypes.object.isRequired
};
