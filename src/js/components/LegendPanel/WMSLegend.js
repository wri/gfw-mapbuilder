import React from 'react';
import {getWMSLegendGraphic} from '../../utils/wmsUtils';

export default class WMSLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      legendInfo: '',
      visible: props.visibility,
      opacity: props.defaultOpacity,
      error: ''
    };
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
      version,
    } = this.props;

    getWMSLegendGraphic(url, layerName, version).then((res) => {
      if (typeof res === 'object') {
        this.setState({
          legendInfo: null,
          error: res.error,
        });
        return;
      }
      this.setState({ legendInfo: res });
    });
  }

  render () {
    const { visible, legendInfo, error } = this.state;
    const label = this.props.labels;

    const legend = legendInfo
      ? <img style={{ opacity: this.state.opacity }} title={label} src={legendInfo} />
      : <div style={{ color: 'red', fontSize: '12px' }}>Legend Not Available: {error}</div>;

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
