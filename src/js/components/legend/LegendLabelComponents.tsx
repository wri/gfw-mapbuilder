import * as React from 'react';

//TODO these types of legend items need to be supported according to the wiki: https://github.com/wri/gfw-mapbuilder/wiki/Legends
/*
  - Service ✅
  - Basic ✅
  - Point ✅
  - Line ✅
  - Gradient ✅
  - Cloropleth 🛑
  - Group 🛑
*/

interface PointItemProps {
  color: string;
  height: number;
  width: number;
  opacity: number;
}

export const PointItem = (props: PointItemProps): JSX.Element => {
  const { width, height, opacity, color } = props;
  return (
    <div
      style={{
        borderRadius: '50%',
        width: `${width}px`,
        height: `${height}px`,
        opacity: `${opacity}`,
        backgroundColor: `${color}`
      }}
    ></div>
  );
};

interface LineItemProps {
  lineType: string; //"dashed" or "solid"
  color: string;
  thickness: string;
  opacity: number;
}

export const LineItem = (props: LineItemProps): JSX.Element => {
  const { opacity, thickness, lineType, color } = props;
  return (
    <div
      style={{
        width: '16px',
        height: '16px',
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'grid',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          opacity: opacity,
          borderBottom: `${thickness}px ${lineType} ${color}`
        }}
      ></div>
    </div>
  );
};

interface BasicItemProps {
  color: string;
  height: number;
  width: number;
  opacity: number;
  outline: string;
}
export const BasicItem = (props: BasicItemProps): JSX.Element => {
  const { outline, width, height, opacity, color } = props;
  return (
    <div
      style={{
        border: `1px solid ${outline}`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: `${opacity}`,
        backgroundColor: `${color}`
      }}
    ></div>
  );
};

interface PolyFromMapServerProps {
  dataURI: string;
  title: string;
  opacity: number;
  contentType: string;
}
export const PolyFromMapServer = (
  props: PolyFromMapServerProps
): JSX.Element => {
  const { contentType, dataURI, title, opacity } = props;
  return (
    <img
      src={`data:${contentType};base64,${dataURI}`}
      title={title}
      style={{ opacity: `${opacity}` }}
    />
  );
};

interface GradientItemProps {
  items: any[];
  language: string;
}

export const GradientItem = (props: GradientItemProps): JSX.Element => {
  const { items, language } = props;
  const gradientColors = items.map(item => item.color).join(',');
  const gradientHeight = items.length * 20;
  return (
    <>
      <div
        style={{
          color: 'red',
          backgroundImage: `linear-gradient(${gradientColors})`,
          width: '18px',
          height: `${gradientHeight}px`,
          border: '1px solid #555'
        }}
      ></div>
      <div>
        {items.map((item: any, i: number) => (
          <p key={i}>{item?.name[language] ? item.name[language] : '-'}</p>
        ))}
      </div>
    </>
  );
};
