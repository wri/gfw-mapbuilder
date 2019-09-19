import MeasurementModalWrapper from 'components/Modals/MeasurementModalWrapper';
import MeasurementTool from 'components/AnalysisPanel/MeasurementTool';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class MeasurementModal extends Component {

  close = () => {
    mapActions.toggleMeasurementModal();
    // Clears graphics from map and resets the buttons
    brApp.map.measurement.clearResult();
    const currentTool = brApp.map.measurement.getTool();
    if (currentTool) {
        brApp.map.measurement.setTool(currentTool.toolName, false);
    }
    brApp.map.setInfoWindowOnClick(true);
  };

  render () {
    return (
      <MeasurementModalWrapper onClose={this.close}>
        <MeasurementTool embeddedInModal={true} />
      </MeasurementModalWrapper>
    );
  }
}
