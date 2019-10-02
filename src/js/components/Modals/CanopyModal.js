import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import layersHelper from 'helpers/LayersHelper';
import React, {
  Component,
  PropTypes
} from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import resources from '../../../resources';
import {defaultColorTheme} from '../../config';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default class CanopyModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      sliderMarks: {
        1: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '10%',
          density: 10
        },
        2: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '15%',
          density: 15
        },
        3: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '20%',
          density: 20
        },
        4: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '25%',
          density: 25
        },
        5: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '30%',
          density: 30
        },
        6: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '50%',
          density: 50
        },
        7: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '75%',
          density: 75
        }
      }
    };
  }

  discernDensityValue = density => {
    const sliderValue = Object.keys(this.state.sliderMarks).filter((mark) => {
      return this.state.sliderMarks[mark].density === density;
    });

    return parseInt(sliderValue[0]);
  }

  handleSliderChange = sliderValue => {
    const { sliderMarks } = this.state;
    let settings;
    let map;
    if (this.context.settings){
      settings = this.context.settings;
    } else {
      settings = this.props.settings;
    }
    if (this.context.map){
      map = this.context.map;
    } else {
      map = this.props.map;
    }
    const densityValue = sliderMarks[sliderValue].density;

    layersHelper.updateTreeCoverDefinitions(densityValue, map, settings.layerPanel);
    layersHelper.updateAGBiomassLayer(densityValue, map);
    mapActions.updateCanopyDensity(densityValue);
  }

  close = () => {
    mapActions.toggleCanopyModal({ visible: false });
  };

  render() {
    const { sliderMarks } = this.state;
    const { canopyDensity } = this.props;
    let customColorTheme;
    if (this.context.settings) {
      customColorTheme = this.context.settings.customColorTheme;
    } else {
      customColorTheme = resources.customColorTheme;
    }
    let language;
    if (this.context.language) {
      language = this.context.language;
    } else {
      language = this.props.language;
    }

    const sliderValue = this.discernDensityValue(canopyDensity);
    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='canopy-modal-title'>{text[language].CANOPY_MODAL_TEXT}</div>
        <div className='trees'>
          <div className='tree-icon' />
          <div className='forest-icon' />
        </div>
        <div className='slider-container'>
        <SliderWithTooltip
          min={0}
          max={8}
          value={sliderValue}
          marks={sliderMarks}
          step={null}
          onChange={this.handleSliderChange}
          tipFormatter={value => sliderMarks[value].label}
          railStyle={{backgroundColor: customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme, height: 10}}
          trackStyle={{backgroundColor: '#e9e9e9', height: 10}}
          dotStyle={{border: `2px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, height: 10, width: 10, bottom: -6, marginLeft: -7}}
          activeDotStyle={{border: '2px solid #e9e9e9'}}
          handleStyle={[{border: `2px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, height: 20, width: 20, marginLeft: -13}]}
        />
        </div>
      </ControlledModalWrapper>
    );
  }

}
