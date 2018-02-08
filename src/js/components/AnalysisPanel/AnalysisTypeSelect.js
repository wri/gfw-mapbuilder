import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import AnalysisRangeSlider from './AnalysisFormElements/AnalysisRangeSlider';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import text from 'js/languages';
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
    // Get options for the select
    // this.options = this.prepareOptions(context.language);
    this.state = {};

    // mapActions.setAnalysisType.defer('default');
  }

  // componentWillReceiveProps (nextProps, nextContext) {
    // const {language} = this.context;
    // if (language !== nextContext.language) {
    //   this.setState({ options: this.prepareOptions(nextContext.language) });
    // }
  // }

  // prepareOptions = (language) => {
  //   const {settings} = this.context;
    //- Get references to all the layers
    // const lcdGroupLayers = settings.layerPanel.GROUP_LCD ? settings.layerPanel.GROUP_LCD.layers : [];
    // let options = text[language].ANALYSIS_SELECT_TYPE_OPTIONS;
    //- Remove options not included based on settings
    //- Also, remove Tree Cover Options if those layers are not in the settings.layerPanel.GROUP_LCD config
    // options = options.filter((option) => {
    //   switch (option.value) {
    //     case analysisKeys.SLOPE:
    //       return settings.restorationModule && settings.restorationSlope;
    //     case analysisKeys.INTACT_LOSS:
    //       return settings.intactForests;
    //     case analysisKeys.BIO_LOSS:
    //       return settings.aboveGroundBiomass;
    //     case analysisKeys.LC_LOSS:
    //       return settings.landCover;
    //     case analysisKeys.LCC:
    //       return settings.landCover;
    //     case analysisKeys.VIIRS_FIRES:
    //       return settings.viirsFires;
    //     case analysisKeys.MODIS_FIRES:
    //       return settings.modisFires;
    //     case analysisKeys.MANGROVE_LOSS:
    //       return settings.mangroves;
    //     case analysisKeys.SAD_ALERTS:
    //       return settings.sadAlerts;
    //     case analysisKeys.GLAD_ALERTS:
    //       return settings.gladAlerts;
    //     case analysisKeys.TERRA_I_ALERTS:
    //       return settings.terraIAlerts;
    //     case analysisKeys.TC_LOSS:
    //       return appUtils.containsObject(lcdGroupLayers, 'id', layerKeys.TREE_COVER_LOSS);
    //     case analysisKeys.TC_LOSS_GAIN:
    //       return appUtils.containsObject(lcdGroupLayers, 'id', layerKeys.TREE_COVER_GAIN);
    //     default:
    //       return true;
    //   }
    // });
    // //- Merge in the restoration options if the module is enabled and at least one options is enabled
    // if (settings.restorationModule &&
    //   (settings.restorationSlopePotential || settings.restorationLandCover ||
    //   settings.restorationPopulation || settings.restorationTreeCover ||
    //   settings.restorationRainfall)
    // ) {
    //   const {restorationOptions} = settings.labels[language];
    //   restorationOptions.forEach((restorationOption) => {
    //     options.push({
    //       value: restorationOption.id,
    //       label: restorationOption.label,
    //       group: analysisKeys.ANALYSIS_GROUP_RESTORATION
    //     });
    //   });
    // }

    // options = options.concat(settings.customAnalysisModules);
    // console.log(settings.customAnalysisModules);

    // return options;
  // }

  // renderOption = (group) => {
  //   return (option, index) => {
  //     // If this option is not a member of the correct group, dont render it
  //     if (option.group !== group) { return null; }
  //     if (option.value === 'default') {
  //       return <option key={index} disabled={this.props.activeAnalysisType !== 'default'} value={option.value}>{option.label}</option>;
  //     }
  //     return <option key={index} value={option.value}>{option.label}</option>;
  //   };
  // };

  // renderGroup = (groupKey) => {
  //   const {language} = this.context;
  //   const {options} = this.state;
  //   return (
  //     <optgroup key={groupKey} label={text[language][groupKey]}>
  //       {options.map(this.renderOption(groupKey))}
  //     </optgroup>
  //   );
  // };

  createOptions = (analysisObj) => {
    return (
      <option
        key={analysisObj.analysisId}
        value={analysisObj.analysisId}
      >
        {analysisObj.label}
      </option>
    );
  }

  getFormComponents = (activeAnalysisType, analysisItems) => {
    const { language } = this.context;
    const analysisConfig = analysisItems.filter(ai => ai.analysisId === activeAnalysisType)[0];
    const { params } = analysisConfig;
    const formComponents = [];
    if (params === 'none') {
      return <div
        className='analysis-results__select-form-item-container'
      >
        Click the &lsquo;Run Analysis&rsquo; button see analysis
      </div>;
    }

    if (!params || params.length === 0) {
      throw new Error("you either didn't supply an 'analysisUIElements' property on your module or it contained 0 items. Please check your analysis module config");
    }

    analysisConfig.analysisUIElements.forEach((uiElement, idx) => {
      switch (uiElement.type) {
        case 'rangeSlider': {
          const { bounds, step, label } = uiElement;
          if (!bounds || bounds.length !== 2 || (bounds[1] - bounds[0] < 1)) {
            throw new Error(`analysis id: '${analysisConfig.analysisId}', UI Element type: 'rangeSlider' -> 'bounds' is incorrectly configured. Please check your analysis module config`);
          }
          formComponents.push(
            <AnalysisRangeSlider
              key={analysisConfig.analysisId + uiElement.type + idx}
              analysisId={analysisConfig.analysisId}
              bounds={bounds}
              step={step || 1}
              label={label[language] ? label[language] : ''}
              handleRangeSliderChange={this.handleRangeSliderChange}
            />
          );
          break;
        }
        case 'tcd': {
          const { canopyDensity } = this.props;
          const { label } = uiElement;
          formComponents.push(
            <div
              key={analysisConfig.analysisId + uiElement.type + idx}
              className='analysis-results__select-form-item-container'
            >
              <DensityDisplay
                label={label[language] ? label[language] : ''}
                canopyDensity={canopyDensity}
              />
            </div>
          );
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

  handleRangeSliderChange = (rangeSliderValue, id) => {
    this.setState((prevState) => {
      return {
        [id]: {
          ...(prevState[id] ? prevState[id] : {}),
          rangeSliderValue,
        },
      };
    });
  }

  render () {
    const {activeAnalysisType, analysisItems} = this.props;
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
          {activeAnalysisType !== 'default' && this.getFormComponents(activeAnalysisType, analysisItems)}
        </div>
      </div>
    );
  }
}
