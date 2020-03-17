import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import 'css/legend.scss';

const Legend = (): JSX.Element => {
  const { hideWidgetActive } = useSelector(
    (store: RootState) => store.appState
  );
  const [legendOpen, setLegendOpen] = useState(!hideWidgetActive);

  function handleLegendToggle(): void {
    console.log('toggle');
    setLegendOpen(!legendOpen);
  }

  return (
    <div className="legend-container">
      <div className="legend-title" onClick={handleLegendToggle} role="button">
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
        <p>I am a Legend item representing a layer!</p>
        <p>I am a Legend item representing a layer!</p>
        <p>I am a Legend item representing a layer!</p>
        <p>I am a Legend item representing a layer!</p>
        <p>I am a Legend item representing a layer!</p>
      </div>
    </div>
  );
};

export default Legend;
