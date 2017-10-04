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
    this.state = { legendInfos: [], visible: false };
  }

  componentDidUpdate(prevProps) {
    if(this.props.visibleLayers.indexOf(this.props.layerId) > -1 && prevProps.visibleLayers.indexOf(this.props.layerId) === -1) {
      this.setState({ visible: true });
    } else if(this.props.visibleLayers.indexOf(this.props.layerId) === -1 && prevProps.visibleLayers.indexOf(this.props.layerId) > -1) {
      this.setState({ visible: false });
    }
  }

  componentDidMount() {
    Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  itemMapper (item, index) {
    return (
      <div className='legend-row' key={index}>
        <img className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label' key={index}>{item.label}</div>
      </div>
    );
  }

  render () {
    const { settings, language } = this.context;
    const layerGroups = settings.layerPanel;
    let bool = '';
    let label = '';
    let layerConf;

    if (utils.getObject(layerGroups.GROUP_LC.layers, 'id', this.props.layerId)) {
      layerConf = utils.getObject(layerGroups.GROUP_LC.layers, 'id', this.props.layerId);
    } else if(utils.getObject(layerGroups.GROUP_LCD.layers, 'id', this.props.layerId)) {
      layerConf = utils.getObject(layerGroups.GROUP_LCD.layers, 'id', this.props.layerId);
    }

    if(this.state.visible === false) {
      bool = 'hidden';
    } else {
      label = layerConf.label[language];
    }

    return (
      <div className={`parent-legend-container ${bool}`} ref="myRef">
        <div className='label-container'>{label}</div>
        <div className={`legend-container ${bool}`}>
          {this.state.legendInfos.length === 0 ? '' :
            <div className='crowdsource-legend'>
              {this.state.legendInfos.map(this.itemMapper, this)}
            </div>
          }
        </div>
      </div>
    );
  }
}
