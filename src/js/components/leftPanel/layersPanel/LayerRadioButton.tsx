import * as React from 'react';

interface LayerRadioButtonProps {
  layerID: string;
  activeLayerID?: string;
  handleLayerRadioClick: (val: string) => void;
}
const LayerRadioButton = (props: LayerRadioButtonProps): JSX.Element => {
  function handleLayerRadioChange(e: any) {
    e.stopPropagation();
    e.preventDefault();
    props.handleLayerRadioClick(props.layerID);
  }

  const radioIsChecked = props.layerID === props.activeLayerID;
  return (
    <div className="radio-container" onClick={handleLayerRadioChange}>
      <input
        type="radio"
        id="ck1"
        name="radio-group"
        checked={radioIsChecked}
        onChange={() => null}
      />
      <label htmlFor="ck1"></label>
    </div>
  );
};

export default LayerRadioButton;
