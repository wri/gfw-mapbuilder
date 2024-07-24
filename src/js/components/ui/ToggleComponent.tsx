import React from 'react';
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
  return (
    <div>
      <Switch
        className={'react-switch'}
        id={checked ? `toggle-${layerName}-on` : ''}
        checkedIcon={false}
        height={13}
        width={25}
        onColor={themeColor}
        uncheckedIcon={false}
        boxShadow="none"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
    </div>
  );
};

export default ToggleComponent;
