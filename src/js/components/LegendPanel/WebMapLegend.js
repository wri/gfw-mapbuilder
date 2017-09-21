import Request from 'utils/request';
import React from 'react';

export default class WebMapLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: this.props.visibility };
  }

  componentDidUpdate(prevProps) {

    if (this.props.visibleLayers.indexOf(this.props.layerId) > -1 && prevProps.visibleLayers.indexOf(this.props.layerId) === -1) {
      // console.log(this.props);
      // const layerId = this.props.visibleLayers.filter(visibleLayer => visibleLayer === this.props.layerId);
      // console.log(layerId);
      // if (layerId && layerId.length === 1) {
      //   if (layerId[0].slice(-2) === '_' + this.props.layerSubIndex) {
      //     console.log(layerId[0].substring(layerId[0].length - 2, 0));
      //     const ll = brApp.map.getLayer(layerId[0].substring(layerId[0].length - 2, 0));
      //     console.log(ll.visible);
      //     console.log(ll.visibleLayers);
      //     if (ll.visible && ll.visibleLayers !== [-1]) {
      //       console.log('vissss', ll.id);
      //       this.setState({ visible: true });
      //     }
      //   }
      //
      //   // if (brApp.map.getLayer(this.props.layerId).visible === true) {
      //   //   this.setState({ visible: true });
      //   // }
      // }

      if (this.props.url === 'http://gis.wri.org/server/rest/services/LandMark/indicators_legal_security/MapServer') {
        const indicatorsLayer = brApp.map.getLayer('indicators_legal_security_8140');
        // console.log(this.props);
        // debugger
        //TODO: This never turns back on! --> Our radio buttons don't fire our LegendPanel!!
        if (indicatorsLayer.visible && indicatorsLayer.visibleLayers !== [-1]) {
          this.setState({ visible: true });
        }
      } else {
        this.setState({ visible: true });
      }
    } else if (this.props.visibleLayers.indexOf(this.props.layerId) === -1 && prevProps.visibleLayers.indexOf(this.props.layerId) > -1) {
      this.setState({ visible: false });
    }
  }

  componentDidMount() {
    Request.getLegendInfos(this.props.url, [this.props.layerSubIndex]).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  itemMapper (item, index) {
    return (
      <div className='legend-row' key={index + item.url}>
        <img className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label'>{item.label}</div>
      </div>
    );
  }

  render () {
    let bool = '';
    let label;

    if(this.state.visible === false) {
      bool = 'hidden';
    } else {
      label = this.props.labels;
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
