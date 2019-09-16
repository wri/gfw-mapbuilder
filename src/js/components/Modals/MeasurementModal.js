import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import Measure from 'components/AnalysisPanel/Measurement';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class MeasurementModal extends Component {

  close = () => {
    mapActions.toggleMeasurementModal({ visible: false });
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
        <Measure embeddedInModal={true} />
      </ControlledModalWrapper>
    );
  }
}
