import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import AnalysisRangeSlider from './AnalysisFormElements/AnalysisRangeSlider';
import AnalysisDatePicker from './AnalysisFormElements/AnalysisDatePicker';
import AnalysisMultiDatePicker from './AnalysisFormElements/AnalysisMultiDatePicker';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import text from 'js/languages';
import moment from 'moment';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisTypeSelect extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.state = {};
  }

  createOptions = (analysisObj) => {
    const { language } = this.context;
    const { analysisId, label } = analysisObj;

    return (
      <option
        key={analysisId}
        value={analysisId}
      >
        {label[language] ? label[language] : ''}
      </option>
    );
  }

  getFormComponents = (activeAnalysisType, analysisItems) => {
    const { language } = this.context;
    const analysisConfig = analysisItems.filter(ai => ai.analysisId === activeAnalysisType)[0];
    const { uiParams } = analysisConfig;
    const formComponents = [];
    if (uiParams === 'none') {
      return <div
        className='analysis-results__select-form-item-container'
      >
        Click the &lsquo;Run Analysis&rsquo; button see analysis
      </div>;
    }

    if (!uiParams || uiParams.length === 0) {
      throw new Error("you either didn't supply an 'uiParams' property on your module or it contained 0 items. Please check your analysis module config. If you don't need UI elements, add `uiParams: 'none'`");
    }

    analysisConfig.uiParams.forEach((param, idx) => {
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
            throw new Error(`analysis id: '${analysisConfig.analysisId}', UI Element type: 'rangeSlider' -> 'bounds' is incorrectly configured. Please check your analysis module config`);
          }

          if (analysisConfig.analysisId === 'TC_LOSS') {
            const { lossToSelectIndex, lossFromSelectIndex, lossOptions } = this.props;
            initialStartValue = Number(lossOptions[lossFromSelectIndex].label);
            initialEndValue = Number(lossOptions[lossToSelectIndex].label);
          }
          formComponents.push(
            <AnalysisRangeSlider
              key={analysisConfig.analysisId + inputType + idx}
              analysisId={analysisConfig.analysisId}
              bounds={bounds}
              valueType={valueType || null}
              startParamName={startParamName}
              endParamName={combineParams ? null : endParamName}
              valueSeparator={combineParams ? valueSeparator : null}
              step={step || 1}
              label={label[language]}
              combineParams={combineParams}
              initialStartValue={initialStartValue}
              initialEndValue={initialEndValue}
              rangeSliderCallback={this.rangeSliderCallback}
            />
          );
          break;
        }
        case 'tcd': {
          const { canopyDensity } = this.props;
          const { label } = param;
          formComponents.push(
            <div
              key={analysisConfig.analysisId + param.inputType + idx}
              className='analysis-results__select-form-item-container'
            >
              <DensityDisplay
                label={label[language] ? label[language] : ''}
                canopyDensity={canopyDensity}
              />
            </div>
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

          if (analysisConfig.analysisId === 'GLAD_ALERTS') {
            const { gladStartDate, gladEndDate } = this.props;
            initialStartDate = moment(gladStartDate);
            initialEndDate = moment(gladEndDate);
          }

          if (analysisConfig.analysisId === 'TERRAI_ALERTS') {
            const { terraIStartDate, terraIEndDate } = this.props;
            initialStartDate = moment(terraIStartDate);
            initialEndDate = moment(terraIEndDate);
          }

          if (analysisConfig.analysisId === 'VIIRS_FIRES') {
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
              <AnalysisMultiDatePicker
                key={analysisConfig.analysisId + param.inputType + idx}
                analysisId={analysisConfig.analysisId}
                startParamName={startParamName}
                endParamName={endParamName}
                label={label[language]}
                combineParams={combineParams || null}
                valueSeparator={combineParams ? valueSeparator : null}
                multi={true}
                defaultStartDate={defaultStartDate || new Date()}
                defaultEndDate={defaultEndDate || new Date()}
                minDate={minDate || null}
                maxDate={maxDate || new Date()}
                calendarCallback={this.calendarCallback}
              />
            );
            break;
          }

          formComponents.push(
            <AnalysisDatePicker
              key={analysisConfig.analysisId + param.inputType + idx}
              analysisId={analysisConfig.analysisId}
              startParamName={startParamName}
              label={label[language]}
              combineParams={combineParams || null}
              valueSeparator={combineParams ? valueSeparator : null}
              multi={false}
              defaultStartDate={defaultStartDate || null}
              minDate={minDate}
              maxDate={maxDate}
              calendarCallback={this.calendarCallback}
            />
          );

          break;
        }
        default:
          return null;
      }
    });
    return formComponents;
  }

  handleChange = e => {
    mapActions.setAnalysisType(e.target.value);
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
    if (combineParams) {
      if (!valueSeparator) {
        throw new Error("no 'valueSeparator' property configured. If using 'combineParams', you must supply a 'valueSeparator'. Check your analysisModule config.");
      }
      console.log(id);
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

  render () {
    const { activeAnalysisType, analysisItems, chartVisible } = this.props;
    const { language } = this.context;

    return (
      <div className='relative analysis-results__select-container'>
        <select
          value={activeAnalysisType || 'default'}
          className='analysis-results__select pointer'
          onChange={this.handleChange}
        >
          <option
            value='default'
            disabled={activeAnalysisType !== 'default'}
          >
            {text[language].DEFAULT_ANALYSIS_LABEL}
          </option>
          {analysisItems.map(this.createOptions)}
        </select>
        <div className='analysis-results__select-arrow' />
        <div className='analysis-results__select-form'>
          {activeAnalysisType !== 'default' && !chartVisible && this.getFormComponents(activeAnalysisType, analysisItems)}
        </div>
      </div>
    );
  }
}
