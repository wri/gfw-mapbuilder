import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'js/store';
import { setRenderGFWDropdown } from 'js/store/appState/actions';
import { LayerProps } from 'js/store/mapview/types';
import LegendItems from './generateLegendItems';
import { layerIsInScale } from 'js/helpers/layerScaleCheck';

import 'css/legend.scss';

const Legend = (): JSX.Element => {
  const dispatch = useDispatch();

  const hideLegend = useSelector(
    (store: RootState) => store.appSettings.hideLegend
  );
  const hideWidgetActive = useSelector(
    (store: RootState) => store.appState.hideWidgetActive
  );
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const renderGFWDropdown = useSelector(
    (store: RootState) => store.appState.renderGFWDropdown
  );
  const allAvailableLayers = useSelector(
    (store: RootState) => store.mapviewState.allAvailableLayers
  );

  const scale = useSelector((store: RootState) => store.mapviewState.scale);

  const layersLoading = useSelector(
    (store: RootState) => store.mapviewState.layersLoading
  );

  const [legendOpen, setLegendOpen] = useState(!hideLegend);

  function handleLegendToggle(): void {
    setLegendOpen(!legendOpen);
  }

  const closeGFWDropdown = (): void => {
    if (renderGFWDropdown) {
      dispatch(setRenderGFWDropdown(false));
    }
  };

  const [visibleLayersToShow, setVisibleLayersToShow] = useState<LayerProps[]>(
    []
  );
  useEffect(() => {
    //TODO: order should be applied here I think!
    const visibleLayers = allAvailableLayers
      .filter(l => l.visible)
      .filter(l => layerIsInScale(l, scale));
    //sync layer loading state with legend comp
    setVisibleLayersToShow(visibleLayers);
  }, [layersLoading, allAvailableLayers]);
  return (
    <>
      {visibleLayersToShow.length > 0 && (
        <div className="legend-container" onClick={() => closeGFWDropdown()}>
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
              visibleLayers={visibleLayersToShow}
              language={selectedLanguage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
