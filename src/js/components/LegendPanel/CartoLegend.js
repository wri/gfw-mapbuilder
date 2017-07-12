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

  setColor(rgbaColor) {
    const {r, g, b, a} = rgbaColor;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  render () {
    let bool = 'hidden';
    let label = '';
    let layerConf;
    let featureColour = '';
    let featureSize = '17px';
    let featureType = '';

    const layerGroups = this.props.settings.layerPanel;
    layerConf = utils.getObject(layerGroups.GROUP_CARTO.layers, 'id', this.props.layerId);

    // Return if we are not looking at the actual layers
    if(layerConf.id !== 'CARTO_TEMPLATE' && layerConf.geomType) {

      let geomType = layerConf.geomType.toLowerCase();
      if(geomType === 'multipolygon') { geomType = 'polygon'; }

      if(this.state.visible === false) {
        bool = 'hidden';
      } else {
        bool = '';
        label = layerConf.label[this.props.language];
      }

      featureColour = this.setColor(layerConf.symbol[geomType].color);

      switch(layerConf.geomType) {
        case ('Point'):
          featureType = 'legend-carto-point';
          featureSize = layerConf.symbol[geomType].size + 'px';
          break;
        case ('MultiPolygon'):
          featureType = 'legend-carto-polygon';
          break;
        case ('PolyLine'):
          featureType = 'legend-carto-line';
          break;
      }
    }

    return (
      <div className={`parent-legend-carto-container ${bool}`} ref="myRef">
        <div className='label-container'>{label}</div>
        <div className={`legend-carto-container ${bool}`} ref="myRef">
          {
            <div className='crowdsource-legend'>
              <div className='legend-row'>
                <div className='legend-icon-container'>
                  <div className={`legend-icon ${featureType}`} style={{ background: featureColour, height: featureSize, width: featureSize }}/>
                  {/*<div className='legend-label'>{label}</div>*/}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
