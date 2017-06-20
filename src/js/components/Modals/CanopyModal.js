import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import {modalText, assetUrls} from 'js/config';
import {loadJS, loadCSS} from 'utils/loaders';
import mapActions from 'actions/MapActions';
import mapStore from 'stores/MapStore';
import utils from 'utils/AppUtils';
import text from 'js/languages';
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
    const base = window._app.base ? window._app.base + '/' : '';
    this.loadedSlider = false;
    // loadJS(base + assetUrls.jQuery);
    loadJS(base + assetUrls.rangeSlider).then(() => {
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
          from: 5,
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
        $('#tree-cover-slider').ionRangeSlider({
          type: 'double',
          values: modalText.canopy.slider,
          hide_min_max: true,
          grid_snap: true,
          to_fixed: true,
          from_min: 1,
          from_max: 7,
          grid: true,
          from: 5,
          onFinish: this.sliderChanged,
          prettify: value => (value + '%')
        });
        this.loadedSlider = true;
      }
    }
    //- Set the default canopy density when the map loads
    const {map} = this.context;
    if (!prevContext.map.loaded && map.loaded) {
      const {canopyDensity} = mapStore.getState();
      //- Wait for layers to load
      const signal = map.on('update-end', () => {
        signal.remove(); //- Remove the event so it does not continue ot fire
        this.updateTreeCoverDefinitions(canopyDensity);
        this.updateAGBiomassLayer(canopyDensity);
      });
    }
  }

  updateTreeCoverDefinitions = (density) => {
    const {map, settings} = this.context;
    if (map.loaded) {
      //- Get the layer config, I am hardcoding en becuase I do not need anything language specific, just its config
      const lcGroupLayers = settings.layerPanel.GROUP_LC ? settings.layerPanel.GROUP_LC.layers : [];
      const layerConfig = utils.getObject(lcGroupLayers, 'id', layerKeys.TREE_COVER);
      const layer = map.getLayer(layerKeys.TREE_COVER);

      if (layer && layerConfig) {
        const renderingRule = rasterFuncs.getColormapRemap(layerConfig.colormap, [density, layerConfig.inputRange[1]], layerConfig.outputRange);
        layer.setRenderingRule(renderingRule);
      }
    }
  };

  updateAGBiomassLayer = (density) => {
    const {map} = this.context;
    if (map.loaded) {
      const layer = map.getLayer(layerKeys.AG_BIOMASS);
      const mosaicRule = rasterFuncs.getBiomassMosaicRule(density);

      if (layer) {
        layer.setMosaicRule(mosaicRule);
      }
    }
  };

  sliderChanged = (data) => {
    this.updateTreeCoverDefinitions(data.from_value);
    this.updateAGBiomassLayer(data.from_value);
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
