import React, {Component} from 'react';
import MapStore from 'stores/MapStore';
import moment from 'moment';
import AnalysisRangeSlider from '../components/AnalysisPanel/AnalysisFormElements/AnalysisRangeSlider';
import AnalysisDatePicker from '../components/AnalysisPanel/AnalysisFormElements/AnalysisDatePicker';
import AnalysisMultiDatePicker from '../components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';
import DensityDisplay from '../components/LayerPanel/DensityDisplay';
import text from 'js/languages';


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
     ...MapStore.getState()
    };
  }

  rangeSliderCallback = () => {
    console.log('range slider');
  };
  
  calendarCallback = () => {
    console.log('calendar');
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
  
            let initialStartValue = null;
            let initialEndValue = null;
  
            if (!bounds || bounds.length !== 2 || (bounds[1] - bounds[0] < 1)) {
              throw new Error(`analysis id: '${analysisItemConfig.analysisId}', UI Element type: 'rangeSlider' -> 'bounds' is incorrectly configured. Please check your analysis module config`);
            }
  
            if (analysisItemConfig.analysisId === 'TC_LOSS') {
              const { lossToSelectIndex, lossFromSelectIndex, lossOptions } = this.props;
              //initialStartValue = Number(lossOptions[lossFromSelectIndex].label);
              //initialEndValue = Number(lossOptions[lossToSelectIndex].label);
              initialStartValue = 2;
              initialEndValue = 3;
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
            console.log('canopyDensity', canopyDensity);
            console.log('label', label);
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
              message: 'An error occurred performing selected analysis. Please select another analysis or try again later.'
            },
          }, () => {
            this.renderResults(analysisId, this.state.results, language, analysisSettings);
          });
        });
      }
    });
  };
    
    render() {
      console.log('state', this.state);
      const {language} = this.props;
        return (
            <div className="analysis-results__select-form-container">
              <div className='analysis-results__select-form custom-scroll'>
                {this.getFormComponents()}
              </div>
              <div className='run-report-analysis-button-container'>
                <button className='run-report-analysis-button pointer' onClick={this.runAnalysis}>
                  {text[language].RUN_ANALYSIS_BUTTON_TEXT}
                </button>
            </div>
            </div>
        );
    }
}
