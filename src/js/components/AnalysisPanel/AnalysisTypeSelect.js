import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
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
    const options = this.prepareOptions(context.language);
    this.state = { options };
    // Set the default analysis type
    // If we have restoration module, make it the first element in those options
    let index = 0;
    if (context.settings.restorationModule) {
      options.some((item, i) => {
        if (item.group === analysisKeys.ANALYSIS_GROUP_RESTORATION) {
          index = i;
          return true;
        }
      });
    }

    mapActions.setAnalysisType.defer({
      target: { value: options[index].value }
    });
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const {language} = this.context;
    if (language !== nextContext.language) {
      this.setState({ options: this.prepareOptions(nextContext.language) });
    }
  }

  prepareOptions = (language) => {
    const {settings} = this.context;
    //- Get references to all the layers
    const lcdGroupLayers = settings.layerPanel.GROUP_LCD ? settings.layerPanel.GROUP_LCD.layers : [];
    let options = text[language].ANALYSIS_SELECT_TYPE_OPTIONS;
    //- Remove options not included based on settings
    //- Also, remove Tree Cover Options if those layers are not in the settings.layerPanel.GROUP_LCD config
    options = options.filter((option) => {
      switch (option.value) {
        case analysisKeys.SLOPE:
          return settings.restorationModule && settings.restorationSlope;
        case analysisKeys.INTACT_LOSS:
          return settings.intactForests;
        case analysisKeys.BIO_LOSS:
          return settings.aboveGroundBiomass;
        case analysisKeys.LC_LOSS:
          return settings.landCover;
        case analysisKeys.LCC:
          return settings.landCover;
        case analysisKeys.VIIRS_FIRES:
          return settings.viirsFires;
        case analysisKeys.MODIS_FIRES:
          return settings.modisFires;
        case analysisKeys.MANGROVE_LOSS:
          return settings.mangroves;
        case analysisKeys.SAD_ALERTS:
          return settings.sadAlerts;
        case analysisKeys.GLAD_ALERTS:
          return settings.gladAlerts;
        case analysisKeys.TERRA_I_ALERTS:
          return settings.terraIAlerts;
        case analysisKeys.TC_LOSS:
          return appUtils.containsObject(lcdGroupLayers, 'id', layerKeys.TREE_COVER_LOSS);
        case analysisKeys.TC_LOSS_GAIN:
          return appUtils.containsObject(lcdGroupLayers, 'id', layerKeys.TREE_COVER_GAIN);
        default:
          return true;
      }
    });
    //- Merge in the restoration options if the module is enabled and at least one options is enabled
    if (settings.restorationModule &&
      (settings.restorationSlopePotential || settings.restorationLandCover ||
      settings.restorationPopulation || settings.restorationTreeCover ||
      settings.restorationRainfall)
    ) {
      const {restorationOptions} = settings.labels[language];
      restorationOptions.forEach((restorationOption) => {
        options.push({
          value: restorationOption.id,
          label: restorationOption.label,
          group: analysisKeys.ANALYSIS_GROUP_RESTORATION
        });
      });
    }

    return options;
  }

  renderOption = (group) => {
    return (option, index) => {
      // If this option is not a member of the correct group, dont render it
      if (option.group !== group) { return null; }
      return <option key={index} value={option.value}>{option.label}</option>;
    };
  };

  renderGroup = (groupKey) => {
    const {language} = this.context;
    const {options} = this.state;
    return (
      <optgroup key={groupKey} label={text[language][groupKey]}>
        {options.map(this.renderOption(groupKey))}
      </optgroup>
    );
  };

  render () {
    const {activeAnalysisType} = this.props;
    const {options} = this.state;
    let groupKeys = [];
    const groups = {};
    let activeOption;
    let optionElements;
    //- Get a unique list of groups so I can render groups if necessary
    options.forEach((option) => { groups[option.group] = true; });
    // Order should be ANALYSIS_GROUP_SLOPE, ANALYSIS_GROUP_RESTORATION, then ANALYSIS_GROUP_OTHER
    groupKeys = Object.keys(groups).sort().reverse();
    //- Get the selected option
    activeOption = options.filter((option) => option.value === activeAnalysisType)[0];

    if (groupKeys.length === 1) {
      optionElements = options.map(this.renderOption(groupKeys[0]));
    } else {
      optionElements = groupKeys.map(this.renderGroup);
    }

    return (
      <div className='relative'>
        <select
          value={activeAnalysisType}
          className='analysis-results__select pointer'
          onChange={mapActions.setAnalysisType}>
          {optionElements}
        </select>
        <div className='analysis-results__select-style'>
          {activeOption && activeOption.label || ''}
        </div>
      </div>
    );
  }

}
