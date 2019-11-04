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
import analysisKeys from 'constants/AnalysisConstants';
import {attributes} from 'constants/AppConstants';
import {defaultColorTheme} from 'js/config';
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
    buttonHover: false
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
          {text[language].RUN_ANALYSIS_INSTRUCTIONS}
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
    const chartComponent = <VegaChart component='Analysis' language={language} results={results} setLoading={() => this.setState({isLoading: false})}/>;
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
    
    console.log('selected feature', selectedFeature);
    console.log('selected feats', selectedFeats);
    Object.keys(analysisParams).forEach(analysisId => {
      if (analysisId === activeAnalysisType) {
        const analysisSettings = analysisModules.filter(cam => cam.analysisId === analysisId)[0];
        if (!selectedFeature.attributes.geostoreId && selectedFeats && selectedFeats.length > 0) {
          selectedFeature.attributes.geostoreId = selectedFeats[0].attributes.geostoreId;
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
          //analysisSettings.chartType = 'vega';

          analysisUtils.getCustomAnalysis(analysisSettings, uiParamsToAppend).then(results => {
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
              message: text[language].ANALYSIS_ERROR
            },
          }, () => {
            this.renderResults(analysisId, this.state.results, language, analysisSettings);
          });
        });
      }
    });
  }
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render () {
    const {selectedFeature, activeAnalysisType, activeSlopeClass, editingEnabled} = this.props;
    const { isLoading, chartComponent, showDownloadOptions, buttonHover} = this.state;
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
    const { customColorTheme } = this.context.settings;
    
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
          {chartComponent && !showDownloadOptions &&
            <div className='analysis-results__chart-component-container'>
              {slopeSelect}
              {chartComponent}
            </div>
          }
        </div>
        {showFooter &&
          <div className='analysis-results__footer'>
            <div className='run-analysis-button-container'>
              <button
                style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
                {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
                className='run-analysis-button fa-button color pointer'
                onClick={this.runAnalysis}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
              >
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
