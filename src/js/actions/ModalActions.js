import domClass from 'dojo/dom-class';
import dispatcher from 'js/dispatcher';

class ModalActions {

  showShareModal (params) {
    //TODO: Generate a url from bitly that includes Map Store state, this way we can share params
    const url = document.location.href.split('?')[0];
    return `${url}?${params}`;
  }

  showAlertsModal () {
    domClass.remove('alerts-modal', 'hidden');
  }

  showCanopyModal () {
    domClass.remove('canopy-modal', 'hidden');
    return {};
  }

  showBasicModal (title, text) {
    this.dispatch({ title: title, text: text });
    domClass.remove('basic-modal', 'hidden');
  }

  hideModal (node) {
    domClass.add(node, 'hidden');
    return {};
  }

  updateCanopyDensity (newDensity) {
    this.dispatch(newDensity);
  }

}

export default dispatcher.createActions(ModalActions);
