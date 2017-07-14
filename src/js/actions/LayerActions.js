import dispatcher from 'js/dispatcher';

class LayerActions {

  addActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  removeActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  showLoading (layerId) {
    return layerId;
  }

  addSubLayer (info) {
    return info;
  }

  removeSubLayer (info) {
    return info;
  }

  changeFiresTimeline (selectedIndex) {
    return selectedIndex;
  }

  updateLossTimeline (data) {
    return {
      from: data.fromSelectedIndex,
      to: data.toSelectedIndex
    };
  }

  setLossOptions (lossOptionsData) {
    return lossOptionsData;
  }

  changeOpacity (parameters) {
    return parameters;
  }

  addAll () {
    return {};
  }

  removeAll () {
    return {};
  }

}

export default dispatcher.createActions(LayerActions);
