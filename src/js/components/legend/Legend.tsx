import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import 'css/legend.scss';
import LegendItems from './generateLegendItems';

const Legend = (): JSX.Element => {
  const { hideWidgetActive } = useSelector(
    (store: RootState) => store.appState
  );
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  //TODO: should likely filter scale here too
  //TODO: order should be applied here I believe
  const visibleLayers = allAvailableLayers.filter(l => l.visible);

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
