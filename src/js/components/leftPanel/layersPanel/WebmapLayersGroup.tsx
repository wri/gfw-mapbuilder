import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allAvailableLayers as allAvailableLayersAction } from '../../../../js/store/mapview/actions';
import { RootState } from '../../../../js/store';
import { setOpenLayerGroup } from '../../../../js/store/appState/actions';
import GenericLayerControl from './GenericLayerControl';
import { layerIsInScale } from '../../../../js/helpers/layerScaleCheck';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { mapController } from '../../../controllers/mapController';

//Memo Selectors
// const allAvailableLayersSelector = (state: RootState) => state.mapviewState.allAvailableLayers;
// const webmapLayerSelector = createSelector([allAvailableLayersSelector], layers =>
//   layers.filter(layer => layer.group === 'webmap')
// );

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const WebmapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const openLayerGroup = useSelector((store: RootState) => store.appState.leftPanel.openLayerGroup);

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const scale = useSelector((store: RootState) => store.mapviewState.scale);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const allLayersInScale = allAvailableLayers.filter(l => layerIsInScale(l, scale));
  const layersInGroup = allLayersInScale.filter(layer => layer.group === 'webmap');

  // const webmapLayers = useSelector(webmapLayerSelector);

  const language = useSelector((store: RootState) => store.appSettings.language);
  const webmapMenuName = useSelector((store: RootState) => store.appSettings.webmapMenuName);
  const alternativeWebmapMenuName = useSelector((store: RootState) => store.appSettings.alternativeWebmapMenuName);

  const dispatch = useDispatch();

  const { layerGroupKey } = props;

  const webmapNameToUse = language === selectedLanguage ? webmapMenuName : alternativeWebmapMenuName;
  const layerGroupTitle = webmapNameToUse || 'Webmap Group';

  const groupOpen = openLayerGroup === layerGroupKey;

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'white' : ''
  });

  function onDragEnd(result) {
    // Early return if the item is dropped outside the list
    if (!result.destination) {
      return;
    }
    const oldLayerGroup = Array.from(layersInGroup);
    const [movedLayer] = oldLayerGroup.splice(result.source.index, 1);
    oldLayerGroup.splice(result.destination.index, 0, movedLayer);
    const newOrderedArrayGroup = allAvailableLayers.filter(l => l.group !== 'webmap');
    const newOrderedArray = [...newOrderedArrayGroup, ...oldLayerGroup];
    dispatch(allAvailableLayersAction(newOrderedArray));
    mapController.reorderLayer(movedLayer.id, result.destination.index);
  }

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={layerGroupKey}>
            {(provided, snapshot) => (
              <div
                className="dataset"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {layersInGroup.map((layer, index) => {
                  return (
                    <Draggable key={index} index={index} draggableId={index.toString()}>
                      {(providedDraggable, snapshotDraggable) => {
                        return (
                          <GenericLayerControl
                            dndProvided={providedDraggable}
                            dndSnapshot={snapshotDraggable}
                            layer={layer}
                            sublayer={layer.sublayer}
                            parentID={layer.parentID}
                            id={layer.id}
                            key={`${layer.id} + ${index}`}
                            type="default"
                          />
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default WebmapLayersGroup;
