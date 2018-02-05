import React from 'react';
import {getWMSLegendGraphic} from '../../utils/wmsUtils';

export default class WMSLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfo: '', visible: props.visibility, opacity: props.defaultOpacity };
  }

  componentDidUpdate(prevProps) {

    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }

    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  componentDidMount() {
    const {
      url,
      layerName,
    } = this.props;

    getWMSLegendGraphic(url, layerName).then((res) => {
      if (typeof res === 'object') {
        this.setState({ legendInfo: null });
        return;
      }
      this.setState({ legendInfo: res });
    });
  }

  render () {
    const { visible, legendInfo } = this.state;
    const label = this.props.labels;

    const legend = legendInfo
      ? <img style={{'opacity': this.state.opacity}} title={label} src={legendInfo} />
      : <div>Legend Not Available for layer: {label}</div>;

    return (
      <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref="myRef">
        <div className='label-container'><strong>{label}</strong></div>
        <div className='legend-container'>
          <div className='legend-row'>
            {legend}
          </div>
        </div>
      </div>
    );
  }
}
