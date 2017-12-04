import React from 'react';
import LayerTransparency from 'js/components/LayerPanel/LayerTransparency';
import layerActions from 'actions/LayerActions';

const RadioButton = ({
  turnTheseOff,
  selected,
  id,
  label,
  iconLoading,
  sublabel,
  layer,
  showInfo
}) => {

  const toggleLayer = () => {
    // turn off all layers with id in the turnTheseOff array
    turnTheseOff.forEach(i => {
      layerActions.removeActiveLayer(i);
    });

    if (layer.includedSublayers) {
      layerActions.removeAllSubLayers(layer.esriLayer);
    }

    if (selected) {
      layerActions.removeActiveLayer(id);
      return;
    }

    if (layer.includedSublayers) {
      layerActions.addSubLayer(layer);
      return;
    }

    layerActions.addActiveLayer(id);
  };

  const handleShowInfo = () => {
    showInfo(layer);
  };

  return (
    <div className={`layer-radio relative ${selected}`} >
      <span onClick={toggleLayer} className='radio-switch pointer'></span>
      <span onClick={toggleLayer} className='layer-radio-label pointer'>
        {label}
      </span>
      <span className={`info-icon pointer ${iconLoading === id ? 'iconLoading' : ''}`} onClick={handleShowInfo}>
        <svg><use xlinkHref="#shape-info" /></svg>
      </span>
      {sublabel && <div className='layer-checkbox-sublabel'>{sublabel}</div>}
      <LayerTransparency layer={layer} visible={selected}></LayerTransparency>
    </div>
  );
};

export default RadioButton;
