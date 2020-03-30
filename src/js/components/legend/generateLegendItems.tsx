import * as React from 'react';
import { LayerProps } from 'js/store/mapview/types';
import {
  PointItem,
  BasicItem,
  PolyFromMapServer,
  LineItem,
  GradientItem
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

function getLegendLabel(
  type: LabelTypes,
  options: any,
  opacity: number
): JSX.Element | null {
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

function generateGradientItem(
  legendConfig: any,
  language: string
): JSX.Element {
  return (
    <div className="label-item">
      <GradientItem items={legendConfig.items} language={language} />
    </div>
  );
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const items = props.visibleLayers.map(layer => {
    if (layer.origin === 'webmap') {
      const labelIcons = layer.legendInfo.map((item: any, i: number) => {
        //deal with no label
        item.label = item.label && item.label.length ? item.label : layer.title;
        return (
          <div className="label-item" key={i}>
            {getLegendLabel(layer.type, item, layer.opacity)}
            <p>{item.label}</p>
          </div>
        );
      });
      return (
        <div className="layer-item" key={layer.id}>
          <p className="layer-title">{layer.title}</p>
          {labelIcons}
        </div>
      );
    } else if (layer.origin === 'remote') {
      const title = layer.metadata?.legendConfig?.name[language];
      let labelIcons;
      if (layer.metadata?.legendConfig?.type === 'gradient') {
        //Gradient requires combining items into a single image, so we deal with it separately
        labelIcons = generateGradientItem(
          layer.metadata?.legendConfig,
          language
        );
      } else {
        labelIcons = layer.metadata?.legendConfig?.items.map((item: any, i) => {
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
        });
      }
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
