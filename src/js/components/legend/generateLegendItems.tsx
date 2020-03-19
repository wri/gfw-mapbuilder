import * as React from 'react';
import { LayerProps } from 'js/store/mapview/types';
import {
  PointItem,
  BasicItem,
  PolyFromMapServer,
  LineItem
} from './LegendLabelComponents';

interface LegendItemProps {
  visibleLayers: LayerProps[];
  language: string;
}

type LabelTypes = 'basic' | 'point' | 'line' | 'gradient' | 'group' | undefined;
function getLegendLabel(type: LabelTypes, options: any, opacity: number): any {
  const { color, size, outlineColor, thickness, lineType } = options;
  console.log(options.items);
  switch (type) {
    case 'basic':
      return (
        <BasicItem
          color={color}
          outline={outlineColor}
          height={16}
          width={16}
          opacity={opacity}
        />
      );
    case 'point':
      return (
        <PointItem color={color} height={size} width={size} opacity={opacity} />
      );
    case 'line':
      return (
        <LineItem
          color={color}
          thickness={thickness}
          lineType={lineType}
          opacity={opacity}
        />
      );
    case 'gradient':
      return null;
    case 'group':
      return null;
    default:
      return (
        <BasicItem
          color={'#c8a2c8'}
          outline={'#000000'}
          height={16}
          width={16}
          opacity={opacity}
        />
      );
  }
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const items = props.visibleLayers.map(layer => {
    if (layer.origin === 'webmap') {
      //deal with mapserver data here :()
      //       <PolyFromMapServer
      //         title="yes"
      //         opacity={1}
      //         dataURI="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAI1JREFUOI211MENwCAIBVBN3MLx2MMDuzqHPWlQwFBo/00lLySiJX2c8huIiCOKtdZyOTfoGhFHrXWtAWA7pzW9971DrdCC0YigFxPBCMZALwYAeV7qBnoxtcMoJoIRjIFejD6K69OzYq7BvmE0psG2YiIYwRjoxUyD/QZTO5w3RYF0RKuZX98Cz7/QmwfqIYE7SrOnbQAAAABJRU5ErkJggg=="
      //       />
      return null;
    } else if (layer.origin === 'remote') {
      const title = layer.metadata?.legendConfig?.name[language];
      const labelIcons = layer.metadata?.legendConfig?.items.map(
        (item: any, i) => {
          return (
            <div className="label-item" key={i}>
              {getLegendLabel(
                layer.metadata?.legendConfig?.type,
                item,
                layer.opacity
              )}
              <p>{item.name[language]}</p>
            </div>
          );
        }
      );
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
