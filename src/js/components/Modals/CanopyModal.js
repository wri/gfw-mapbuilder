import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import {getUrlParams} from 'utils/params';
import {modalText, assetUrls} from 'js/config';
import {loadJS, loadCSS} from 'utils/loaders';
import mapActions from 'actions/MapActions';
import mapStore from 'stores/MapStore';
import text from 'js/languages';
import layersHelper from 'helpers/LayersHelper';
import React, {
  Component,
  PropTypes
} from 'react';

export default class CanopyModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    let base = window._app.base ? window._app.base + '/' : '';
    if (base && base[base.length - 1] === '/' && base[base.length - 2] === '/') {
      base = base.substring(0, base.length - 1);
    }
    this.loadedSlider = false;
    loadJS(base + assetUrls.rangeSlider).then(() => {
      const fromNode = this.getDensity();

      if ($('#tree-cover-slider').ionRangeSlider) {
        $('#tree-cover-slider').ionRangeSlider({
          type: 'double',
          values: modalText.canopy.slider,
          hide_min_max: true,
          grid_snap: true,
          to_fixed: true,
          from_min: 1,
          from_max: 7,
          grid: true,
          from: fromNode, //5,
          onFinish: this.sliderChanged,
          prettify: value => (value + '%')
        });
        this.loadedSlider = true;
      }

    }, console.error);
    loadCSS(base + assetUrls.ionCSS);
    loadCSS(base + assetUrls.ionSkinCSS);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.loadedSlider === false) {
      if ($('#tree-cover-slider').ionRangeSlider) {
        const fromNode = this.getDensity();
        $('#tree-cover-slider').ionRangeSlider({
          type: 'double',
          values: modalText.canopy.slider,
          hide_min_max: true,
          grid_snap: true,
          to_fixed: true,
          from_min: 1,
          from_max: 7,
          grid: true,
          from: fromNode, //5,
          onFinish: this.sliderChanged,
          prettify: value => (value + '%')
        });
        this.loadedSlider = true;
      }
    }
    //- Set the default canopy density when the map loads
    const {map, settings} = this.context;
    if (!prevContext.map.loaded && map.loaded) {
      const {canopyDensity} = mapStore.getState();
      //- Wait for layers to load
      const signal = map.on('update-end', () => {
        signal.remove(); //- Remove the event so it does not continue ot fire
        layersHelper.updateTreeCoverDefinitions(canopyDensity, map, settings.layerPanel);
        layersHelper.updateAGBiomassLayer(canopyDensity, map);
      });
    }
  }

  getDensity = () => {
    let fromNode = 5;
    const params = getUrlParams(location.search);
    if (params.c) {
      switch (params.c) {
        case '10':
          fromNode = 1;
          break;
        case '15':
          fromNode = 2;
          break;
        case '20':
          fromNode = 3;
          break;
        case '25':
          fromNode = 4;
          break;
        case '30':
          fromNode = 5;
          break;
        case '50':
          fromNode = 6;
          break;
        case '75':
          fromNode = 7;
          break;
        default:
          fromNode = 5;
      }
    }
    return fromNode;
  }

  sliderChanged = (data) => {
    const {map, settings} = this.context;
    layersHelper.updateTreeCoverDefinitions(data.from_value, map, settings.layerPanel);
    layersHelper.updateAGBiomassLayer(data.from_value, map);
    //- Update the store, this will allow any other components interested in this information to react
    mapActions.updateCanopyDensity(data.from_value);
  };

  close = () => {
    mapActions.toggleCanopyModal({ visible: false });
  };

  render() {
    const {language} = this.context;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='canopy-modal-title'>{text[language].CANOPY_MODAL_TEXT}</div>
        <div className='trees'>
          <div className='tree-icon' />
          <div className='forest-icon' />
        </div>
        <div className='slider-container'>
          <div id='tree-cover-slider' />
        </div>
      </ControlledModalWrapper>
    );
  }

}
