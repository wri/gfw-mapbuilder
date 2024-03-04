import * as React from 'react';

import LoaderSpinnerRing from '../LoaderSpinnerRing/LoaderSpinnerRing';

interface LoaderTypes {
  containerPositionStyling: any;
  color?: string;
  size?: number;
}

const Loader = (props: LoaderTypes) => {
  return (
    <div style={props.containerPositionStyling}>
      <LoaderSpinnerRing color={props.color} size={props.size} />
    </div>
  );
};

export default Loader;
