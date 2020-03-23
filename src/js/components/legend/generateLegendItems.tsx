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

type LabelTypes =
  | 'basic'
  | 'point'
  | 'line'
  | 'gradient'
  | 'group'
  | string
  | undefined;

function getLegendLabel(type: LabelTypes, options: any, opacity: number): any {
  const {
    color,
    size,
    outlineColor,
    thickness,
    lineType,
    label,
    imageData,
    contentType
  } = options;
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
    case 'webmap':
      return (
        <PolyFromMapServer
          opacity={opacity}
          dataURI={imageData}
          title={label}
          contentType={contentType}
        />
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

const returnLegendItem = (layer: any, language: string): JSX.Element => {
  const isWebmap = layer.origin === 'webmap' ? true : false;

  const legendItems = isWebmap
    ? layer.legendInfo
    : layer.metadata?.legendConfig?.items;

  const returnLayerTitle = (): string =>
    layer.metadata?.legendConfig?.name[language]
      ? layer.metadata?.legendConfig?.name[language]
      : layer.title;

  const layerTitle = isWebmap ? layer.title : returnLayerTitle();

  const labelIcons = legendItems.map((item: any, i: number) => {
    const returnWebmapLabel = (): string =>
      item.label && item.label.length ? item.label : layer.title;
    const label = isWebmap ? returnWebmapLabel() : item.name[language];
    const layerType = isWebmap
      ? layer.type
      : layer.metadata?.legendConfig?.type;

    return (
      <div className="label-item" key={i}>
        {getLegendLabel(layerType, item, layer.opacity)}
        <p>{label}</p>
      </div>
    );
  });

  return (
    <div className="layer-item" key={layer.id}>
      <p className="layer-title">{layerTitle}</p>
      {labelIcons}
    </div>
  );
};

const LegendItems = (props: LegendItemProps): any => {
  const { language } = props;
  const items = props.visibleLayers.map(layer => {
    if (layer.origin === 'webmap' || layer.origin === 'remote') {
      return returnLegendItem(layer, language);
    } else {
      console.log('This layer is not a webmap or remote layer!', layer);
    }
  });
  return <div className="legend-item-container">{items}</div>;
};

export default LegendItems;
