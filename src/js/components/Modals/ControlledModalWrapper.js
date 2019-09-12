import React, { PropTypes } from 'react';
import SVGIcon from 'utils/svgIcon';

/**
* Should be wrapped in a component with relative or absolute position
*/
export default function ControlledModalWrapper (props) {
  const contentClass = `modal-content custom-scroll ${props.theme ? props.theme : ''}`;
  return (
    <div className='modal-container'>
      <div className='modal-background' onClick={props.onClose} />
      <article className={`modal ${props.shadow ? 'shadow' : ''}`}>
        <div title='close' className='close-icon pointer' onClick={props.onClose} >
          <svg>
            <SVGIcon id={'shape-close'} />
          </svg>
        </div>
          <div className={contentClass}>
            {props.children}
          </div>
      </article>
    </div>
  );
}

ControlledModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string
};
