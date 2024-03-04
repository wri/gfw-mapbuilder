import * as React from 'react';

import './LoaderSpinnerRing.scss';

interface LoaderSpinnerRingTypes {
  color?: string;
  size?: number;
}

const LoaderSpinnerRing = (props: LoaderSpinnerRingTypes) => {
  const size = props.size ? props.size - 20 : 100;
  const color = props.color ? props.color : 'green';

  return (
    <div className="LoaderRing">
      <div style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }} />
      <div style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }} />
      <div style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }} />
      <div style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }} />
    </div>
  );
};

export default LoaderSpinnerRing;
