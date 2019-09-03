import React, { PropTypes } from 'react';
import SVGIcon from 'utils/svgIcon';
import text from '../../languages';

/**
* Should be wrapped in a component with relative or absolute position
*/



export default function ControlledEditModalWrapper (props) {
  const contentClass = `edit-modal-content custom-scroll ${props.theme ? props.theme : ''}`;
  return (
    <div className='edit-modal-container'>
        <article className='edit-modal'>
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

ControlledEditModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string
};
