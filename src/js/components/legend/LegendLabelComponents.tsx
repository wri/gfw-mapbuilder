import * as React from 'react';

interface IconItemProps {
  color: string;
  height: number;
  width: number;
  opacity: number;
  outline?: string;
}

export const PointItem = (props: IconItemProps): JSX.Element => {
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

export const PolygonItem = (props: IconItemProps): JSX.Element => {
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
}
export const PolyFromMapServer = (
  props: PolyFromMapServerProps
): JSX.Element => {
  return (
    <img
      src={props.dataURI}
      title={props.title}
      style={{ opacity: `${props.opacity}` }}
    />
  );
};
