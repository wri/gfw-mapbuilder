import React from 'react';
import LayerTransparency from './LayerTransparency';
import SVGIcon from 'utils/svgIcon';
import resources from '../../../resources';

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
  
  let colorTheme = '';
  const { customColorTheme, defaultColorTheme } = resources;
  if (selected === 'active' && customColorTheme !== '') {
      colorTheme = customColorTheme;
  } else if (selected === 'active' && customColorTheme === '') {
      colorTheme = defaultColorTheme;
  } else {
      colorTheme = '#ffffff';
  }

  return (
    <div className={`layer-radio relative ${selected}`} >
      <span onClick={handleToggleLayer} style={{backgroundColor: `${colorTheme}`}} className='radio-switch pointer'></span>
      <span onClick={handleToggleLayer} className='layer-radio-label pointer'>
        {label}
      </span>
      <span style={{backgroundColor: `${customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}} className={`info-icon pointer ${iconLoading === id ? 'iconLoading' : ''}`} onClick={handleShowInfo}>
        <SVGIcon id={'shape-info'} />
      </span>
      {sublabel && <div className='layer-checkbox-sublabel'>{sublabel}</div>}
      <LayerTransparency initialLayerOpacities={initialLayerOpacities} layer={layer} visible={selected}></LayerTransparency>
    </div>
  );
};

export default RadioButton;
