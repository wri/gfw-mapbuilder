import LayerDrawingOptions from 'esri/layers/LayerDrawingOptions';
import React, {Component, PropTypes} from 'react';
import layerActions from 'actions/LayerActions';

/**
* Timer to prevent too many requests
* Dynamic Layers dont support setOpacity, you have to setLayerDrawingOptions which is a network request
* set a 200ms timer so that if someone slides the slider up and down it does not fire tons of requests off
*/
const TIMER_DURATION = 200;
let timer;

export default class LayerTransparency extends Component {

  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { opacity: props.layer.opacity || 1 };
  }

  componentDidUpdate (prevProps) {
    if (this.props.initialLayerOpacities.length !== prevProps.initialLayerOpacities.length) {
      this.props.initialLayerOpacities.forEach(opacity => {
        if (opacity.layerId === this.props.layer.id) {
          this.setState({ opacity: opacity.value });
        } else if (opacity.layerId === this.props.layer.subId) {
          this.setState({ opacity: opacity.value });
          this.updateOpacity({
            target: {
              value: opacity.value
            }
          });
        }
        //else if we have a sublayerId on opacity?! then we fire the local updateOpacity????
      });
    }
  }

  updateOpacity = (event) => {
    const {map} = this.context;
    const {layer} = this.props;
    // Convert to number.
    const value = +event.target.value;
    const mapLayer = map.getLayer(layer.id);
    // Bail if this is a dynamic layer or of the layer is not found
    if (mapLayer && layer.subIndex === undefined) {
      mapLayer.setOpacity(value);
      layerActions.changeOpacity({
        layerId: layer.id,
        value
      });
      this.setState({ opacity: value });
    } else if (mapLayer && layer.subIndex !== undefined) {
      const options = mapLayer.layerDrawingOptions || [];
      // Transparency is the reverse of other layers, 0.25 opacity = transparency of value 75
      options[layer.subIndex] = new LayerDrawingOptions({ transparency: 100 - (value * 100) });
      if (timer) { clearTimeout(timer); }
      timer = setTimeout(function () {
        mapLayer.setLayerDrawingOptions(options);
      }, TIMER_DURATION);
      layerActions.changeOpacity.defer({
        layerId: layer.id,
        value
      });
      this.setState({ opacity: value });
    }
  };

  render () {
    return (
      <div className={`layer-transparency ${this.props.visible ? '' : 'hidden'}`}>
        <input type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.opacity}
          onChange={this.updateOpacity}
          onMouseUp={this.updateOpacity} />
        <div>Transparency</div>
      </div>
    );
  }
}
