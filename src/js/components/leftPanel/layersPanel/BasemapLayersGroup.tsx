import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setOpenLayerGroup, renderModal } from '../../../store/appState/actions';
import { InfoIcon } from '../../../../images/infoIcon';
import { landsatBaselayerYears, customBasemapIcon } from '../../../../../configs/layer-config';
import { mapController } from '../../../controllers/mapController';
import { basemapLayersContent } from '../../../../../configs/translations/leftPanel.translations';
import { LayerProps } from '../../../store/mapview/types';
import { format } from 'date-fns';
import { ENV_VARIABLES } from '../../../../../configs/envVariables';
import { handleCustomColorTheme } from '../../../../utils';
import { setSelectedBasemapInfo } from '../../../store/mapview/actions';

interface DefaultBasemapProps {
  layerInfo: {
    id: string;
    thumbnailUrl?: string;
    title?: string;
    activeBasemap: string;
  };
}

interface BaseLayerControlLandsatProps {
  layerInfo: LayerProps;
  selectedLanguage: string;
  customColorTheme?: string;
}

interface BaseLayerPlanet extends BaseLayerControlLandsatProps {
  url: string;
}

const WebmapOriginal = (props: DefaultBasemapProps): JSX.Element => {
  const { id, activeBasemap } = props.layerInfo;
  return (
    <div
      className={`layer-basemap ${activeBasemap === id ? 'selected' : ''}`}
      onClick={(): void => mapController.setWebmapOriginalBasemap(id)}
    >
      <img src={customBasemapIcon} alt="basemap" />
      <span>{mapController._webmapBasemap?.title}</span>
    </div>
  );
};

const BaseLayerWRI = (props: DefaultBasemapProps): JSX.Element => {
  const { id, thumbnailUrl, title, activeBasemap } = props.layerInfo;
  return (
    <div
      className={`layer-basemap ${activeBasemap === id ? 'selected' : ''}`}
      onClick={() => mapController.setWRIBasemap(id)}
    >
      <img src={thumbnailUrl} alt="basemap" />
      <span>{title}</span>
    </div>
  );
};

const PlanetBasemap = (props: BaseLayerPlanet): JSX.Element => {
  const { title, url } = props.layerInfo;

  const [planetColor, setPlanetColor] = useState('rgb');
  const [planetTiles, setPlanetTiles] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedPlanetTileLayer, setSelectedPlanetTileLayer] = useState<string>('2021-02');

  const activeBasemap = useSelector((store: RootState) => store.mapviewState.activeBasemap);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const dispatch = useDispatch();

  const apiKey = ENV_VARIABLES.PLANET_API_KEY;

  const themeColor = handleCustomColorTheme(customColorTheme);
  useEffect(() => {
    const tileInfoURL = 'https://tiles.globalforestwatch.org/openapi.json';
    fetch(tileInfoURL)
      .then((res) => res.json())
      .then((data) => {
        const planetDateRanges: Array<string> = data?.components?.schemas?.PlanetDateRange?.enum;
        const planetTilesFormat = planetDateRanges
          .reverse()
          .filter((label) => label.length > 4)
          .map((d) => {
            const label = d
              .split('_')
              .map((date) => format(new Date(date), 'MMM yyyy'))
              .join('-');
            return { value: d, label };
          });

        setPlanetTiles(planetTilesFormat);
        setSelectedPlanetTileLayer(planetTilesFormat[0].value);
      })
      .catch((e) => console.log(e));
  }, []);
  function handlePlanetTileChange(name: string): void {
    setSelectedPlanetTileLayer(name);
    mapController.addPlanetTileLayer(url, planetColor, name, apiKey);
  }

  function handlePlanetColorChange(val: string): void {
    setPlanetColor(val);
    mapController.addPlanetTileLayer(url, val, selectedPlanetTileLayer, apiKey);
  }

  function handlePlanetTileClick() {
    const basemapInfo = { id: 'planet', url, planetColor, selectedPlanetTileLayer, apiKey } as any;
    dispatch(setSelectedBasemapInfo(basemapInfo));
    mapController.addPlanetTileLayer(url, planetColor, selectedPlanetTileLayer, apiKey);
  }

  const tileOptions = planetTiles?.map((tileInfo) => {
    return (
      <option value={tileInfo.value} key={tileInfo.value}>
        {tileInfo.label}
      </option>
    );
  });

  const TileColors = () => {
    return (
      <select
        onChange={(e) => handlePlanetColorChange(e.target.value)}
        value={planetColor}
        style={{ border: `1px solid ${props.customColorTheme}` }}
        className="landsat-years"
      >
        <option key={'rgb'} value={'rgb'}>
          Natural color
        </option>
        <option key={'cir'} value={'cir'}>
          False color
        </option>
      </select>
    );
  };

  return (
    <div className={`layer-basemap landsat ${activeBasemap === 'planet' ? 'selected' : ''}`}>
      <span className="planet-thumb" onClick={() => handlePlanetTileClick()}></span>
      <span onClick={() => handlePlanetTileClick()}>{title && title[props.selectedLanguage]}</span>
      <div className="planet-selectors">
        <select
          onChange={(e) => handlePlanetTileChange(e.target.value)}
          value={selectedPlanetTileLayer}
          style={{ border: `1px solid ${props.customColorTheme}` }}
          className="landsat-years"
        >
          {planetTiles && tileOptions}
        </select>
        <TileColors />
      </div>
      <div
        onClick={() => dispatch(renderModal('PlanetInfo'))}
        className="info-icon-container"
        style={{
          marginLeft: 25,
          marginBottom: 30,
          backgroundColor: `${themeColor}`,
        }}
      >
        <InfoIcon width={10} height={10} fill={'#fff'} />
      </div>
    </div>
  );
};

const BaseLayerControlLandsat = (props: BaseLayerControlLandsatProps): JSX.Element => {
  const { thumbnailUrl, title } = props.layerInfo;
  const years = landsatBaselayerYears;
  const [selectedYear, setSelectedYear] = React.useState(years[years.length - 1]);

  const activeBasemap = useSelector((store: RootState) => store.mapviewState.activeBasemap);

  function handleYearSelection(e: any): void {
    setSelectedYear(e.target.value);
    mapController.addLandsatLayer(props.layerInfo, e.target.value);
  }

  function handleBasemapSectionClick(): void {
    mapController.addLandsatLayer(props.layerInfo, String(selectedYear));
  }

  const yearsOptions = years.map((year: number, key: number) => {
    return (
      <option value={year} key={key}>
        {year}
      </option>
    );
  });

  //This is addmitedly odd way of adding an image, but landsat thumbnail url includes multiple thumbnails smushed together, so we slice the appropate one off.
  const imgStyles = {
    backgroundImage: `url('${thumbnailUrl}')`,
    backgroundRepeat: 'no-repeat center',
  };

  return (
    <div className={`layer-basemap ${activeBasemap.includes('landsat') ? 'selected' : ''}`}>
      <span onClick={handleBasemapSectionClick} className="landsat-thumb" style={imgStyles}></span>
      <span onClick={handleBasemapSectionClick}>{title && title[props.selectedLanguage]}</span>
      <select
        value={selectedYear}
        onChange={handleYearSelection}
        style={{ border: `1px solid ${props.customColorTheme}` }}
        className="landsat-years"
      >
        {yearsOptions}
      </select>
    </div>
  );
};

const GenericBaseLayerControl = ({ layerInfo }: DefaultBasemapProps): JSX.Element => {
  const { id, thumbnailUrl, title, activeBasemap } = layerInfo;
  return (
    <div
      className={`layer-basemap ${activeBasemap === id ? 'selected' : ''}`}
      onClick={() => mapController.setActiveBasemap(id)}
    >
      <img src={thumbnailUrl} alt="basemap" />
      <span>{title}</span>
    </div>
  );
};

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const BasemapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const leftPanel = useSelector((store: RootState) => store.appState.leftPanel);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const activeBasemap = useSelector((store: RootState) => store.mapviewState.activeBasemap);

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage] || 'Basemap';

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const themeColor = handleCustomColorTheme(customColorTheme);

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const basemapsToRender = layerGroupConfig.layers.filter(
    (baselayer: any) =>
      baselayer.id === 'landsat' ||
      baselayer.id === 'planet' ||
      baselayer.id === 'wri_mono' ||
      baselayer.id === 'wri_contextual'
  );

  //Add BASEMAP from Webmap
  basemapsToRender.push({ id: 'webmap' });
  const allowedBaseLayers = basemapsToRender.map((baselayer: any) => {
    if (baselayer.id === 'landsat') {
      return (
        <BaseLayerControlLandsat
          key={baselayer.id}
          layerInfo={baselayer}
          selectedLanguage={selectedLanguage}
          customColorTheme={themeColor}
        />
      );
    } else if (baselayer.id === 'planet' && baselayer?.url && baselayer.url.length !== 0) {
      return (
        baselayer.visible && (
          <PlanetBasemap
            key={baselayer.id}
            url={baselayer.url}
            layerInfo={baselayer}
            selectedLanguage={selectedLanguage}
            customColorTheme={themeColor}
          />
        )
      );
    } else if (baselayer.id === 'webmap') {
      return (
        <WebmapOriginal
          key={baselayer.id}
          layerInfo={{
            id: baselayer.id,
            activeBasemap,
          }}
        />
      );
    } else if (baselayer.id === 'wri_mono' || baselayer.id === 'wri_contextual') {
      return (
        <BaseLayerWRI
          key={baselayer.id}
          layerInfo={{
            id: baselayer.id,
            thumbnailUrl: baselayer.thumbnailUrl,
            title: baselayer.title[selectedLanguage] || baselayer.id,
            activeBasemap,
          }}
        />
      );
    }
  });

  const esriBasemapsToRender = basemapLayersContent.defaultESRIBasemaps.map(
    // * NOTE: these are generic Basemap layers that exist across custom maps
    (baselayer: any) => (
      <GenericBaseLayerControl
        key={baselayer.id}
        layerInfo={{
          id: baselayer.id,
          thumbnailUrl: baselayer.thumbnailUrl,
          title: baselayer.title[selectedLanguage] || baselayer.id,
          activeBasemap,
        }}
      />
    )
  );

  return (
    <div className="layer-group-container">
      <div
        className="layer-group-title"
        onClick={handleGroupToggle}
        onKeyPress={handleGroupToggle}
        role="button"
        tabIndex={0}
      >
        <span>{layerGroupTitle}</span>
        <button className="caret-button">{groupOpen ? '▼' : '▲'}</button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {allowedBaseLayers}
        {esriBasemapsToRender}
      </div>
    </div>
  );
};

export default BasemapLayersGroup;
