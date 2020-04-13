import * as React from 'react';
import { useState } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID?: string;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const ImageryLayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const { layerID } = props;
  const [opacity, setOpacity] = useState(1);
  const handleOpacityChange = (eventValue: any): void => {
    if (!layerID) return;
    const imageryLayer = mapController._map?.findLayerById(layerID);
    if (!imageryLayer) return;
    imageryLayer.opacity = eventValue;
    mapController.updateImageryOpacity(eventValue);
    setOpacity(eventValue);
  };

  React.useEffect(() => {
    //setting default opacity here
    if (layerID) {
      const imageryLayer = mapController._map?.findLayerById(layerID);
      if (imageryLayer) {
        setOpacity(mapController._imageryOpacity);
      }
    }
  }, [layerID]);

  return (
    <div className="transparency-slider">
      <SliderWithTooltip
        min={0}
        max={1}
        step={0.05}
        defaultValue={opacity}
        value={opacity}
        tipFormatter={(val: number): string => `${val * 100}%`}
        onChange={handleOpacityChange}
        railStyle={{ height: 5, backgroundColor: '#e9e9e9' }}
        trackStyle={{ backgroundColor: 'rgb(240, 171, 0)', height: 5 }}
        dotStyle={{
          border: `2px solid rgb(240, 171, 0)`,
          height: 10,
          width: 10,
          bottom: -6
        }}
        handleStyle={[
          {
            border: `2px solid rgb(240, 171, 0)`,
            height: 15,
            width: 15
          }
        ]}
      />
    </div>
  );
};

export default ImageryLayerTransparencySlider;
