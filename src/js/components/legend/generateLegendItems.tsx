import * as React from 'react';
import { LayerProps } from 'js/store/mapview/types';
// import { mapController } from 'js/controllers/mapController';

interface IconItemProps {
  color: string;
  height: number;
  width: number;
  opacity: number;
}
const PointItem = (props: IconItemProps): JSX.Element => {
  return (
    <div
      style={{
        borderRadius: '50%',

        width: `${props.width}px`,
        height: `${props.height}px`,
        opacity: `${props.opacity}`,
        backgroundColor: `${props.color}`
      }}
    ></div>
  );
};

const PolygonItem = (props: IconItemProps): JSX.Element => {
  return (
    <div
      style={{
        border: '1px solid rgb(85, 85, 85)',
        width: `${props.width}px`,
        height: `${props.height}px`,
        opacity: `${props.opacity}`,
        backgroundColor: `${props.color}`
      }}
    ></div>
  );
};

interface PolyFromMapServerProps {
  dataURI: string;
  title: string;
  opacity: number;
}
const PolyFromMapServer = (props: PolyFromMapServerProps): JSX.Element => {
  return (
    <img
      src={props.dataURI}
      title={props.title}
      style={{ opacity: `${props.opacity}` }}
    />
  );
};

interface LegendItemProps {
  visibleLayers: LayerProps[];
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const items = props.visibleLayers.map(layer => {
    //whwowow
    if (layer.legendInfo) {
      //we need to figure out if layer has sublayers or not
      // const layerOnMap = mapController.findLayerByID(layer.id);
      const itemsToDisplay = [];

      // if (layerOnMap?.sublayers) {
      // }

      console.log('looking for layers');
      // console.log(layerOnMap);
      //These layers are from webmap/ non-gfw api
      return (
        <div className="legend-item" key={layer.id}>
          <p className="layer-title">{layer.title}</p>
          {['one', 'two', 'three'].map((el, i) => (
            <div key={i}>
              <p>{el}</p>
              <PolygonItem
                color="rgb(220, 102, 153)"
                width={16}
                height={16}
                opacity={1}
              />
              <PointItem
                color="rgb(220, 102, 153)"
                width={16}
                height={16}
                opacity={1}
              />
              <PolyFromMapServer
                title="yes"
                opacity={1}
                dataURI="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAI1JREFUOI211MENwCAIBVBN3MLx2MMDuzqHPWlQwFBo/00lLySiJX2c8huIiCOKtdZyOTfoGhFHrXWtAWA7pzW9971DrdCC0YigFxPBCMZALwYAeV7qBnoxtcMoJoIRjIFejD6K69OzYq7BvmE0psG2YiIYwRjoxUyD/QZTO5w3RYF0RKuZX98Cz7/QmwfqIYE7SrOnbQAAAABJRU5ErkJggg=="
              />
            </div>
          ))}
        </div>
      );
    } else if (layer.metadata?.legendConfig) {
      //these layers are from gfw api, attempting to look for metadata
      return <div key={layer.id}>{layer.title}</div>;
    } else {
      //nothing found? what to do?
    }
  });
  return <>{items}</>;
};

export default LegendItems;
