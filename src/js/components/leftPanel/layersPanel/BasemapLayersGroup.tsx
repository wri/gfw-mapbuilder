import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import { landsatBaselayerYears } from 'configs/layer-config';
import { mapController } from 'js/controllers/mapController';
import { basemapLayersContent } from 'configs/leftPanel.translations';
import { LayerProps } from 'js/store/mapview/types';
interface DefaultBasemapProps {
  layerInfo: {
    id: string;
    thumbnailUrl: string;
    title: string;
    activeBasemap: string;
  };
}

interface BaseLayerControlLandsatProps {
  layerInfo: LayerProps;
  selectedLanguage: string;
  customColorTheme?: string;
}
const BaseLayerControlLandsat = (props: any): JSX.Element => {
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

  const colorTheme = props.customColorTheme?.length
    ? props.customColorTheme
    : '#f0ab00';

  return (
    <div className="layer-basemap landsat">
      <span
        onClick={handleBasemapSectionClick}
        className="landsat-thumb"
        style={imgStyles}
      ></span>
      <span onClick={handleBasemapSectionClick}>
        {title[props.selectedLanguage]}
      </span>
      <select
        value={selectedYear}
        onChange={handleYearSelection}
        style={{ border: `1px solid ${colorTheme}` }}
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
      onClick={(): void => mapController.setActiveBasemap(id)}
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

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage];

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const basemapsToRender = layerGroupConfig.layers.filter(
    (baselayer: any) => baselayer.id === 'landsat'
  );
  const allowedBaseLayers = basemapsToRender.map((baselayer: any) => (
    //TODO: Once we allow WRI custom basemaps, this needs to handle those cases, for not it is only working with landsat
    // * NOTE: these are custom Basemap layers that are set via resources.js
    <BaseLayerControlLandsat
      key={baselayer.id}
      layerInfo={baselayer}
      selectedLanguage={selectedLanguage}
      customColorTheme={customColorTheme}
    />
  ));

  const esriBasemapsToRender = basemapLayersContent.defaultESRIBasemaps.map(
    // * NOTE: these are generic Basemap layers that exist across custom maps
    (baselayer: any) => (
      <GenericBaseLayerControl
        key={baselayer.id}
        layerInfo={{
          id: baselayer.id,
          thumbnailUrl: baselayer.thumbnailUrl,
          title: baselayer.title[selectedLanguage],
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
