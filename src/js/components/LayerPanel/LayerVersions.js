import React, { Component, PropTypes } from 'react';

export default class LayerVersions extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      versions: props.layer.versions,
      selected: props.layer.versions[0].label
    };
  }

  renderVersionOptions = (version, i) => {
    return <option value={version.label} key={`option-${i}`}>{version.label}</option>;
  }

  onSelectVersion = (e) => {
    const { map } = this.context;
    const { layer } = this.props;
    const mapLayer = map.getLayer(layer.id);
    const selected = e.target.value;

    this.setState({ selected });

    if (layer.type === 'dynamic') {
      const versionObj = this.state.versions.find((version) => version.label === selected);
      mapLayer.layerIds = versionObj.url;
    }
  }

  render () {
    const { layer } = this.props;
    const { versions, selected } = this.state;
    console.log(layer.versions);
    return (
      <div className='layer-versions'>
        <div className='relative'>
          <select onChange={this.onSelectVersion} value={selected}>
            {versions.map(this.renderVersionOptions)}
          </select>
          <div className='fa-button sml white'>{selected}</div>
        </div>
      </div>
    );
  }
}
