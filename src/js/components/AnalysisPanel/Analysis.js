import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import CompositionPieChart from 'components/AnalysisPanel/CompositionPieChart';
import AnalysisTypeSelect from 'components/AnalysisPanel/AnalysisTypeSelect';
import TimeSeriesChart from 'components/AnalysisPanel/TimeSeriesChart';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import SlopeSelect from 'components/AnalysisPanel/SlopeClassSelect';
import LossGainBadge from 'components/AnalysisPanel/LossGainBadge';
import BiomassChart from 'components/AnalysisPanel/BiomassChart';
import FiresBadge from 'components/AnalysisPanel/FiresBadge';
import Badge from 'components/AnalysisPanel/Badge';
import BarChart from 'components/AnalysisPanel/BarChart';
import VegaChart from 'components/AnalysisPanel/VegaChart';
import AnalysisRangeSlider from './AnalysisFormElements/AnalysisRangeSlider';
import AnalysisDatePicker from './AnalysisFormElements/AnalysisDatePicker';
import AnalysisMultiDatePicker from './AnalysisFormElements/AnalysisMultiDatePicker';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import webmercatorUtils from 'esri/geometry/webMercatorUtils';
import geojsonUtil from 'utils/arcgis-to-geojson';
import analysisKeys from 'constants/AnalysisConstants';
import {attributes} from 'constants/AppConstants';
import {analysisConfig} from 'js/config';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import {formatters, getCustomAnalysis} from 'utils/analysisUtils';
import analysisUtils from 'utils/analysisUtils';
import Loader from 'components/Loader';
import esriRequest from 'esri/request';
import moment from 'moment';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';
import MapActions from '../../actions/MapActions';

const AnalysisItemWrapper = ({ title, itemNumber, children }) => (
  <div className='analysis-item-wrapper'>
    <div className='analysis-item-label'>
      <span><strong>{itemNumber}</strong></span>
      {title}
    </div>
    {children}
  </div>
);

export default class Analysis extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  state = {
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

  getFormComponents = (activeAnalysisType, analysisItems) => {
    const { language } = this.context;
    const analysisItemConfig = analysisItems.filter(ai => ai.analysisId === activeAnalysisType)[0];
    const { uiParams } = analysisItemConfig;
    const formComponents = [];
    if (uiParams === 'none') {
      return (
        <div
          className='analysis-results__select-form-item-container'
        >
          Click the &lsquo;Run Analysis&rsquo; button see analysis
        </div>
      );
    }

    if (!uiParams || uiParams.length === 0) {
      throw new Error("you either didn't supply an 'uiParams' property on your module or it contained 0 items. Please check your analysis module config. If you don't need UI elements, add `uiParams: 'none'`");
    }

    analysisItemConfig.uiParams.forEach((param, idx) => {
      switch (param.inputType) {
        case 'rangeSlider': {
          const {
            bounds,
            step,
            label,
            startParamName,
            endParamName,
            combineParams,
            inputType,
            valueType,
            valueSeparator,
          } = param;

          let initialStartValue = null;
          let initialEndValue = null;

          if (!bounds || bounds.length !== 2 || (bounds[1] - bounds[0] < 1)) {
            throw new Error(`analysis id: '${analysisItemConfig.analysisId}', UI Element type: 'rangeSlider' -> 'bounds' is incorrectly configured. Please check your analysis module config`);
          }

          if (analysisItemConfig.analysisId === 'TC_LOSS') {
            const { lossToSelectIndex, lossFromSelectIndex, lossOptions } = this.props;
            initialStartValue = Number(lossOptions[lossFromSelectIndex].label);
            initialEndValue = Number(lossOptions[lossToSelectIndex].label);
          }
          formComponents.push(
            <AnalysisItemWrapper
              key={analysisItemConfig.analysisId + inputType + idx}
              title={label[language]}
              itemNumber={idx + 1}
            >
              <AnalysisRangeSlider
                analysisId={analysisItemConfig.analysisId}
                bounds={bounds}
                valueType={valueType || null}
                startParamName={startParamName}
                endParamName={combineParams ? null : endParamName}
                valueSeparator={combineParams ? valueSeparator : null}
                step={step || 1}
                combineParams={combineParams}
                initialStartValue={initialStartValue}
                initialEndValue={initialEndValue}
                rangeSliderCallback={this.rangeSliderCallback}
              />
            </AnalysisItemWrapper>
          );
          break;
        }
        case 'tcd': {
          const { canopyDensity } = this.props;
          const { label } = param;
          formComponents.push(
            <AnalysisItemWrapper
              key={analysisItemConfig.analysisId + param.inputType + idx}
              title={label[language] ? label[language] : ''}
              itemNumber={idx + 1}
            >
              <div
                className='analysis-results__select-form-item-container'
              >
                <DensityDisplay
                  label={''}
                  canopyDensity={canopyDensity}
                />
              </div>
            </AnalysisItemWrapper>
          );
          break;
        }
        case 'datepicker': {
          const {
            label,
            startParamName,
            endParamName,
            combineParams,
            valueSeparator,
            multi,
            minDate,
            maxDate,
          } = param;

          let {
            defaultStartDate,
            defaultEndDate,
          } = param;

          let initialStartDate = null;
          let initialEndDate = null;

          if (analysisItemConfig.analysisId === 'GLAD_ALERTS') {
            const { gladStartDate, gladEndDate } = this.props;
            initialStartDate = moment(gladStartDate);
            initialEndDate = moment(gladEndDate);
          }

          if (analysisItemConfig.analysisId === 'FORMA_ALERTS') {
            const { formaStartDate, formaEndDate } = this.props;
            initialStartDate = moment(formaStartDate);
            initialEndDate = moment(formaEndDate);
          }

          if (analysisItemConfig.analysisId === 'TERRAI_ALERTS') {
            const { terraIStartDate, terraIEndDate } = this.props;
            initialStartDate = moment(terraIStartDate);
            initialEndDate = moment(terraIEndDate);
          }

          if (analysisItemConfig.analysisId === 'VIIRS_FIRES') {
            const { viirsStartDate, viirsEndDate } = this.props;
            initialStartDate = moment(viirsStartDate);
            initialEndDate = moment(viirsEndDate);
          }

          if (initialStartDate) { defaultStartDate = initialStartDate; }
          if (initialEndDate) { defaultEndDate = initialEndDate; }

          if (!defaultStartDate && minDate) {
            defaultStartDate = minDate;
          }

          if (!defaultEndDate && maxDate) {
            defaultEndDate = maxDate;
          }

          if (multi === true || multi === 'true') {
            formComponents.push(
              <AnalysisItemWrapper
                key={analysisItemConfig.analysisId + param.inputType + idx}
                title={label[language]}
                itemNumber={idx + 1}
              >
                <AnalysisMultiDatePicker
                  analysisId={analysisItemConfig.analysisId}
                  startParamName={startParamName}
                  endParamName={endParamName}
                  combineParams={combineParams || null}
                  valueSeparator={combineParams ? valueSeparator : null}
                  multi={true}
                  defaultStartDate={defaultStartDate || new Date()}
                  defaultEndDate={defaultEndDate || new Date()}
                  minDate={minDate || null}
                  maxDate={maxDate || new Date()}
                  calendarCallback={this.calendarCallback}
                />
              </AnalysisItemWrapper>
            );
            break;
          }

          formComponents.push(
            <AnalysisItemWrapper
              key={analysisItemConfig.analysisId + param.inputType + idx}
              title={label[language]}
              itemNumber={idx + 1}
            >
              <AnalysisDatePicker
                analysisId={analysisItemConfig.analysisId}
                startParamName={startParamName}
                combineParams={combineParams || null}
                valueSeparator={combineParams ? valueSeparator : null}
                multi={false}
                defaultSelected={defaultStartDate || null}
                minDate={minDate}
                maxDate={maxDate}
                calendarCallback={this.calendarCallback}
              />
            </AnalysisItemWrapper>
          );

          break;
        }
        default:
          return null;
      }
    });
    return formComponents;
  }

  rangeSliderCallback = (rangeSliderValue, id, combineParams, startParam, endParam, valueSeparator, valueType) => {
    let startValue = rangeSliderValue[0];
    let endValue = rangeSliderValue[1];

    if (valueType === 'date') {
      startValue = `${startValue}-01-01`;
      endValue = `${endValue}-12-31`;
    }

    if (combineParams) {
      if (!valueSeparator) {
        throw new Error("no 'valueSeparator' property configured. If using 'combineParams', you must supply a 'valueSeparator'. Check your analysisModule config.");
      }

      mapActions.updateAnalysisParams({
        id,
        paramName: startParam,
        paramValue: `${startValue}${valueSeparator}${endValue}`,
      });
      return;
    }

    mapActions.updateAnalysisParams({
      id,
      paramName: startParam,
      paramValue: `${startValue}`,
    });

    mapActions.updateAnalysisParams({
      id,
      paramName: endParam,
      paramValue: `${endValue}`,
    });
  }

  calendarCallback = (startDate, endDate, id, combineParams, multi, startParam, endParam, valueSeparator) => {
    const sDate = moment(startDate);
    const eDate = moment(endDate);

    switch (id) {
      case 'TC_LOSS': {
        // let lossObj = null;
        // if (!results.hasOwnProperty('error')) {
        //   lossObj = results.data.attributes.loss;
        //   counts = Object.values(lossObj);
        // }
        break;
      }
      case 'VIIRS_FIRES': {
        if (startDate) {
          const isSameStart = this.props.viirsStartDate.diff(sDate, 'days') === 0;
          if (!isSameStart) {
            layerActions.updateViirsStartDate(sDate);
          }
        }

        if (endDate) {
          const isSameEnd = this.props.viirsEndDate.diff(eDate, 'days') === 0;
          if (!isSameEnd) {
            layerActions.updateViirsStartDate(eDate);
          }
        }

      }
      default: {
        break;
      }
    }

    if (combineParams) {
      if (!valueSeparator) {
        throw new Error("no 'valueSeparator' property configured. If using 'combineParams', you must supply a 'valueSeparator'. Check your analysisModule config.");
      }
      mapActions.updateAnalysisParams({
        id,
        paramName: startParam,
        paramValue: `${startDate}${valueSeparator}${endDate}`,
      });
      return;
    }

    if (multi === true || multi === 'true') {
      mapActions.updateAnalysisParams({
        id,
        paramName: endParam,
        paramValue: endDate,
      });
    }

    mapActions.updateAnalysisParams({
      id,
      paramName: startParam,
      paramValue: startDate,
    });
  }

  renderResults = (type, results, language, config) => {

    console.log('type', type);
    console.log('results', results);
    console.log('config', config);

    const { chartType, label, colors } = config;
    const { analysisSliderIndices } = this.props;
    let chartComponent = null;

    console.log('chartType', chartType);
    switch (chartType) {
      case 'bar': {
        const { chartBounds, analysisId, valueAttribute } = config;
        const labels = [...Array(chartBounds[1] + 1 - chartBounds[0])] // create a new arr out of the bounds difference
        .map((i, idx) => idx + chartBounds[0]); // fill in the values based on the bounds

        let startIndex = 0;
        let endIndex = labels.length - 1;

        if (analysisSliderIndices[analysisId]) {
          startIndex = analysisSliderIndices[analysisId][0];
          endIndex = analysisSliderIndices[analysisId][1];
        }

        let counts = [];

        switch (analysisId) {
          case 'TC_LOSS': {
            let lossObj = null;
            if (!results.hasOwnProperty('error')) {
              lossObj = results.data.attributes.loss;
              counts = Object.values(lossObj);
            }
            break;
          }
          case 'IFL': {
            if (!results.hasOwnProperty('error')) {

              results.data.attributes.histogram[0].result.forEach(histo => {
                counts.push(Math.round(histo.result * 100) / 100);
              });
            }
            break;
          }
          default: {
            counts = results;
            if (valueAttribute) {
              counts = valueAttribute.split('.').reduce((prevVal, currentVal) => {
                if (!prevVal.hasOwnProperty(currentVal)) {
                  throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
                }
                return prevVal[currentVal];
              }, results);
            }
          }
        }

        chartComponent = <BarChart
          name={label[language]}
          counts={counts}
          colors={colors ? colors : ['#cf5188']}
          labels={labels.slice(startIndex, endIndex + 1)}
          results={results}
          encoder={null}
        />;
        break;
      }
      case 'timeSeries': {
        const { analysisId, valueAttribute } = config;

        let data = [];

        switch (analysisId) {
          case 'GLAD_ALERTS': {
            if (!results.hasOwnProperty('error')) {
              data = formatters.alerts(results.data.attributes.value);
            }
            break;
          }
          case 'FORMA_ALERTS': {
            if (!results.hasOwnProperty('error')) {
              data = formatters.alerts(results.data.attributes.alertCounts);
            }
            break;
          }
          case 'TERRAI_ALERTS': {
            if (!results.hasOwnProperty('error')) {
              data = formatters.alerts(results.data.attributes.value);
            }
            break;
          }
          default: {
            data = results;

            if (valueAttribute) {
              data = valueAttribute.split('.').reduce((prevVal, currentVal) => {
                if (!prevVal.hasOwnProperty(currentVal)) {
                  throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
                }
                return prevVal[currentVal];
              }, results);
            }
          }
        }
        chartComponent = <TimeSeriesChart data={data} name={label[language] ? label[language] : ''} />;
        break;
      }
      case 'badge': {
        const {
          activeAnalysisType,
          lossFromSelectIndex,
          lossToSelectIndex,
          viirsEndDate,
          viirsStartDate,
        } = this.props;

        const { valueAttribute, color, badgeLabel } = config;

        switch (activeAnalysisType) {
          case 'TC_LOSS_GAIN':
            chartComponent = <LossGainBadge
              results={results}
              lossFromSelectIndex={lossFromSelectIndex}
              lossToSelectIndex={lossToSelectIndex}
              totalLossLabel={text[language].ANALYSIS_TOTAL_LOSS_LABEL}
              totalGainLabel={text[language].ANALYSIS_TOTAL_GAIN_LABEL}
              totalGainRange={text[language].ANALYSIS_TOTAL_GAIN_RANGE}
            />;
            break;
          case 'VIIRS_FIRES':
            chartComponent = <FiresBadge
              results={results}
              from={viirsStartDate}
              to={viirsEndDate}
              preLabel={text[language].ANALYSIS_FIRES_PRE}
              firesLabel={text[language].ANALYSIS_FIRES_ACTIVE}
              timelineStartLabel={text[language].TIMELINE_START}
              timelineEndLabel={text[language].TIMELINE_END}
            />;
            break;
          case 'FRAGMENTATION':
            console.log('results', results);
            console.log('config', config);
            // results.startYearValue = startCount;
            // results.totalRangeValue = totalCount;
            const diff = results.totalRangeValue - results.startYearValue;
            // debugger

            const style = {
              borderColor: 'purple',
              color: 'purple'
            };
            chartComponent = <div className='results__badge' style={style}>
              <div className='results__badge-label'>Frag Loss {config.startYear}-{config.endYear}</div>
              <div className='results__badge-value'>{diff.toFixed(3)}</div>
            </div>;

            break;
          default:
            chartComponent = <Badge results={results} valueAttribute={valueAttribute} color={color} label={badgeLabel[language]} />;

        }
        break;
      }
      case 'biomassLoss': {
        chartComponent = <BiomassChart
          payload={results}
          colors={analysisConfig.BIO_LOSS.colors}
          lossName={text[language].ANALYSIS_CARBON_LOSS}
          carbonName={text[language].ANALYSIS_CARBON_EMISSION}
          />;
        break;
      }
      case 'lccPie': {
        const data = {
          counts: []
        };
        if (!results.hasOwnProperty('error')) {
          results.data.attributes.histogram.forEach(histo => {
            if (!data[histo.className]) {
              data[histo.className] = 0;
            }
            histo.result.forEach(year => {
              data[histo.className] += year.result;
            });
            data.counts.push(Math.round(data[histo.className] * 100) / 100);
          });
        }

        chartComponent = <CompositionPieChart
          results={results}
          name={label[language]}
          counts={data.counts}
          colors={config.colors}
          labels={config.classes[language]}
        />;
        break;
      }
      case 'gfwWidget':
        chartComponent = <VegaChart results={results} selectedFeature={this.props.selectedFeature} setLoading={() => this.setState({isLoading: false})}/>;
        break;
      case 'vega':
        chartComponent = <VegaChart results={results} selectedFeature={this.props.selectedFeature} setLoading={() => this.setState({isLoading: false})}/>;
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
    const { analysisParams, activeAnalysisType, selectedFeature, selectedFeats, canopyDensity } = this.props;
    const { settings: { analysisModules }, language } = this.context;
    this.setState({
      isLoading: true,
      results: null,
    });
    Object.keys(analysisParams).forEach(analysisId => {
      if (analysisId === activeAnalysisType) {
        const analysisSettings = analysisModules.filter(cam => cam.analysisId === analysisId)[0];
        if (!selectedFeature.attributes.geostoreId && selectedFeats && selectedFeats.length > 1) {
          selectedFeature.attributes.geostoreId = selectedFeats[1].attributes.geostoreId;
        }
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

          console.log('analysisParams', analysisParams);

          console.log('analysisSettings', analysisSettings);
          console.log('uiParamsToAppend', uiParamsToAppend);
          console.log('');
          analysisUtils.getCustomAnalysis(analysisSettings, uiParamsToAppend).then(results => {
            console.log('results', results);
            this.renderResults(analysisId, results, language, analysisSettings);
          });
          return;
        }

        if (analysisSettings.analysisId === 'FRAGMENTATION') {

          if (selectedFeature.geometry.spatialReference.isWebMercator()) {
            selectedFeature.geometry = webmercatorUtils.webMercatorToGeographic(selectedFeature.geometry);
          }

          const geojson = geojsonUtil.arcgisToGeoJSON(selectedFeature.geometry);

          const content = {
            polygon: geojson.coordinates
          };

          fetch(
            analysisSettings.analysisUrl,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(content)
            }
          ).then(results => {
            console.log('results', results);

            if (results.json) {
              results.json().then(newRes => {
                console.log('newResss', newRes);
                console.log('uiParamsToAppend.period', uiParamsToAppend.period);
                const dates = uiParamsToAppend.period.split(',');

                const startYear = dates[0].split('-')[0];
                const endYear = dates[1].split('-')[0];
                analysisSettings.startYear = parseInt(startYear);
                analysisSettings.endYear = parseInt(endYear);
                let startCount;
                let totalCount = 0;
                console.log('analysisSettings.startYear', analysisSettings.startYear);
                console.log('analysisSettings.endYear', analysisSettings.endYear);
                Object.keys(newRes).forEach(year => {
                  console.log(year, typeof year);
                  if (parseInt(year) === analysisSettings.startYear) {
                    startCount = newRes[year];
                  } else if (parseInt(year) > analysisSettings.startYear && parseInt(year) <= analysisSettings.endYear) {
                    totalCount += newRes[year];
                  }
                });
                newRes.startYearValue = startCount;
                newRes.totalRangeValue = totalCount;
                this.setState({ isLoading: false });
                this.renderResults(analysisId, newRes, language, analysisSettings);
              });
            }

          }, (error) => {
            this.setState({
              isLoading: false,
              results: {
                error: error,
                message: 'An error occured performing selected analysis. Please select another analysis or try again later.'
              },
            }, () => {
              this.renderResults(analysisId, this.state.results, language, analysisSettings);
            });
          });
        } else {
          esriRequest({
            url: analysisSettings.analysisUrl,
            callbackParamName: 'callback',
            content: uiParamsToAppend,
            handleAs: 'json',
            timeout: 30000
          }, { usePost: true }).then(results => {
            this.setState({ isLoading: false });
            this.renderResults(analysisId, results, language, analysisSettings);
          }, (error) => {
            this.setState({
              isLoading: false,
              results: {
                error: error,
                message: 'An error occured performing selected analysis. Please select another analysis or try again later.'
              },
            }, () => {
              this.renderResults(analysisId, this.state.results, language, analysisSettings);
            });
          });
        }
      }
    });
  }

  render () {
    const {selectedFeature, activeAnalysisType, activeSlopeClass, editingEnabled} = this.props;
    const { isLoading, chartComponent} = this.state;
    const {language, settings} = this.context;
    const showFooter = activeAnalysisType !== 'default' && !chartComponent;
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

    let activeAnalysisItem;
    let activeItemTitle = null,
        activeItemDescription = null;

    if (activeAnalysisType !== 'default') {
      activeAnalysisItem = settings.analysisModules.filter(i => i.analysisId === activeAnalysisType)[0];
      if (activeAnalysisItem.title) { activeItemTitle = activeAnalysisItem.title[language]; }
      if (activeAnalysisItem.description) { activeItemDescription = activeAnalysisItem.description[language]; }
    }

    return (
      <div className='analysis-results'>
        <Loader active={isLoading} />
        <div className={`analysis-results__content custom-scroll ${showFooter ? 'footer' : ''}`}>
          <div className='title-select-container'>
            <div className='analysis-title'>{title}</div>
            <div className='analysis-results__select-label'>
              {text[language].ANALYSIS_SELECT_TYPE_LABEL}
            </div>
            <AnalysisTypeSelect {...this.props} analysisItems={settings.analysisModules} />
          </div>
          {activeAnalysisType !== 'default' && !chartComponent &&
            <div className='analysis-results__select-form custom-scroll'>
              <div className='item-title'>{activeItemTitle}</div><div className='item-description'>{activeItemDescription}</div>
              {this.getFormComponents(activeAnalysisType, settings.analysisModules)}
            </div>
          }
          {chartComponent &&
            <div className='analysis-results__chart-component-container'>
              {slopeSelect}
              {chartComponent}
            </div>
          }
        </div>
        {showFooter &&
          <div className='analysis-results__footer'>
            <div className='run-analysis-button-container'>
              <button className='run-analysis-button pointer' onClick={this.runAnalysis}>
                {text[language].RUN_ANALYSIS_BUTTON_TEXT}
              </button>
            </div>
            <ReportSubscribeButtons setLoader={this.setLoader} />
          </div>
        }
      </div>
    );
  }

}

Analysis.propTypes = {
  selectedFeature: PropTypes.object.isRequired
};
