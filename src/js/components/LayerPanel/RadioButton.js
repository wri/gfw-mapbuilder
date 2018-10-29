import React from 'react';
import LayerTransparency from './LayerTransparency';


 const RadioButton = ({
  selected,
  id,
  label,
  iconLoading,
  sublabel,
  layer,
  showInfo,
  toggleLayer,
  initialLayerOpacities
}) => {

  const handleToggleLayer = () => {
    toggleLayer(layer);
  };

  const handleShowInfo = () => {
    showInfo(layer);
  };

  return (
    <div className={`layer-radio relative ${selected}`} >
      <span onClick={handleToggleLayer} className='radio-switch pointer'></span>
      <span onClick={handleToggleLayer} className='layer-radio-label pointer'>
        {label}
      </span>
      <span className={`info-icon pointer ${iconLoading === id ? 'iconLoading' : ''}`} onClick={handleShowInfo}>
        <svg><use xlinkHref={'#shape-info'} /></svg>
      </span>
      {sublabel && <div className='layer-checkbox-sublabel'>{sublabel}</div>}
      <LayerTransparency initialLayerOpacities={initialLayerOpacities} layer={layer} visible={selected}></LayerTransparency>
    </div>
  );
};

export default RadioButton;
