import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import layersHelper from 'helpers/LayersHelper';
import React, {
  Component,
  PropTypes
} from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
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
      sliderValue: 5,
      sliderMarks: {
        1: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '10%'
        },
        2: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '15%'
        },
        3: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '20%'
        },
        4: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '25%'
        },
        5: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '30%'
        },
        6: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '50%'
        },
        7: {
          style: {
            color: '#555',
            marginTop: '10px'
          },
          label: '75%'
        }
      }
    };
  }

  componentDidMount() {
    const { canopyDensity } = this.props;
    const { map, settings } = this.context;

    layersHelper.updateTreeCoverDefinitions(canopyDensity, map, settings.layerPanel);
    layersHelper.updateAGBiomassLayer(canopyDensity, map);

  }

  handleSliderChange = sliderValue => {
    const { sliderMarks } = this.state;
    const {map, settings} = this.context;

    const densityValue = Number(sliderMarks[sliderValue].label.substr(0, 2));

    layersHelper.updateTreeCoverDefinitions(densityValue, map, settings.layerPanel);
    layersHelper.updateAGBiomassLayer(densityValue, map);
    mapActions.updateCanopyDensity(densityValue);
    this.setState({ sliderValue });
  }

  close = () => {
    mapActions.toggleCanopyModal({ visible: false });
  };

  render() {
    const { sliderMarks, sliderValue } = this.state;
    const {language} = this.context;

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
          railStyle={{backgroundColor: '#F0AB00', height: 10}}
          trackStyle={{backgroundColor: '#e9e9e9', height: 10}}
          dotStyle={{border: '2px solid #F0AB00', height: 10, width: 10, bottom: -6, marginLeft: -7}}
          activeDotStyle={{border: '2px solid #e9e9e9'}}
          handleStyle={[{border: '2px solid #F0AB00', height: 20, width: 20, marginLeft: -13}]}
        />
        </div>
      </ControlledModalWrapper>
    );
  }

}
