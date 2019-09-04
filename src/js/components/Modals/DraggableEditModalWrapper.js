import React, { PropTypes } from 'react';
import SVGIcon from 'utils/svgIcon';

/**
* Should be wrapped in a component with relative or absolute position
*/

export default function DraggableEditModalWrapper (props) {
  const contentClass = `edit-modal-content custom-scroll ${props.theme ? props.theme : ''}`;
  return (
    <div className='edit-modal-container'>
        <article style={{left: props.left, top: props.top}} className='edit-modal draggable' draggable='true' onDragEnd={props.onDragEnd}>
            <div title='close' className='edit-close-icon pointer' onClick={props.onClose} >
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

DraggableEditModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string
};
