import Request from 'utils/request';
import React from 'react';

export default class WebMapLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: this.props.visibility, opacity: props.defaultOpacity };
  }

  componentDidUpdate(prevProps) {

    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }
    console.log(this.props.layerId);
    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      debugger;
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  componentDidMount() {

    if (this.props.url) {

      Request.getLegendInfos(this.props.url, [this.props.layerSubIndex]).then(legendInfos => {
        if (this.refs.myRef) {
          this.setState({ legendInfos: legendInfos });
        }
      });
    } else {
      this.setState({legendInfos: null});
    }
  }

  customLegend(item, index) {
    return (
      <div className='legend-row' key={index}>
        <div className='legend-icon' style={{backgroundColor: item.color}}></div>
        <div className='legend-label'>{item.label}</div>
      </div>
    );
  }

  itemMapper = (item, index) => {
    return (
      <div className='legend-row' key={index + item.url}>
        <img style={{'opacity': this.state.opacity}} className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
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
        <div className={`label-container ${label ? '' : 'hidden'}`}><strong>{label}</strong></div>
        <div className={`legend-container ${bool}`}>
          {this.state.legendInfos === null || this.state.legendInfos.length === 0
            ? '' :
            <div className='crowdsource-legend'>
              {this.state.legendInfos.map(this.itemMapper, this)}
            </div>
          }
          {this.state.legendInfos === null
            ?
            <div className='crowdsource-legend'>
              {this.props.legendConfig ? this.props.legendConfig.map(this.customLegend, this) : null}
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}
