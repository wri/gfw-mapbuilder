import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class ImageryModal extends Component {

  close = () => {
    mapActions.toggleImageryVisible(false);
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
      Imagery Modal
      </ControlledModalWrapper>
    );
  }

}
