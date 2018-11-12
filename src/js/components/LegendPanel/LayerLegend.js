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
    this.state = {
      legendInfos: [],
      visible: props.visibleLayers.indexOf(props.layerId) === -1 ? false : true,
      opacity: 1
    };

    this.apiItemMapper = this.apiItemMapper.bind(this);
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
      if (this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });

    this.props.initialLayerOpacities.forEach(opacity => {
      if (opacity.layerId === this.props.layerId) {
        this.setState({ opacity: opacity.value });
      }
    });
  }

  apiItemMapper(legendItems) {
    return legendItems.map((item, i) => {
      return (
        <div className='legend-row' key={`webmap-legend-row-${i}`}>
          <div style={{backgroundColor: item.color, opacity: this.state.opacity}} className='legend-icon'></div>
          <div className='legend-label'>{item.name}></div>
        </div>
      );
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
    const { label, metadata } = this.props;
    const visibility = this.state.visible ? '' : 'hidden';

    if (metadata && metadata.legendConfig) {
      return (
        <div>
          {metadata.legendConfig.items.map((legend, i) => {
            return (
              <div className={`parent-legend-container ${visibility}`} ref='myRef' key={`webmap-legend-${i}`}>
                <div className='label-container'><strong>{legend.name}</strong></div>
                <div className='legend-container'>
                  {legend.categories.length === 0 ? '' :
                    <div className='crowdsource-legend'>
                      {this.apiItemMapper(legend.categories)}
                    </div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className={`parent-legend-container ${visibility}`} ref='myRef'>
        <div className='label-container'><strong>{label}</strong></div>
        {this.state.legendInfos.length === 0 ? '' :
          this.state.legendInfos.map(this.itemMapper)
        }
      </div>
    );
  }
}
