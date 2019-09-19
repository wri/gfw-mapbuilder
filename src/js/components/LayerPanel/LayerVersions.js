import React, { Component, PropTypes } from 'react';
import layerFactory from 'utils/layerFactory';
import mapActions from 'actions/MapActions';
import on from 'dojo/on';

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
      selected: null
    };
  }

  componentWillMount() {
    const { layer } = this.props;
    this.setState({ selected: layer.versions[0].label[this.context.language]});
  }

  renderVersionOptions = (version, i) => {
    return <option value={version.label[this.context.language]} key={`option-${i}`}>{version.label[this.context.language]}</option>;
  }

  onSelectVersion = (e) => {
    const { map, language } = this.context;
    const { layer } = this.props;

    const selected = e.target.value;
    const version = this.state.versions.find((v) => v.label[language] === selected);
    const versionIndex = this.state.versions.indexOf(version);
    this.setState({ selected });
    const mapLayer = map.getLayer(layer.id);
    map.removeLayer(mapLayer);

    const newLayer = {};
    const keys = Object.keys(layer);
    keys.forEach((key) => {
      if (key === 'url') {
        newLayer.url = version.url;
      } else if (key === 'layerIds') {
        newLayer.layerIds = version.layerIds;
      } else if (key !== 'esriLayer') {
        newLayer[key] = layer[key];
      }
    });
    // console.log(newLayer.url, newLayer)
    const esriLayer = layerFactory(newLayer, language);

    map.addLayer(esriLayer);
    on.once(esriLayer, 'load', () => {
      newLayer.esriLayer = Object.assign({}, esriLayer);
      mapActions.changeLayerVersion({ id: layer.id, newLayer, versionIndex });
    });

  }

  render () {
    const { versions, selected } = this.state;
    const { layer } = this.props;
    const { language } = this.context;
    const { customColorTheme } = this.context.settings;

    return (
      <div className='relative layer-versions'>
        <p>{layer.versionHeaderText[language]}:</p>
        <select onChange={this.onSelectVersion} value={selected}>
          {versions.map(this.renderVersionOptions)}
        </select>
        <div
          style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : '#F0AB00'}`}}
          className='fa-button sml white'
        >
          {selected}
        </div>
      </div>
    );
  }
}
