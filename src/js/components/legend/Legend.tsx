import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import LegendItems from './generateLegendItems';
import { layerIsInScale } from 'js/helpers/layerScaleCheck';
import 'css/legend.scss';

const Legend = (): JSX.Element => {
  const { hideWidgetActive, selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  const { allAvailableLayers, scale } = useSelector(
    (store: RootState) => store.mapviewState
  );

  //TODO: order should be applied here I think!
  const visibleLayers = allAvailableLayers
    .filter(l => l.visible)
    .filter(l => layerIsInScale(l, scale));

  const [legendOpen, setLegendOpen] = useState(!hideWidgetActive);

  function handleLegendToggle(): void {
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
