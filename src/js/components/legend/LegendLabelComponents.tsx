import * as React from 'react';

//TODO these types of legend items need to be supported according to the wiki: https://github.com/wri/gfw-mapbuilder/wiki/Legends
/*
  - Service ✅
  - Basic ✅
  - Point ✅
  - Line ✅
  - Gradient 🛑
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

interface LineItemProps {
  lineType: string; //"dashed" or "solid"
  color: string;
  thickness: string;
  opacity: number;
}

export const LineItem = (props: LineItemProps): JSX.Element => {
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
          opacity: props.opacity,
          borderBottom: `${props.thickness}px ${props.lineType} ${props.color}`
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
  return (
    <div
      style={{
        border: `1px solid ${props.outline}`,
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
  contentType: string;
}
export const PolyFromMapServer = (
  props: PolyFromMapServerProps
): JSX.Element => {
  return (
    <img
      src={`data:${props.contentType};base64,${props.dataURI}`}
      title={props.title}
      style={{ opacity: `${props.opacity}` }}
    />
  );
};
