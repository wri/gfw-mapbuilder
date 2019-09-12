import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import CoordinatesTools from 'components/AnalysisPanel/CoordinatesTools';
import Upload from 'components/AnalysisPanel/Upload';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class AnalysisModal extends Component {

  close = () => {
    mapActions.toggleAnalysisModal({ visible: false });
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
        <DrawTools embeddedInModal={true} drawButtonActive={this.props.drawButtonActive}/>
        <CoordinatesTools embeddedInModal={true} />
        <Upload embeddedInModal={true} />
      </ControlledModalWrapper>
    );
  }

}
