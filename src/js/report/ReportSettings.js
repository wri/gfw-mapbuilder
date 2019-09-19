import React, {Component, PropTypes} from 'react';
import MapStore from 'stores/MapStore';
import moment from 'moment';
import AnalysisRangeSlider from '../components/AnalysisPanel/AnalysisFormElements/AnalysisRangeSlider';
import AnalysisDatePicker from '../components/AnalysisPanel/AnalysisFormElements/AnalysisDatePicker';
import AnalysisMultiDatePicker from '../components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';
import DensityDisplay from '../components/LayerPanel/DensityDisplay';
import text from 'js/languages';
import mapActions from '../actions/MapActions';
import layerActions from '../actions/LayerActions';
import analysisUtils from './../utils/analysisUtils';
import resources from '../../resources';
import {defaultColorTheme} from '../config';


const AnalysisItemWrapper = ({ title, itemNumber, children }) => (
    <div className='analysis-item-wrapper'>
      <div className='analysis-item-label'>
        <span><strong>{itemNumber}</strong></span>
        {title}
      </div>
      {children}
    </div>
  );

export default class ReportSettings extends Component {

  constructor(props){
    super(props);
    this.state = {
      buttonHover: false,
      ...MapStore.getState()
    };
  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  storeDidUpdate = () => {
    if (this && this.setState) {
      this.setState(MapStore.getState());
    }
  };

  componentWillUnmount () {
    MapStore.unlisten();
  }

  rangeSliderCallback = (rangeSliderValue, id, combineParams, startParam, endParam, valueSeparator, valueType) => {
    let startValue = rangeSliderValue[0];
    let endValue = rangeSliderValue[1];

    if (valueType === 'date') {
      startValue = `${startValue}-01-01`;
      endValue = `${endValue}-12-31`;
    }

    layerActions.setLossOptions([startValue, endValue]);

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
  };

  calendarCallback = (startDate, endDate, id, combineParams, multi, startParam, endParam, valueSeparator) => {
    const gladStartDate = moment(startDate);
    const gladEndDate = moment(endDate);

    layerActions.updateGladStartDate(gladStartDate);
    layerActions.updateGladEndDate(gladEndDate);

    const gladDates = [gladStartDate._i, gladEndDate._i];

    this.setState({
      gladDates
    });

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
  };

  getFormComponents = () => {
      const { language } = this.props;
      const analysisItemConfig = this.props.module;
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

            const initialStartValue = null;
            const initialEndValue = null;

            if (!bounds || bounds.length !== 2 || (bounds[1] - bounds[0] < 1)) {
              throw new Error(`analysis id: '${analysisItemConfig.analysisId}', UI Element type: 'rangeSlider' -> 'bounds' is incorrectly configured. Please check your analysis module config`);
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
            const { canopyDensity } = this.state;
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
                    language={language}
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
  };

  runAnalysis = () => {
    const { module, reRenderChart } = this.props;
    const reportParams = module.reportParams;
    if (reportParams.thresh){
      reportParams.thresh = this.state.canopyDensity;
    }
    if (module.uiParams && module.uiParams.some(uiParam => uiParam.inputType === "datepicker")) {
      reportParams.period = `${this.state.gladStartDate._i},${this.state.gladEndDate._i}`;
    } else {
      reportParams.period = `${this.state.lossOptions[0]},${this.state.lossOptions[1]}`;
    }
    analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
      reRenderChart(results);
    });
  };
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render() {
    const {language} = this.props;
    const {buttonHover} = this.state;
    let customColorTheme;
    if (this.context.settings) {
      customColorTheme = this.context.settings.customColorTheme;
    } else {
      customColorTheme = resources.customColorTheme;
    }
      return (
          <div className="analysis-results__select-form-container">
            <div className='analysis-results__select-form custom-scroll'>
              {this.getFormComponents()}
            </div>
            <div className='run-report-analysis-button-container print-hide'>
              <button
                style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
                {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
                className='run-report-analysis-button fa-button color pointer'
                onClick={this.runAnalysis}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
              >
                {text[language].RUN_ANALYSIS_BUTTON_TEXT}
              </button>
          </div>
          </div>
      );
  }
}
