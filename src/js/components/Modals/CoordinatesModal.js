import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class AnalysisModal extends Component {

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
        <div>TEST</div>
      </ControlledModalWrapper>
    );
  }

}
