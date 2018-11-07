import React, { PropTypes } from 'react';
import SVGIcon from 'utils/svgIcon';

/**
* Should be wrapped in a component with relative or absolute position
*/
export default function DraggableModalWrapper (props) {
  const contentClass = `${props.theme ? props.theme : ''}`;
  return (
    <article id='draggableModal' className='modal draggable' draggable='true' onDragEnd={props.onDragEnd}>
      <div title='close' className='close-icon pointer' onClick={props.onClose} >
        <svg>
          <SVGIcon id={'shape-close'} />
        </svg>
      </div>
        <div className={contentClass}>
          {props.children}
        </div>
    </article>
  );
}

DraggableModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string
};
