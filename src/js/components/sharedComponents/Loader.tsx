import * as React from 'react';
import { Ring } from 'react-spinners-css';

interface LoaderProps {
  containerPositionStyling: any;
  color?: string;
  size?: number;
}

const Loader = (props: LoaderProps) => {
  return (
    <div style={props.containerPositionStyling}>
      <Ring
        color={props.color ? props.color : 'green'}
        size={props.size ? props.size : 100}
      />
    </div>
  );
};

export default Loader;
