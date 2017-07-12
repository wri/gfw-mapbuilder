import utils from 'utils/AppUtils';
import React from 'react';

export default class CartoLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidUpdate(prevProps) {
    if(this.props.visibleLayers.indexOf(this.props.layerId) > -1 && prevProps.visibleLayers.indexOf(this.props.layerId) === -1) {
      this.setState({ visible: true });
    }
    else if(this.props.visibleLayers.indexOf(this.props.layerId) === -1 && prevProps.visibleLayers.indexOf(this.props.layerId) > -1) {
      this.setState({ visible: false });
    }
  }

  render () {
    let bool = '';
    let label = '';
    let layerConf;

    const layerGroups = this.props.settings.layerPanel;
    layerConf = utils.getObject(layerGroups.GROUP_CARTO.layers, 'id', this.props.layerId);

    if(this.state.visible === false) {
      bool = 'hidden';
    } else {
      bool = '';
      label = layerConf.label[this.props.language];
    }

    return (
      <div className={`parent-legend-container ${bool}`} ref="myRef">
        <div className='label-container'>{label}</div>
        <div className={`legend-container ${bool}`} ref="myRef">
          {
            this.props.title === 0 ? <div className='legend-unavailable'>No Legend</div> :
            <div className='crowdsource-legend'>
              {this.props.label}
            </div>
          }
        </div>
      </div>
    );
  }
}
