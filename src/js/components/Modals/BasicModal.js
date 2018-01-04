import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalStore} from 'stores/ModalStore';
import React from 'react';

export default class BasicModal extends React.Component {

  constructor (props) {
    super(props);
    let defaultState = modalStore.getState();
    this.state = {
      title: defaultState.basicModalTitle,
      text: defaultState.basicModalText
    };
    modalStore.listen(::this.storeUpdated);
  }

  storeUpdated () {
    let newState = modalStore.getState();
    this.setState({
      title: newState.basicModalTitle,
      text: newState.basicModalText
    });
  }

  render () {
    return (
      <ModalWrapper>
        <div className='modal-title'>{this.state.title}</div>
        <div className='mapbuilder-modal-content' dangerouslySetInnerHTML={{ __html: this.state.text }}/>
      </ModalWrapper>
    );
  }

}
