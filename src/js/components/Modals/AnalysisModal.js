import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import CoordinateTools from 'components/AnalysisPanel/CoordinateTools';
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
        <CoordinateTools embeddedInModal={true} />
        <Upload embeddedInModal={true} />
      </ControlledModalWrapper>
    );
  }

}
