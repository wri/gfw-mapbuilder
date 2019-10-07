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

  removeAllSubLayers (info) {
    return info;
    }

  setSubLayers (info, ...subIndexes) {
    return {
      subIndexes,
      layer: info
    };
  }

  updateLossTimeline (data) {
    return {
      from: data.fromSelectedIndex,
      to: data.toSelectedIndex
    };
  }

  shouldResetSlider(bool) {
    return bool;
  }

  updateGladStartDate (startDate) {
    return startDate;
  }

  updateGladEndDate (endDate) {
    return endDate;
  }

  updateFormaStartDate (startDate) {
    return startDate;
  }

  updateFormaEndDate (endDate) {
    return endDate;
  }

  updateTerraIStartDate (startDate) {
    return startDate;
  }

  updateTerraIEndDate (endDate) {
    return endDate;
  }

  updateViirsStartDate (startDate) {
    return startDate;
  }

  updateViirsEndDate (endDate) {
    return endDate;
  }

  updateModisStartDate (startDate) {
    return startDate;
  }

  updateModisEndDate (endDate) {
    return endDate;
  }

  updateSelectedFeatureTitles (selectedFeatureTitles) {
    return selectedFeatureTitles;
  }

  setLossOptions (lossOptionsData) {
    return lossOptionsData;
  }

  changeOpacity (payload) {
    return payload;
  }

  setOpacities (opacities) {
    return opacities;
  }

  addAll () {
    return {};
  }

  removeAll () {
    return {};
  }

  removeAllLayers () {
    return {};
  }

  updateCartoSymbol (symbol) {
    return symbol;
  }

  fetchingCartoData = bool => bool;

}

export default dispatcher.createActions(LayerActions);
