import modalActions from 'actions/ModalActions';
import modalStore from 'stores/ModalStore';
import ReactDOM from 'react-dom';
import React from 'react';

export default class ModalWrapper extends React.Component {

  constructor(props) {
    super(props);

    modalStore.listen(this.storeUpdated.bind(this));
    const defaultState = modalStore.getState();
    this.state = {
      layerInfo: defaultState.modalLayerInfo
    };
  }

  storeUpdated () {
    const currentState = modalStore.getState();
    this.setState({ layerInfo: currentState.modalLayerInfo });
  }

  close () {
    modalActions.hideModal(ReactDOM.findDOMNode(this).parentElement);
  }

  render() {
    const {theme, children} = this.props;
    const contentClass = `mapbuilder-modal-content ${theme ? theme : ''}`;

    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <article className='modal-boxaa shadow'>
          <div title='close' className='close-icon pointer' onClick={::this.close} >
            <svg><use xlinkHref="#shape-close" /></svg>
          </div>
            <div className={contentClass}>
              {children}
            </div>
        </article>
      </div>
    );
  }

}
