import * as React from 'react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../js/store';
import { setOpenLayerGroup } from '../../../../js/store/appState/actions';
import {
  landsatBaselayerYears,
  customBasemapIcon
} from '../../../../../configs/layer-config';
import { mapController } from '../../../../js/controllers/mapController';
import { basemapLayersContent } from '../../../../../configs/translations/leftPanel.translations';
import { LayerProps } from '../../../../js/store/mapview/types';

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

const PlanetBasemap = (props: BaseLayerControlLandsatProps): JSX.Element => {
  const { thumbnailUrl, title } = props.layerInfo;
  const years = landsatBaselayerYears;
  const [selectedYear, setSelectedYear] = React.useState(
    years[years.length - 1]
  );
  const [planetTiles, setPlanetTiles] = useState<any[]>();
  const [planetColor, setPlanetColor] = useState('');
  const [selectedPlanetTileLayer, setSelectedPlanetTileLayer] = useState(
    planetTiles && planetTiles[0].tileName
  ); //TODO this needs to be maybe the first one?

  console.log(planetTiles);
  // gladEnd: format(new Date(Date.now()), 'yyyy-MM-dd'),
  const planetProxyURL = 'http://localhost:1337';
  useEffect(() => {
    console.log('go?');
    fetch(`${planetProxyURL}/getPlanetTilesInfo`)
      .then((res: any) => res.json())
      .then(response => {
        // const res = response.json();
        debugger;
        console.log(response);
        const tilesInfo = response.mosaics.map((tile: any) =>
          tile.name
            .replace('planet_medres_normalized_analytic_', '')
            .replace('_mosaic', '')
            .split('_')
            .map((tileInfo: any) => ({
              tileName: tile.name,
              label: format(new Date(tileInfo), 'MMM yyyy')
            }))
        );
        console.log(tilesInfo);
        setPlanetTiles(tilesInfo.reverse());
      });
  }, []);

  function handleYearSelection(e: any): void {
    setSelectedYear(e.target.value);
    mapController.addLandsatLayer(props.layerInfo, e.target.value);
  }

  function handleBasemapSectionClick(e: any): void {
    mapController.addLandsatLayer(props.layerInfo, String(selectedYear));
  }

  function handlePlanetTile(name: string): void {
    //
  }

  function handlePlanetColorChange(val: string): void {
    setPlanetColor(val);
    //
  }

  function handlePlanetTileClick() {
    console.log('yayaya');
    mapController.addPlanetTileLayer();
  }

  const tileOptions = planetTiles?.map(tileInfo => {
    return (
      <option value={tileInfo[0].tileName} key={tileInfo[0].tileName}>
        {tileInfo[0].label}
        {tileInfo.length > 1 && ` - ${tileInfo[1].label}`}
      </option>
    );
  });

  const TileColors = () => {
    return (
      <select
        onChange={e => handlePlanetColorChange(e.target.value)}
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
    <div className="layer-basemap landsat">
      <span
        onClick={() => handlePlanetTileClick()}
        className="planet-thumb"
      ></span>
      <span onClick={() => handlePlanetTileClick()}>
        {title && title[props.selectedLanguage]}
      </span>
      <div className="planet-selectors">
        <select
          onChange={e => handlePlanetTile(e.target.value)}
          value={selectedPlanetTileLayer}
          style={{ border: `1px solid ${props.customColorTheme}` }}
          className="landsat-years"
        >
          {planetTiles && tileOptions}
        </select>
        <TileColors />
      </div>
    </div>
  );
};
const BaseLayerControlLandsat = (
  props: BaseLayerControlLandsatProps
): JSX.Element => {
  const { thumbnailUrl, title } = props.layerInfo;
  const years = landsatBaselayerYears;
  const [selectedYear, setSelectedYear] = React.useState(
    years[years.length - 1]
  );

  function handleYearSelection(e: any): void {
    setSelectedYear(e.target.value);
    mapController.addLandsatLayer(props.layerInfo, e.target.value);
  }

  function handleBasemapSectionClick(e: any): void {
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
    backgroundRepeat: 'no-repeat center'
  };

  return (
    <div className="layer-basemap landsat">
      <span
        onClick={handleBasemapSectionClick}
        className="landsat-thumb"
        style={imgStyles}
      ></span>
      <span onClick={handleBasemapSectionClick}>
        {title && title[props.selectedLanguage]}
      </span>
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

const GenericBaseLayerControl = ({
  layerInfo
}: DefaultBasemapProps): JSX.Element => {
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
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const leftPanel = useSelector((store: RootState) => store.appState.leftPanel);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const activeBasemap = useSelector(
    (store: RootState) => store.mapviewState.activeBasemap
  );

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;

  const layerGroupTitle =
    layerGroupConfig.label?.[selectedLanguage] || 'Basemap';

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

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
  basemapsToRender.push({ id: 'webmap_original' });

  const allowedBaseLayers = basemapsToRender.map((baselayer: any) => {
    if (baselayer.id === 'landsat') {
      return (
        <BaseLayerControlLandsat
          key={baselayer.id}
          layerInfo={baselayer}
          selectedLanguage={selectedLanguage}
          customColorTheme={customColorTheme}
        />
      );
    }
    if (baselayer.id === 'planet') {
      return (
        <PlanetBasemap
          key={baselayer.id}
          layerInfo={baselayer}
          selectedLanguage={selectedLanguage}
          customColorTheme={customColorTheme}
        />
      );
    }
    if (baselayer.id === 'webmap_original') {
      return (
        <WebmapOriginal
          key={baselayer.id}
          layerInfo={{
            id: baselayer.id,
            activeBasemap
          }}
        />
      );
    }
    if (baselayer.id === 'wri_mono' || baselayer.id === 'wri_contextual') {
      return (
        <BaseLayerWRI
          key={baselayer.id}
          layerInfo={{
            id: baselayer.id,
            thumbnailUrl: baselayer.thumbnailUrl,
            title: baselayer.title[selectedLanguage] || baselayer.id,
            activeBasemap
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
          activeBasemap
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
