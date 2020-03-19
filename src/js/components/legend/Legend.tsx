import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import 'css/legend.scss';
import LegendItems from './generateLegendItems';
import { LayerProps } from 'js/store/mapview/types';

const Legend = (): JSX.Element => {
  const { hideWidgetActive, selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  const { allAvailableLayers, scale } = useSelector(
    (store: RootState) => store.mapviewState
  );

  //handle scale visibility too, this only addresses webmaps but not the GFW API layers!
  function layerIsInScale(layer: LayerProps): boolean {
    if (layer.hasOwnProperty('minScale') && layer.hasOwnProperty('maxScale')) {
      if (layer.minScale === 0 && layer.maxScale === 0) {
        return true;
        //@ts-ignore -- TS is not understanding the above check for properties for some reason.
      } else if (layer.maxScale < scale && layer.minScale > scale) {
        //Our mapview is within the scale that is defined! show this legend item
        return true;
      } else {
        //legend item is outside the scale parameters, we do not want it!
        return false;
      }
    } else {
      // if no maxmin scale defined, we want to show those layers in legend
      return true;
    }
  }
  //TODO: order should be applied here I think!
  const visibleLayers = allAvailableLayers
    .filter(l => l.visible)
    .filter(layerIsInScale);

  const [legendOpen, setLegendOpen] = useState(!hideWidgetActive);

  function handleLegendToggle(): void {
    console.log('toggle');
    setLegendOpen(!legendOpen);
  }

  return (
    <>
      {visibleLayers.length > 0 && (
        <div className="legend-container">
          <div
            className="legend-title"
            onClick={handleLegendToggle}
            role="button"
          >
            <p>Legend</p>
            <button className="caret-button">
              {legendOpen && !hideWidgetActive ? '▼' : '▲'}
            </button>
          </div>
          <div
            className={
              legendOpen && !hideWidgetActive ? 'legend-content' : 'hidden'
            }
          >
            <LegendItems
              visibleLayers={visibleLayers}
              language={selectedLanguage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
