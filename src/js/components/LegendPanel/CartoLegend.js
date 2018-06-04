import React from 'react';

export default class CartoLegend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: props.legendOpacity || 1
    };
  }

  componentDidUpdate(prevProps) {
    const { legendOpacity, layerId} = this.props;
    if (legendOpacity.layerId === layerId && legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: legendOpacity.value });
    }
  }

  setColor(rgbaColor) {
    const {r, g, b, a} = rgbaColor;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  render () {
    const { layerId, labels, symbol, visible } = this.props;
    const { opacity } = this.state;
    let featureColour = '';
    let featureSize = '15px';
    let featureType = '';

    // Return if we are not looking at the actual layers
    if(layerId !== 'CARTO_TEMPLATE') {

      let geomType = Object.keys(symbol)[0];
      if (geomType === 'multipolygon') { geomType = 'polygon'; }
      if (geomType === 'multipolyline') { geomType = 'polyline'; }

      featureColour = this.setColor(symbol[geomType].color);
      switch(geomType) {
        case ('point'):
          featureType = 'legend-carto-point';
          featureSize = symbol[geomType].size + 'px';
          break;
        case ('polygon'):
          featureType = 'legend-carto-polygon';
          break;
        case ('polyline'):
          featureType = 'legend-carto-line';
          break;
      }
    }

    return (
      <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref="myRef">
        <div className='label-container'>{labels}</div>
          <div className='legend-container'>
            <div
              className={`legend-icon ${featureType}`}
              style={{
                background: featureColour,
                height: featureSize,
                width: featureSize,
                opacity: opacity
              }}/>
          </div>
      </div>
    );
  }
}
