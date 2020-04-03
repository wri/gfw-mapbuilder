import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import LayerTransparencySlider from './LayerTransparencySlider';
import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
import { renderModal, setInfoModalLayerID } from 'js/store/appState/actions';

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
  console.log(props);

  const openInfoModal = (): void => {
    if (props.id) {
      dispatch(renderModal('InfoContent'));
      dispatch(setInfoModalLayerID(props.id));
    }
  };

  return (
    <>
      <div className="layers-control-checkbox">
        <div className="title-wrapper">
          <span className="layer-label">
            {props.info?.label[props.selectedLanguage]}
          </span>
          <span className="layer-subtitle"> {dynamicSublabel}</span>
        </div>
        <div className="info-icon-container" onClick={() => openInfoModal()}>
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      <LayerTransparencySlider layerID={'props.id'} layerOpacity={1} />
    </>
  );
};

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const ImageryLayersGroup = (props: LayerGroupProps): React.ReactElement => {
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

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

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
  );
};

export default ImageryLayersGroup;
