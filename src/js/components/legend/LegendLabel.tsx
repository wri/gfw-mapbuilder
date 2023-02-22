import React from 'react';
import { BasicItem, LineItem, PointItem, PolyFromMapServer } from './LegendLabelComponents';

type LabelTypes = 'basic' | 'point' | 'line' | 'gradient' | 'group' | string | undefined;

interface LegendLabelProps {
  type: LabelTypes;
  options: any;
  opacity: number;
}

const LegendLabel = (props: LegendLabelProps): JSX.Element => {
  const { type, options, opacity } = props;
  const { color, size, outlineColor, thickness, lineType, label, imageData, contentType } = options;
  switch (type) {
    case 'basic':
    case 'choropleth':
      return <BasicItem color={color} outline={outlineColor} height={16} width={16} opacity={opacity} />;
    case 'point':
      return <PointItem color={color} height={size} width={size} opacity={opacity} />;
    case 'webmap':
      return <PolyFromMapServer opacity={opacity} dataURI={imageData} title={label} contentType={contentType} />;
    case 'line':
      return <LineItem color={color} thickness={thickness} lineType={lineType} opacity={opacity} />;
    default:
      return <BasicItem color={'#c8a2c8'} outline={'#000000'} height={16} width={16} opacity={opacity} />;
  }
};

export default LegendLabel;
