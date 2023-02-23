import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../js/store';
import { LayerProps } from '../../../js/store/mapview/types';
import LegendItems from './generateLegendItems';
import { layerIsInScale } from '../../../js/helpers/layerScaleCheck';

import { layersPanelTranslations } from '../../../../configs/translations/leftPanel.translations';
import '../../../css/legend.scss';

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
  };
};

const Legend = (): JSX.Element => {
  const hideLegend = useSelector((store: RootState) => store.appSettings.hideLegend);
  const hideWidgetActive = useSelector((store: RootState) => store.appState.hideWidgetActive);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const gladConfirmed = useSelector((store: RootState) => store.appState.leftPanel.gladConfirmed);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);

  const scale = useSelector((store: RootState) => store.mapviewState.scale);

  const layersLoading = useSelector((store: RootState) => store.mapviewState.layersLoading);

  const [legendOpen, setLegendOpen] = useState(!hideLegend);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function handleLegendToggle(): void {
    setLegendOpen(!legendOpen);
  }

  const [visibleLayersToShow, setVisibleLayersToShow] = useState<LayerProps[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { width } = windowDimensions;

    /**
     * * NOTE:
     * If device is mobile,
     * ensure legendOpen is synced with hideLegend
     */

    if (width < 475 && hideLegend) {
      setLegendOpen(hideLegend);
    }
  }, [windowDimensions.width, hideLegend]);

  useEffect(() => {
    //TODO: order should be applied here
    //IDS of layers you want to specifically ignore in the legend
    const ignoredLayers = ['RECENT_IMAGERY'];
    const visibleLayers = allAvailableLayers
      .filter((l) => l.visible)
      .filter((l) => !ignoredLayers.includes(l.id))
      .filter((l) => layerIsInScale(l, scale));
    //sync layer loading state with legend comp
    setVisibleLayersToShow(visibleLayers);
  }, [layersLoading, allAvailableLayers, scale]);

  const onMobileOrDesktop =
    windowDimensions.width < 475 ? !hideLegend && visibleLayersToShow.length > 0 : visibleLayersToShow.length > 0;

  return (
    <>
      {onMobileOrDesktop && (
        <div className="legend-container" data-cy="legend">
          <div className="legend-title" onClick={handleLegendToggle} role="button">
            <p>{layersPanelTranslations[selectedLanguage].legend || 'Legend'}</p>
            <button className="caret-button">{legendOpen && !hideWidgetActive ? '▼' : '▲'}</button>
          </div>
          <div className={legendOpen && !hideWidgetActive ? 'legend-content' : 'hidden'}>
            <LegendItems
              visibleLayers={visibleLayersToShow}
              language={selectedLanguage}
              gladConfirmed={gladConfirmed}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
