import React from 'react';
import moment from 'moment';
// import LayerTransparency from './LayerTransparency';
// import SVGIcon from 'utils/svgIcon';
import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';

export default class ImageryControls extends React.Component {

  showInfo (layer) {
    if (layer.disabled) { return; }
    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.id);
  }

  render() {
    const {
      iconLoading,
      initialLayerOpacities,
      selectedImagery,
      layer,
      ...props} = this.props;

    const {language} = this.context;

    return <div className='layer-checkbox relative' key={layer.label[language]} >
      <span className='layer-checkbox-label'>
        {layer.label[language]}
        {selectedImagery ? <div className='layer-checkbox-sublabel'>
          {`(${moment(selectedImagery.attributes.date_time).format('DD MMM YYYY')}, ${selectedImagery.attributes.cloud_score.toFixed(0)}% cloud coverage, ${selectedImagery.attributes.instrument.replace('_', ' ')})`}
        </div> : null}
      </span>
      <span className='fa-button sml white layer-edit' onClick={this.editImagery}>edit</span>
    </div>;
  }
}
