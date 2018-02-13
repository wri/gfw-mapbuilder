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

  //- Test this as it will need to be tweaked, ideally when we receive new props,
  //- We want to reset state to default before our render pass
  // componentWillReceiveProps(nextProps) {
  //   const {
  //     selectedFeature,
  //     activeTab,
  //     activeAnalysisType,
  //     canopyDensity,
  //     activeSlopeClass,
  //     lossFromSelectIndex,
  //     lossToSelectIndex,
  //     gladStartDate,
  //     gladEndDate,
  //     terraIStartDate,
  //     terraIEndDate,
  //     viirsStartDate,
  //     viirsEndDate,
  //     modisStartDate,
  //     modisEndDate
  //   } = nextProps;

  //   //- Only rerun the analysis if one of these things changes
  //   if (
  //     (selectedFeature !== this.props.selectedFeature ||
  //     activeAnalysisType !== this.props.activeAnalysisType ||
  //     activeTab !== this.props.activeTab ||
  //     canopyDensity !== this.props.canopyDensity ||
  //     activeSlopeClass !== this.props.activeSlopeClass
  //     ) &&
  //     activeTab === tabKeys.ANALYSIS &&
  //     activeAnalysisType !== '' &&
  //     activeAnalysisType !== 'default'
  //   ) {
  //     // this.setState(getDefaultState());
  //     this.setState({isLoading: true, results: null, isError: false});
  //     const { settings, language } = this.context;
  //     request.getRawGeometry(selectedFeature).then(geometry => {
  //       performAnalysis({
  //         type: activeAnalysisType,
  //         geometry: geometry,
  //         geostoreId: selectedFeature.attributes.geostoreId,
  //         canopyDensity: canopyDensity,
  //         activeSlopeClass: activeSlopeClass,
  //         settings: settings,
  //         language: language,
  //         tcLossFrom: lossFromSelectIndex,
  //         tcLossTo: lossToSelectIndex,
  //         gladFrom: gladStartDate,
  //         gladTo: gladEndDate,
  //         terraIFrom: terraIStartDate,
  //         terraITo: terraIEndDate,
  //         viirsFrom: moment(viirsStartDate),
  //         viirsTo: moment(viirsEndDate),
  //         modisFrom: moment(modisStartDate),
  //         modisTo: moment(modisEndDate)
  //       }).then((results) => {
  //         this.setState({ results: results, isLoading: false });
  //       }, () => {
  //         this.setState({ isLoading: false });
  //       });
  //     });
  //   }
  // }

  // renderResults = (type, results, language, lossFromSelectIndex, lossToSelectIndex, viirsFrom, viirsTo, modisFrom, modisTo) => {
  renderResults = (type, results, language, config) => {
    const {settings} = this.context;
    const layerGroups = settings.layerPanel;
    const lossLabels = analysisConfig[analysisKeys.TC_LOSS].labels;
    const lcLayers = layerGroups.GROUP_LC ? layerGroups.GROUP_LC.layers : [];
    let labels, layerConf, colors;
    switch (type) {
      case analysisKeys.VIIRS_FIRES:
        return <FiresBadge results={results} count={results.fireCount} from={viirsFrom} to={viirsTo} />;
      case analysisKeys.MODIS_FIRES:
        return <FiresBadge count={results.fireCount} from={modisFrom} to={modisTo} />;
      case analysisKeys.TC_LOSS_GAIN:
        return <LossGainBadge results={results} lossFromSelectIndex={lossFromSelectIndex} lossToSelectIndex={lossToSelectIndex} />;
      case analysisKeys.LCC:
        layerConf = utils.getObject(lcLayers, 'id', layerKeys.LAND_COVER);

        return <CompositionPieChart
          results={results}
          name={text[language].ANALYSIS_LCC_CHART_NAME}
          counts={results.counts}
          colors={layerConf.colors}
          labels={layerConf.classes[language]} />;
      case analysisKeys.TC_LOSS: {
        // labels = lossLabels.slice(lossFromSelectIndex, lossToSelectIndex + 1);
        const sliderConfig = config.uiParams.filter(i => i.inputType === 'rangeSlider')[0];
        labels = Array.apply(
          null,
          Array(sliderConfig.bounds[1] - sliderConfig.bounds[0] + 1)
        ).map((i, idx) => idx + sliderConfig.bounds[0]);

        const lossObj = results.data.attributes.loss;
        const counts = Object.values(lossObj);
        console.log('a;lskdjfaiojnfcao;isdjfg;aodisjfas');
        const chartComponent = <BarChart
        name={text[language].ANALYSIS_TC_CHART_NAME}
        counts={counts}
        colors={['#cf5188']}
        labels={labels}
        results={results}/>;

        this.setState({ chartComponent });
      }
      case analysisKeys.BIO_LOSS:
        return <BiomassChart
          payload={results}
          labels={analysisConfig[type].labels}
          colors={analysisConfig[type].colors}
          />;
      case analysisKeys.LC_LOSS:
      case analysisKeys.INTACT_LOSS:
      case analysisKeys.MANGROVE_LOSS:
        layerConf = utils.getObject(lcLayers, 'id', layerKeys.LAND_COVER);
        labels = (function () {
          switch (type) {
            case analysisKeys.LC_LOSS:
              return layerConf.classes[language];
            case analysisKeys.INTACT_LOSS:
              return text[language].ANALYSIS_IFL_LABELS;
            case analysisKeys.MANGROVE_LOSS:
              return text[language].ANALYSIS_MANGROVE_LABELS;
            default:
              return analysisConfig[type].labels;
          }
        })();
        colors = type === analysisKeys.LC_LOSS ? layerConf.colors : analysisConfig[type].colors;

        return <TotalLossChart
          results={results}
          counts={results.counts}
          encoder={results.encoder}
          options={results.options}
          labels={labels}
          lossLabels={lossLabels}
          colors={colors} />;
      case analysisKeys.SLOPE: {
        const {counts} = results;
        labels = counts.map((v, index) => text[language].ANALYSIS_SLOPE_OPTION + (index + 1));
        colors = settings.slopeAnalysisPotentialColors;
        const tooltips = settings.labels[language].slopeAnalysisPotentialOptions;
        //- Need a new chart to handle these values correctly
        return <SlopeBarChart results={results} counts={counts} colors={colors} labels={labels} tooltips={tooltips} />;
      }
      case analysisKeys.SAD_ALERTS: {
        const {alerts} = results;
        return <SadAlertsChart
          results={results}
          alerts={alerts}
          colors={analysisConfig[type].colors}
          names={text[language].ANALYSIS_SAD_ALERT_NAMES} />;
      }
      case analysisKeys.GLAD_ALERTS: {
        const alerts = formatters.alerts(results.data.attributes.value);
        const chartComponent = <TimeSeriesChart data={alerts} name={text[language].ANALYSIS_GLAD_ALERT_NAME} />;

        this.setState({ chartComponent });
      }
      case analysisKeys.TERRA_I_ALERTS:
        return <TimeSeriesChart data={results.data} name={text[language].ANALYSIS_TERRA_I_ALERT_NAME} />;
      // case 'custom':
      //   results.data.attributes.widgetConfig.width = 220;
      //   return <VegaChart config={results.data.attributes.widgetConfig} />;
      // case 'custom2':
      //   return <VegaChart config={results.data.attributes.widgetConfig} />;
      case 'default':
        return null;
      default: {
        if (analysisConfig.useGfwWidget) {
          // TESTING CUSTOM ANALYSIS
          const chartComponent = <VegaChart config={results.data.attributes.widgetConfig} />;
          this.setState({ chartComponent });
        } else {
          //- This should only be the restoration analysis, since its value is a plain rasterId
            return <RestorationCharts results={results} />;
        }
      }
    }
  };

  setLoader = loadingObj => { //isLoading and possibly error
    this.setState(loadingObj);
  }

  runAnalysis = () => {
    const { analysisParams, activeAnalysisType, selectedFeature, canopyDensity } = this.props;
    const { settings: { customAnalysisModules }, language } = this.context;
    this.setState({
      isLoading: true,
      results: null,
      isError: false
    });
    Object.keys(analysisParams).forEach(analysisId => {
      console.log(analysisId, activeAnalysisType);
      if (analysisId === activeAnalysisType) {
        const analysisSettings = customAnalysisModules.filter(cam => cam.analysisId === analysisId)[0];
        const TCDConfig = analysisSettings.uiParams.filter(p => p.inputType === 'tcd')[0];
        const content = analysisParams[analysisId];
        const geostoreId = selectedFeature.attributes.geostoreId;
        content.geostore = geostoreId;
        if (TCDConfig) { content[TCDConfig.name] = canopyDensity; }
        if (analysisSettings.params && analysisSettings.params.length !== 0) {
          analysisSettings.params.forEach(param => {
            content[param.name] = param.value;
          });
        }

        if (analysisSettings.useGfwWidget) {
          console.log('Gettig herealsdkjfaljf');
          analysisUtils.getCustomAnalysis(analysisSettings, geostoreId).then(results => {
            this.renderResults(analysisId, results, language, analysisSettings);
          });
        }
        // request.getRawGeometry(selectedFeature).then((geometry) => {

          esriRequest({
            url: analysisSettings.analysisUrl,
            callbackParamName: 'callback',
            content: content,
            handleAs: 'json',
            timeout: 30000
          }, { usePost: false }).then(results => {
            this.setState({ isLoading: false });
            this.renderResults(analysisId, results, language, analysisSettings);
          //   if (typeof lossGainResult === 'object' && lossGainResult.hasOwnProperty('error')) {
          //     this.setState({
          //       isLoading: false,
          //       results: {
          //         error: lossGainResult.error,
          //         message: text[language].ANALYSIS_ERROR_TC_LOSS
          //       },
          //       isError: true,
          //     });
          //   } else {
          //     const lossObj = lossGainResult.data.attributes.loss;
          //     const counts = Object.values(lossObj);
          //     this.setState({
          //       results: { counts },
          //       isLoading: false
          //     });
          //   }
          //   // deferred.resolve(lossGainResult || []);
          // }, err => {
          //   console.error(err);
          //   // deferred.resolve({ error: err });
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
        // })
      }
    });
  }

  render () {
    const {selectedFeature, activeAnalysisType, canopyDensity, activeSlopeClass, lossFromSelectIndex, lossToSelectIndex, viirsStartDate, viirsEndDate, modisStartDate, modisEndDate, editingEnabled} = this.props;
    const {results, isLoading, error, chartComponent} = this.state;
    const {language, settings} = this.context;
    let chart, title, slopeSelect;

    // If we have results, show a chart
    // if (results) {
      // const config = settings.customAnalysisModules.filter(cam => cam.analysisId === activeAnalysisType)[0];
      // chart = this.renderResults(activeAnalysisType, results, language, lossFromSelectIndex, lossToSelectIndex, viirsStartDate, viirsEndDate, modisStartDate, modisEndDate);
      // chart = this.renderResults(activeAnalysisType, results, language, config);
    // }

    // If we have the restoration module, add in the slope select
    if (settings.restorationModule) {
      slopeSelect = (
        <div className={`analysis-results__density-display ${activeAnalysisType === analysisKeys.SLOPE ? '' : 'hidden'}`}>
          <SlopeSelect activeSlopeClass={activeSlopeClass}/>
        </div>
      );
    }

    const showDensityDisplay = (
    //   activeAnalysisType === analysisKeys.TC_LOSS ||
    //   activeAnalysisType === analysisKeys.TC_LOSS_GAIN ||
    //   activeAnalysisType === analysisKeys.LC_LOSS ||
    //   activeAnalysisType === analysisKeys.BIO_LOSS ||
    //   activeAnalysisType === analysisKeys.INTACT_LOSS
    null
    );

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
          <AnalysisTypeSelect {...this.props} analysisItems={settings.customAnalysisModules} />
          {error ?
            <div className=''>Error Here</div> :
            <div>
              <div className={`analysis-results__density-display ${showDensityDisplay ? '' : 'hidden'}`}>
                <DensityDisplay canopyDensity={canopyDensity} />
              </div>
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
