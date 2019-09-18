import MeasurementModalWrapper from 'components/Modals/MeasurementModalWrapper';
import MeasurementTool from 'components/AnalysisPanel/MeasurementTool';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class MeasurementModal extends Component {

  close = () => {
    mapActions.toggleMeasurementModal();
  };

  render () {
    return (
      <MeasurementModalWrapper onClose={this.close}>
        <MeasurementTool embeddedInModal={true} />
      </MeasurementModalWrapper>
    );
  }
}
