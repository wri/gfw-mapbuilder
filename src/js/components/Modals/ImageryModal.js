import DraggableModalWrapper from 'components/Modals/DraggableModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class ImageryModal extends Component {

  close = () => {
    mapActions.toggleImageryVisible(false);
  };

  onDragEnd = (event) => {
    event.target.style.top = event.clientY;
    event.target.style.left = event.clientX;
  };

  render () {
    return (
      <DraggableModalWrapper onClose={this.close} onDragEnd={this.onDragEnd}>
        <div className='imagery-modal__wrapper'>
          <div className='imagery-modal__title'>Recent Hi-Res Satellite Imagery</div>

          <div className='imagery-modal__section filters'></div>

          <div className='imagery-modal__section'></div>

        </div>


      </DraggableModalWrapper>
    );
  }

}
