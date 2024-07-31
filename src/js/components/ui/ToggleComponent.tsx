import { layer } from 'esri/views/3d/support/LayerPerformanceInfo';
import React, { useEffect } from 'react';
import Switch from 'react-switch';

interface IToggleComponent {
  onChange: (checked: boolean) => void;
  checked: boolean;
  themeColor: string;
  disabled: boolean;
  layerName?: string;
}

const ToggleComponent = (props: IToggleComponent) => {
  const { onChange, checked, themeColor, disabled, layerName } = props;

  useEffect(() => {
    // The class, id, and data-layer-name are tied to Google Analytics. Allows WRI to track clicks on the layer checkboxes and the layer name.
    if (!layerName) return;

    const layerElement = document.querySelector(`[data-layer-name="${layerName}"]`);
    if (checked) {
      layerElement?.setAttribute('class', `layer-checkbox-on`);
    } else {
      layerElement?.removeAttribute('class');
    }
  }, [checked, layerName]);

  return (
    <div>
      <Switch
        className={'react-switch' + (checked ? ' layer-checkbox-on' : '')}
        checkedIcon={false}
        height={13}
        width={25}
        onColor={themeColor}
        uncheckedIcon={false}
        boxShadow="none"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        id={`layer-checkbox-${layerName}`}
        data-layer-name={layerName}
      />
    </div>
  );
};

export default ToggleComponent;
