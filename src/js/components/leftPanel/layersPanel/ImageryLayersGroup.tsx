import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../js/store';
import { setOpenLayerGroup } from '../../../../js/store/appState/actions';
import ImagerySlider from './RecentImagery/ImagerySlider';
import { InfoIcon } from '../../../../images/infoIcon';
import { renderModal, setInfoModalLayerID } from '../../../../js/store/appState/actions';
import RecentImagery from './RecentImagery/RecentImageryModal';
import { format } from 'date-fns';
import { mapController } from '../../../../js/controllers/mapController';
import styled from 'styled-components';

import '../../../../css/layer-toggle-checkbox.scss';
import { handleCustomColorTheme } from '../../../../utils';

interface CheckBoxWrapperProps {
  customColorTheme: string;
}
//Override speudo element styling with our custom style
const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${(props) => props.customColorTheme};
  }
`;

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const ImageryLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const [imageryModalOpen, setImageryModalOpen] = useState(false);
  const [toggleIsOn, setToggleIsOn] = useState(false);
  const [hoverTileData, setHoverTileData] = useState('');

  interface ImageryInfo {
    [key: string]: any;
    info: any;
    selectedLanguage: string;
    id?: string;
  }
  const ImageryLayerControl = (props: ImageryInfo): JSX.Element => {
    const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
    const dispatch = useDispatch();
    const themeColor = handleCustomColorTheme(customColorTheme);

    const openInfoModal = (): void => {
      if (props.id) {
        dispatch(renderModal('InfoContent'));
        dispatch(setInfoModalLayerID(props.id));
      }
    };

    const parseDynamicSublabel = (): string => {
      if (hoverTileData) {
        let sublabelBase = props.info.layers[0].dynamicSublabel[props.selectedLanguage];
        if (sublabelBase) {
          const parsedDate = Date.parse(props.hoverTileData.date_time);
          const formatHoverDay = format(parsedDate, 'dd-MMM-yyyy');
          const hoverCloud = Math.round(props.hoverTileData.cloud_score);
          sublabelBase = sublabelBase.replace('{DATE_TIME}', formatHoverDay);
          sublabelBase = sublabelBase.replace('{CLOUD_COVERAGE}', hoverCloud);
          sublabelBase = sublabelBase.replace('{INSTRUMENT}', props.hoverTileData.instrument);
        }
        return sublabelBase;
      } else {
        return '';
      }
    };

    return (
      <>
        <div className="layers-control-checkbox">
          <div className="label-wrapper" style={{ width: 'auto' }}>
            <div className="label-control-top">
              <ImageryLayerSwitch layerID={props.id} customColorTheme={themeColor} />
              <div className="title-wrapper">
                <span className="layer-label">{props.info?.label[props.selectedLanguage] || 'Imagery Layer'}</span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
            }}
          >
            <button
              style={{ border: `1px solid ${themeColor}` }}
              className="imagery-edit-button"
              onClick={(): void => setImageryModalOpen(true)}
            >
              EDIT
            </button>

            <div
              className="info-icon-container"
              style={{ marginLeft: 10, backgroundColor: `${themeColor}` }}
              onClick={(): void => openInfoModal()}
            >
              <InfoIcon width={10} height={10} fill={'#fff'} />
            </div>
          </div>
        </div>
        <p
          className="layer-subtitle"
          style={{
            margin: 0,
            paddingLeft: '2rem',
            fontSize: '0.7rem',
            color: '#aaa',
          }}
        >
          {parseDynamicSublabel()}
        </p>
        {props.id && <ImagerySlider layerID={props.id} />}
      </>
    );
  };

  interface ImageryToggleProps {
    layerID?: string;
    customColorTheme: string;
  }
  const ImageryLayerSwitch = (props: ImageryToggleProps): JSX.Element => {
    let imageryLayer: any;
    if (props.layerID) {
      imageryLayer = mapController._map?.findLayerById(props.layerID);
    }

    const handleImagerySwitch = (e: any): void => {
      const checked = e.target.checked;

      setToggleIsOn(checked);
      setImageryModalOpen(checked);

      if (imageryLayer.urlTemplate) {
        imageryLayer.visible = checked;
      }
    };

    return (
      <CheckboxWrapper customColorTheme={props.customColorTheme}>
        <div className="layer-checkbox imagery">
          <input
            type="checkbox"
            name="styled-checkbox"
            className="styled-checkbox"
            id={`layer-checkbox-${props.layerID}`}
            checked={toggleIsOn}
            onChange={handleImagerySwitch}
          />
          <label className="styled-checkboxlabel" htmlFor={`layer-checkbox-${props.layerID}`}>
            {props.layerID}
          </label>
        </div>
      </CheckboxWrapper>
    );
  };

  const { layerGroupKey, layerGroupConfig } = props;

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const openLayerGroup = useSelector((store: RootState) => store.appState.leftPanel.openLayerGroup);

  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);

  const imagerylayer = allAvailableLayers.find((l) => l.id === layerGroupConfig.layers[0].id);

  const imageryLayerOnMap = mapController._map?.findLayerById(layerGroupConfig.layers[0].id);

  const dispatch = useDispatch();

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage] || 'Recent Imagery';

  const groupOpen = openLayerGroup === layerGroupKey;

  const handleGroupToggle = (): void => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const handleCloseModal = (): void => {
    setImageryModalOpen(false);
  };

  const handleTileHover = (data: any): void => {
    setHoverTileData(data.attributes);
  };

  return (
    <>
      <div className="layer-group-container">
        <div
          className="layer-group-title"
          onClick={handleGroupToggle}
          onKeyPress={handleGroupToggle}
          role="button"
          tabIndex={0}
        >
          <span>{layerGroupTitle}</span>
          <button className="caret-button" onClick={handleGroupToggle}>
            {groupOpen ? '▼' : '▲'}
          </button>
        </div>
        <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
          <ImageryLayerControl
            hoverTileData={hoverTileData}
            selectedLanguage={selectedLanguage}
            info={layerGroupConfig}
            id={imageryLayerOnMap?.id}
            opacity={imagerylayer?.opacity}
          />
        </div>
      </div>
      {imageryModalOpen && <RecentImagery modalHandler={handleCloseModal} handleTileHover={handleTileHover} />}
    </>
  );
};

export default ImageryLayersGroup;
