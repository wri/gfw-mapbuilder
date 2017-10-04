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
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import {attributes} from 'constants/AppConstants';
import tabKeys from 'constants/TabViewConstants';
import layerKeys from 'constants/LayerConstants';
import {analysisConfig} from 'js/config';
import Loader from 'components/Loader';
// import Deferred from 'dojo/Deferred';
import request from 'utils/request';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const getDefaultState = function () {
  return {
    error: false,
    isLoading: true,
    results: undefined
  };
};

export default class Analysis extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  state = getDefaultState();

  componentDidMount() {
    const {settings, language} = this.context;
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType,
      canopyDensity,
      activeSlopeClass,
      lossFromSelectIndex,
      lossToSelectIndex,
      gladStartDate,
      gladEndDate,
      terraIStartDate,
      terraIEndDate,
      viirsFiresSelectIndex,
      modisFiresSelectIndex,
      viirsStartDate,
      viirsEndDate,
      modisStartDate,
      modisEndDate
    } = this.props;

    if (selectedFeature && activeAnalysisType === 'TC_LOSS_GAIN' && activeTab === tabKeys.ANALYSIS) {
      request.getRawGeometry(selectedFeature).then(geometry => {

        performAnalysis({
          type: activeAnalysisType,
          geometry: geometry,
          geostoreId: selectedFeature.attributes.geostoreId,
          canopyDensity: canopyDensity,
          activeSlopeClass: activeSlopeClass,
          settings: settings,
          language: language,
          tcLossFrom: lossFromSelectIndex,
          tcLossTo: lossToSelectIndex,
          gladFrom: gladStartDate,
          gladTo: gladEndDate,
          terraIFrom: terraIStartDate,
          terraITo: terraIEndDate,
          viirsFiresSelectIndex: viirsFiresSelectIndex,
          modisFiresSelectIndex: modisFiresSelectIndex,
          viirsFrom: viirsStartDate,
          viirsTo: viirsEndDate,
          modisFrom: modisStartDate,
          modisTo: modisEndDate
        }).then((results) => {
          this.setState({ results: results, isLoading: false });
        }, () => {
          this.setState({ isLoading: false, error: true });
        });
      });
    }
  }

  //- Test this as it will need to be tweaked, ideally when we receive new props,
  //- We want to reset state to default before our render pass
  componentWillReceiveProps(nextProps) {
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType,
      canopyDensity,
      activeSlopeClass,
      lossFromSelectIndex,
      lossToSelectIndex,
      gladStartDate,
      gladEndDate,
      terraIStartDate,
      terraIEndDate,
      viirsFiresSelectIndex,
      modisFiresSelectIndex,
      viirsStartDate,
      viirsEndDate,
      modisStartDate,
      modisEndDate
    } = nextProps;

    //- Only rerun the analysis if one of these things changes
    if (
      (selectedFeature !== this.props.selectedFeature ||
      activeAnalysisType !== this.props.activeAnalysisType ||
      activeTab !== this.props.activeTab ||
      canopyDensity !== this.props.canopyDensity ||
      activeSlopeClass !== this.props.activeSlopeClass
      ) &&
      activeTab === tabKeys.ANALYSIS &&
      activeAnalysisType !== ''
    ) {
      this.setState(getDefaultState());
      const { settings, language } = this.context;
      request.getRawGeometry(selectedFeature).then(geometry => {
        performAnalysis({
          type: activeAnalysisType,
          geometry: geometry,
          geostoreId: selectedFeature.attributes.geostoreId,
          canopyDensity: canopyDensity,
          activeSlopeClass: activeSlopeClass,
          settings: settings,
          language: language,
          tcLossFrom: lossFromSelectIndex,
          tcLossTo: lossToSelectIndex,
          gladFrom: gladStartDate,
          gladTo: gladEndDate,
          terraIFrom: terraIStartDate,
          terraITo: terraIEndDate,
          viirsFiresSelectIndex: viirsFiresSelectIndex,
          modisFiresSelectIndex: modisFiresSelectIndex,
          viirsFrom: viirsStartDate,
          viirsTo: viirsEndDate,
          modisFrom: modisStartDate,
          modisTo: modisEndDate
        }).then((results) => {
          this.setState({ results: results, isLoading: false });
        }, () => {
          this.setState({ isLoading: false });
        });
      });
    }
  }

  renderResults = (type, results, language, lossFromSelectIndex, lossToSelectIndex, viirsFrom, viirsTo, modisFrom, modisTo) => {
    const {settings} = this.context;
    const layerGroups = settings.layerPanel;
    const lossLabels = analysisConfig[analysisKeys.TC_LOSS].labels;
    const lcLayers = layerGroups.GROUP_LC ? layerGroups.GROUP_LC.layers : [];
    let labels, layerConf, colors;
    switch (type) {
      case analysisKeys.VIIRS_FIRES:
        return <FiresBadge results={results} count={results.fireCount} from={viirsFrom.toLocaleDateString()} to={viirsTo.toLocaleDateString()} />;
      case analysisKeys.MODIS_FIRES:
        return <FiresBadge count={results.fireCount} from={modisFrom.toLocaleDateString()} to={modisTo.toLocaleDateString()} />;
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
      case analysisKeys.TC_LOSS:

        labels = lossLabels.slice(lossFromSelectIndex, lossToSelectIndex + 1);

        return <BarChart
          name={text[language].ANALYSIS_TC_CHART_NAME}
          counts={results.counts}
          colors={analysisConfig[type].colors}
          labels={labels}
          results={results}/>;
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
      case analysisKeys.SLOPE:
        const {counts} = results;
        labels = counts.map((v, index) => text[language].ANALYSIS_SLOPE_OPTION + (index + 1));
        colors = settings.slopeAnalysisPotentialColors;
        const tooltips = settings.labels[language].slopeAnalysisPotentialOptions;
        //- Need a new chart to handle these values correctly
        return <SlopeBarChart results={results} counts={counts} colors={colors} labels={labels} tooltips={tooltips} />;
      case analysisKeys.SAD_ALERTS:
        const {alerts} = results;
        return <SadAlertsChart
          results={results}
          alerts={alerts}
          colors={analysisConfig[type].colors}
          names={text[language].ANALYSIS_SAD_ALERT_NAMES} />;
      case analysisKeys.GLAD_ALERTS:
        return <TimeSeriesChart data={results} name={text[language].ANALYSIS_GLAD_ALERT_NAME} />;
      case analysisKeys.TERRA_I_ALERTS:
        return <TimeSeriesChart data={results} name={text[language].ANALYSIS_TERRA_I_ALERT_NAME} />;
      default:
      //- This should only be the restoration analysis, since its value is a plain rasterId
        return <RestorationCharts results={results} />;
    }
  };

  render () {
    const {selectedFeature, activeAnalysisType, canopyDensity, activeSlopeClass, lossFromSelectIndex, lossToSelectIndex, viirsStartDate, viirsEndDate, modisStartDate, modisEndDate} = this.props;
    const {results, isLoading, error} = this.state;
    const {language, settings} = this.context;
    let chart, title, slopeSelect;

    // If we have results, show a chart
    if (results) {
      chart = this.renderResults(activeAnalysisType, results, language, lossFromSelectIndex, lossToSelectIndex, viirsStartDate, viirsEndDate, modisStartDate, modisEndDate);
    }

    // If we have the restoration module, add in the slope select
    if (settings.restorationModule) {
      slopeSelect = (
        <div className={`analysis-results__density-display ${activeAnalysisType === analysisKeys.SLOPE ? '' : 'hidden'}`}>
          <SlopeSelect activeSlopeClass={activeSlopeClass}/>
        </div>
      );
    }

    const showDensityDisplay = (
      activeAnalysisType === analysisKeys.TC_LOSS ||
      activeAnalysisType === analysisKeys.TC_LOSS_GAIN ||
      activeAnalysisType === analysisKeys.LC_LOSS ||
      activeAnalysisType === analysisKeys.BIO_LOSS ||
      activeAnalysisType === analysisKeys.INTACT_LOSS
    );

    if (selectedFeature.attributes.source === attributes.SOURCE_DRAW ||
      selectedFeature.attributes.source === attributes.SOURCE_UPLOAD
    ) {
      title = (
        <div className='analysis-results__title'>
          <CustomFeatureControl feature={selectedFeature} />
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
          <AnalysisTypeSelect {...this.props} />
          {error ?
            <div className=''>Error Here</div> :
            <div>
              <div className={`analysis-results__density-display ${showDensityDisplay ? '' : 'hidden'}`}>
                <DensityDisplay canopyDensity={canopyDensity} />
              </div>
              {slopeSelect}
              {chart}
            </div>
          }
        </div>
        <div className='analysis-results__footer'>
          <ReportSubscribeButtons />
        </div>
      </div>
    );
  }

}

Analysis.propTypes = {
  selectedFeature: PropTypes.object.isRequired
};
