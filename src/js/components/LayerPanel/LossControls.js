import layerActions from 'actions/LayerActions';
import layerKeys from 'constants/LayerConstants';
import utils from 'utils/AppUtils';
import {loadJS, loadCSS} from 'utils/loaders';
import {assetUrls} from 'js/config';
import React, { Component, PropTypes } from 'react';

const lossOptions = [];

export default class LossControls extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

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

    let base = window._app.base ? window._app.base + '/' : '';
    if (base && base[base.length - 1] === '/' && base[base.length - 2] === '/') {
      base = base.substring(0, base.length - 1);
    }

    loadJS(base + assetUrls.rangeSlider).then(() => {
      // initialize the slider
      if ($('#loss-slider').ionRangeSlider) {
        $('#loss-slider').ionRangeSlider({
          type: 'double',
          values: lossOptions.map(option => option.label),
          grid: true,
          grid_snap: true,
          hide_min_max: true,
          prettify_enabled: false,
          onFinish: this.sliderChanged
        });
        this.lossSlider = $('#loss-slider').data('ionRangeSlider');
        this.setState({
          start: lossOptions[this.lossSlider.result.from].label,
          end: lossOptions[this.lossSlider.result.to].label
        });
      }
    });
    loadCSS(base + assetUrls.ionCSS);
    loadCSS(base + assetUrls.ionSkinCSS);
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    //- If the options are ready and something has changed
    const {lossFromSelectIndex, lossToSelectIndex, canopyDensity, resetSlider} = this.props;
    const fromYear = lossOptions[lossFromSelectIndex].label;
    const toYear = lossOptions[lossToSelectIndex].label;
    const {map} = this.context;

    if (map.loaded) {

        if (this.props.lossOptions.length) {
          if (prevProps.canopyDensity !== canopyDensity) {
            this.updateDensity(map.getLayer(layerKeys.TREE_COVER_LOSS), canopyDensity);
          }
          if (resetSlider) {
            this.lossSlider.update({
              from: 0,
              to: lossOptions.length - 1
            });
            layerActions.shouldResetSlider(false);
            this.updateDates(map.getLayer(layerKeys.TREE_COVER_LOSS), lossOptions[0].label, lossOptions[lossOptions.length - 1].label);
          }
        }

        if (prevContext.map !== map) {
          const signal = map.on('update-end', () => {
            signal.remove();
            this.updateDates(map.getLayer(layerKeys.TREE_COVER_LOSS), fromYear, toYear);
          });
        }
    }

  }

  componentWillUnmount () {
    clearInterval(this.state.timer);
  }

  updateDates (layer, fromYear, toYear) {
    if (layer && layer.setDateRange) {
      layer.setDateRange(fromYear - 2000, toYear - 2000);
    }
  }

  updateDensity (layer, density) {
    const {lossFromSelectIndex, lossToSelectIndex} = this.props;
    const { settings } = this.context;
    const layerGroups = settings.layerPanel;
    const layerConf = utils.getObject(layerGroups.GROUP_LCD.layers, 'id', this.props.layerId);
    let baseUrl = layerConf.url;
    baseUrl = baseUrl.split('tc')[0] + 'tc';
    baseUrl += density;
    baseUrl += '/{z}/{x}/{y}.png';

    layer.setUrl(baseUrl);
    layer.setDateRange(lossFromSelectIndex, lossToSelectIndex);
  }

  startVisualization = () => {
    const lossSlider = this.lossSlider;
    const layer = this.context.map.getLayer(layerKeys.TREE_COVER_LOSS);
    const start = lossOptions[this.lossSlider.result.from].label - 2000;
    const stop = lossOptions[this.lossSlider.result.to].label - 2000;
    const p_step = lossSlider.coords.p_step;
    const p_handle = lossSlider.coords.p_handle;
    const p = p_step - (p_step / p_handle); // Width of one step of the slider (percent)
    const tooltip = this.refs.sliderTooltip;
    const tooltipValue = lossSlider.result.from_value;
    let range = start;
    let barWidth = 0;
    let tooltipHtml = tooltipValue;

    lossSlider.update({
      to_fixed: true,
      from_fixed: true,
      hide_from_to: true
    });
    // Set an interval to increase the date range every second, then start over when at max range

    const visualizeLoss = () => {

      const sliderBar = document.querySelector('.irs-bar');

      if (range === stop + 1) {
        range = start;
        barWidth = 0;
        tooltipHtml = tooltipValue;
      }

      layer.setDateRange(start, range);
      sliderBar.style.width = `${barWidth}%`;
      const rect = sliderBar.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width - 69}px`; //TODO Figure out a better way to calculate all of the correct values for bar and tooltip
      tooltip.innerHTML = tooltipHtml;
      tooltip.style.display = 'block';
      range++;
      barWidth += p; // increase barWidth by one step length each iteration
      tooltipHtml++;
    };

    const timer = setInterval(visualizeLoss, 1000);

    this.setState({playing: true, timer});
  }

  stopVisualization = () => {
    const fromYear = lossOptions[this.lossSlider.result.from].label;
    const toYear = lossOptions[this.lossSlider.result.to].label;
    this.refs.sliderTooltip.style.display = 'none';

    const layer = this.context.map.getLayer(layerKeys.TREE_COVER_LOSS);

    clearInterval(this.state.timer);
    layer.setDateRange(fromYear - 2000, toYear - 2000);
    this.lossSlider.update({
      to_fixed: false,
      from_fixed: false,
      hide_from_to: false
    });
    layerActions.updateLossTimeline({
      fromSelectedIndex: this.lossSlider.result.from,
      toSelectedIndex: this.lossSlider.result.to
    });
    this.setState({playing: false, timer: null});
  }

  sliderChanged = (data) => {
    const { map } = this.context;
    this.updateDates(map.getLayer(layerKeys.TREE_COVER_LOSS), data.from_value, data.to_value);
    layerActions.updateLossTimeline({
      fromSelectedIndex: this.lossSlider.result.from,
      toSelectedIndex: this.lossSlider.result.to
    });
    this.setState({
      start: lossOptions[this.lossSlider.result.from].label,
      end: lossOptions[this.lossSlider.result.to].label
    });
  }

  render () {
    const {start, end} = this.state;
    const disabled = start === end;
    const disabledStyles = {
      opacity: '.5',
      color: '#aaa',
      cursor: 'default'
    };

    if (lossOptions.length === 0) {
      return <div className='timeline-container loss flex'>loading...</div>;
    }

    return (
      <div className='timeline-container loss'>
        <div className='slider-tooltip' ref='sliderTooltip'></div>
        <div id='loss-slider'></div>
        <div
          id="lossPlayButton"
          className={`${this.state.playing ? ' hidden' : ''}`}
          style={disabled ? disabledStyles : {}}
          onClick={disabled ? null : this.startVisualization}
          title={disabled ? 'Please select a range to view animation' : ''}
        >
          &#9658;
        </div>
        <div id="lossPauseButton" className={`${this.state.playing ? '' : ' hidden'}`} onClick={this.stopVisualization}>&#10074;&#10074;</div>
      </div>
    );
  }
}
