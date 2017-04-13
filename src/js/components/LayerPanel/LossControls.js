import layerActions from 'actions/LayerActions';
import layerUtils from 'utils/layerUtils';
import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import React, { Component, PropTypes } from 'react';

const lossOptions = [];

export default class LossControls extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  componentDidMount () {
    // const url = 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear/ImageServer';
    // layerUtils.getLayerMetadata(url).then((results) => {
      const min = 1;
      const max = 15;
      for ( let i = min; i <= max; i++ ) {
        lossOptions.push({ label: 2000 + i + '', value: i });
      }
      //- Update the defaults to be the last year
      layerActions.updateLossTimeline.defer({
        fromSelectedIndex: 0,
        toSelectedIndex: 14
      });
      //- Set the options in the store so others can use it
      layerActions.setLossOptions.defer(lossOptions);
    // });
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    //- If the options are ready and something has changed
    const {lossFromSelectIndex, lossToSelectIndex, canopyDensity} = this.props;
    const {map} = this.context;

    if (map.loaded) {
      if (this.props.lossOptions.length &&
        (prevProps.lossFromSelectIndex !== lossFromSelectIndex || prevProps.lossToSelectIndex !== lossToSelectIndex)
        ) {
          this.updateDates(map.getLayer(layerKeys.TREE_COVER_LOSS), lossFromSelectIndex, lossToSelectIndex);
        }

        if (this.props.lossOptions.length && (prevProps.canopyDensity !== canopyDensity)
        ) {
          this.updateDensity(map.getLayer(layerKeys.TREE_COVER_LOSS), canopyDensity);
        }

        if (prevContext.map !== map) {
          const signal = map.on('update-end', () => {
            signal.remove();
            this.updateDates(map.getLayer(layerKeys.TREE_COVER_LOSS), lossFromSelectIndex, lossToSelectIndex);
          });
        }
    }

  }

  updateDates (layer, fromIndex, toIndex) {
    const fromYear = lossOptions[fromIndex].label;
    const toYear = lossOptions[toIndex].label;

    layer.setDateRange(fromYear - 2000, toYear - 2000);
  }

  updateDensity (layer, density) {
    const {lossFromSelectIndex, lossToSelectIndex} = this.props;
    let baseUrl = 'https://storage.googleapis.com/wri-public/Hansen14_15/tiles/hansen_world/v4.0/tc';
    baseUrl += density;
    baseUrl += '/{z}/{x}/{y}.png';

    layer.setUrl(baseUrl);
    layer.setDateRange(lossFromSelectIndex, lossToSelectIndex);
  }

  render () {
    if (lossOptions.length === 0) {
      return <div className='timeline-container loss flex'>loading...</div>;
    }

    const fromItem = lossOptions[this.props.lossFromSelectIndex];
    const toItem = lossOptions[this.props.lossToSelectIndex];

    return (
      <div className='timeline-container loss flex'>
        <div className='loss-from relative'>
          <select onChange={this.fromChanged.bind(this)} className='pointer' value={fromItem.value}>
            {lossOptions.map(this.optionsMap('from'))}
          </select>
          <div className='loss-from-button fa-button sml white'>{fromItem.label}</div>
        </div>
        <div className='loss-timeline-spacer'> - </div>
        <div className='loss-to relative'>
          <select onChange={this.toChanged.bind(this)} className='pointer' value={toItem.value}>
            {lossOptions.map(this.optionsMap('to'))}
          </select>
          <div className='loss-to-button fa-button sml white'>{toItem.label}</div>
        </div>
      </div>
    );
  }

  optionsMap (selectType) {
    // Disable options in the 'from' select that are greater than the selected value in the 'to' select
    // and vice versa, disable 'to' options less than the selected value in the 'from' select
    const fromMax = lossOptions[this.props.lossToSelectIndex].value;
    const toMin = lossOptions[this.props.lossFromSelectIndex].value;
    return (item, index) => {
      const disabled = selectType === 'from' ? item.value >= fromMax : item.value <= toMin;
      return <option key={index} value={item.value} disabled={disabled}>{item.label}</option>;
    };
  }

  fromChanged (evt) {
    if (evt.target.selectedIndex !== this.props.lossFromSelectIndex) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: evt.target.selectedIndex,
        toSelectedIndex: this.props.lossToSelectIndex
      });
    }
  }

  toChanged (evt) {
    if (evt.target.selectedIndex !== this.props.lossToSelectIndex) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: this.props.lossFromSelectIndex,
        toSelectedIndex: evt.target.selectedIndex
      });
    }
  }

}
