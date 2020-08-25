import * as React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID?: string;
  layerOpacity: number | undefined;
  sublayer?: boolean;
  parentID?: string;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const LayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );

  const { layerID, layerOpacity, sublayer, parentID } = props;

  const handleOpacityChange = (eventValue: any): void => {
    if (layerID === 'MODIS_ACTIVE_FIRES') {
      mapController.updateMODISorVIIRSOpacity(layerID, eventValue);
    } else {
      // * NOTE: default logic
      if (layerID) {
        mapController.setLayerOpacity(layerID, eventValue, sublayer, parentID);
      }
    }
  };

  return (
    <div className="transparency-slider">
      <SliderWithTooltip
        min={0}
        max={1}
        step={0.05}
        value={layerOpacity}
        tipFormatter={(val: number): string => `${val * 100}%`}
        onChange={handleOpacityChange}
        railStyle={{ height: 5, backgroundColor: '#e9e9e9' }}
        trackStyle={{ backgroundColor: `${customColorTheme}`, height: 5 }}
        dotStyle={{
          border: `2px solid ${customColorTheme}`,
          height: 10,
          width: 10,
          bottom: -6
        }}
        handleStyle={[
          {
            border: `2px solid ${customColorTheme}`,
            height: 15,
            width: 15
          }
        ]}
      />
    </div>
  );
};

export default LayerTransparencySlider;
