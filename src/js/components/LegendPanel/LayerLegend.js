import Request from 'utils/request';
import React, {PropTypes} from 'react';
import utils from 'utils/AppUtils';

export default class LayerLegend extends React.Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: false, opacity: 1 };
  }

  componentDidUpdate(prevProps) {
    if(this.props.visibleLayers.indexOf(this.props.layerId) > -1 && prevProps.visibleLayers.indexOf(this.props.layerId) === -1) {
      this.setState({ visible: true });
    } else if(this.props.visibleLayers.indexOf(this.props.layerId) === -1 && prevProps.visibleLayers.indexOf(this.props.layerId) > -1) {
      this.setState({ visible: false });
    }

    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  componentDidMount() {
    Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  itemMapper = (item, index) => {
    return (
      <div className='legend-container' key={index}>
        <img style={{'opacity': this.state.opacity}} className='legend-symbol' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div>{item.label}</div>
      </div>
    );
  }

  render () {
    const { label } = this.props;
    let bool = '';

    if(this.state.visible === false) {
      bool = 'hidden';
    }

    return (
      <div className={`parent-legend-container ${bool}`} ref="myRef">
        <div className='label-container'><strong>{label}</strong></div>
        {this.state.legendInfos.length === 0 ? '' :
          this.state.legendInfos.map(this.itemMapper)
        }
      </div>
    );
  }
}
