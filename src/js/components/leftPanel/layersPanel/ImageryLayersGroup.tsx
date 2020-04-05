import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import LayerTransparencySlider from './LayerTransparencySlider';
import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
import { renderModal, setInfoModalLayerID } from 'js/store/appState/actions';
import 'css/layer-toggle-checkbox.scss';
import RecentImagery from './RecentImagery/RecentImageryModal';

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const ImageryLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const [imageryModalOpen, setImageryModalOpen] = useState(false);

  interface ImageryInfo {
    [key: string]: any;
    info: any;
    selectedLanguage: string;
    id?: string;
  }
  const ImageryLayerControl = (props: ImageryInfo): JSX.Element => {
    const dispatch = useDispatch();

    const dynamicSublabel =
      props.info.layers[0].dynamicSublabel[props.selectedLanguage];

    const openInfoModal = (): void => {
      if (props.id) {
        dispatch(renderModal('InfoContent'));
        dispatch(setInfoModalLayerID(props.id));
      }
    };

    return (
      <>
        <div className="layers-control-checkbox">
          <ImageryLayerSwitch layerID={props.id} />
          <div className="title-wrapper">
            <span className="layer-label">
              {props.info?.label[props.selectedLanguage]}
            </span>
            <span className="layer-subtitle"> {dynamicSublabel}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <button
              className="imagery-edit-button"
              onClick={(): void => setImageryModalOpen(true)}
            >
              EDIT
            </button>

            <div
              className="info-icon-container"
              style={{ marginLeft: 10 }}
              onClick={() => openInfoModal()}
            >
              <InfoIcon width={10} height={10} fill={'#fff'} />
            </div>
          </div>
        </div>
        <LayerTransparencySlider layerID={'props.id'} layerOpacity={1} />
      </>
    );
  };

  interface ImageryToggleProps {
    layerID?: string;
  }
  const ImageryLayerSwitch = (props: ImageryToggleProps): JSX.Element => {
    return (
      <div className="layer-checkbox imagery">
        <input
          type="checkbox"
          name="styled-checkbox"
          className="styled-checkbox"
          id={`layer-checkbox-${props.layerID}`}
          checked={imageryModalOpen}
          onChange={(): void => setImageryModalOpen(!imageryModalOpen)}
        />
        <label
          className="styled-checkboxlabel"
          htmlFor={`layer-checkbox-${props.layerID}`}
        >
          {props.layerID}
        </label>
      </div>
    );
  };

  const { layerGroupKey, layerGroupConfig } = props;
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
  );

  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const imagerylayer = allAvailableLayers.find(
    l => l.id === layerGroupConfig.layers[0].id
  );

  const dispatch = useDispatch();

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage];

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const handleGroupToggle = (): void => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const handleCloseModal = (): void => {
    setImageryModalOpen(false);
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
            selectedLanguage={selectedLanguage}
            info={layerGroupConfig}
            id={imagerylayer?.id}
          />
        </div>
      </div>
      {imageryModalOpen && <RecentImagery modalHandler={handleCloseModal} />}
    </>
  );
};

export default ImageryLayersGroup;
