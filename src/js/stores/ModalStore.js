import modalActions from 'actions/ModalActions';
import dispatcher from 'js/dispatcher';

class ModalStore {

  constructor () {
    this.bitlyUrl = '';
    this.basicModalText = '';
    this.basicModalTitle = '';

    this.bindListeners({
      updateBitlyUrl: modalActions.showShareModal,
      showBasicModal: modalActions.showBasicModal
    });
  }

  updateBitlyUrl (bitlyUrl) {
    this.bitlyUrl = bitlyUrl;
  }

  showBasicModal (payload) {
    this.basicModalText = payload.text;
    this.basicModalTitle = payload.title;
  }

}

export default dispatcher.createStore(ModalStore, 'ModalStore');
