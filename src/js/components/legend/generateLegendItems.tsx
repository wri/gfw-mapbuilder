import * as React from 'react';
import { LayerProps } from 'js/store/mapview/types';
import {
  PointItem,
  PolygonItem,
  PolyFromMapServer
} from './LegendLabelComponents';

interface LegendItemProps {
  visibleLayers: LayerProps[];
  language: string;
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const items = props.visibleLayers.map(layer => {
    if (layer.legendInfo) {
      //deal with mapserver data here :()

      return null;
      //       <PolyFromMapServer
      //         title="yes"
      //         opacity={1}
      //         dataURI="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAI1JREFUOI211MENwCAIBVBN3MLx2MMDuzqHPWlQwFBo/00lLySiJX2c8huIiCOKtdZyOTfoGhFHrXWtAWA7pzW9971DrdCC0YigFxPBCMZALwYAeV7qBnoxtcMoJoIRjIFejD6K69OzYq7BvmE0psG2YiIYwRjoxUyD/QZTO5w3RYF0RKuZX98Cz7/QmwfqIYE7SrOnbQAAAABJRU5ErkJggg=="
      //       />
    } else if (layer.metadata?.legendConfig) {
      console.log(layer.metadata?.legendConfig);
      const title = layer.metadata?.legendConfig?.name[language];
      const labelIcons = layer.metadata?.legendConfig?.items.map((item, i) => {
        if (layer.metadata?.legendConfig?.type === 'point') {
          return (
            <div className="label-item" key={i}>
              <PointItem
                color={item.color}
                width={item.size}
                height={item.size}
                opacity={layer.opacity}
              />
              <p>{item.name[language]}</p>
            </div>
          );
        } else if (layer.metadata?.legendConfig?.type === 'basic') {
          return (
            <div className="label-item" key={i}>
              <PolygonItem
                color={item.color}
                outline={item.outlineColor}
                width={16}
                height={16}
                opacity={layer.opacity}
              />
              <p>{item.name[language]}</p>
            </div>
          );
        } else {
          //do we just assume polygon at this point?
          return (
            <div className="label-item" key={i}>
              <PolygonItem
                color={item.color}
                outline={item.outlineColor}
                width={16}
                height={16}
                opacity={layer.opacity}
              />
              <p>{item.name[language]}</p>
            </div>
          );
        }
      });
      //Grab appropriate title based on translations, if none exist, just show what is on layer.title
      //these layers are from gfw api, attempting to look for metadata
      return (
        <div className="layer-item" key={layer.id}>
          <p className="layer-title">{title ? title : layer.title}</p>
          {labelIcons}
        </div>
      );
    } else {
      //nothing found about the legend config information? what to do?
    }
  });
  return <div className="legend-item-container">{items}</div>;
};

export default LegendItems;
