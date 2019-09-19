import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import {esriType} from 'constants/AppConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import Search from 'esri/dijit/Search';
import FeatureLayer from 'esri/layers/FeatureLayer';
import InfoTemplate from 'esri/InfoTemplate';
import {defaultColorTheme} from '../../config';
import React, {
  Component,
  PropTypes
} from 'react';

export default class SearchModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    webmapInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
      buttonHover: false
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {map, webmapInfo, language} = this.context;
    const layers = webmapInfo.operationalLayers;
    let sources = [];

    if (map.loaded && !prevContext.map.loaded && webmapInfo) {
      this.createSearchWidget(map);

      if (this.searchWidget) {
        if (layers && layers.length) {
          layers.forEach((layer) => {
            // If this is a dynamic layer
            if (layer.layerType === esriType.DYNAMIC) {
              // If we have layer infos in a dynamic layer, push each one into the sources array
              if (
                layer.layerObject
                && layer.layerObject.layerInfos
                && layer.layerObject.layerInfos.length
              ) {
                sources = sources.concat(layer.layerObject.layerInfos.map((info) => ({
                  featureLayer: new FeatureLayer(`${layer.url}/${info.id}`, {
                    infoTemplate: new InfoTemplate('', `<div class="search__info-window-callout">${text[language].SEARCH_CLICK_FOR_MORE}</div>`)
                  }),
                  name: info.name,
                  maxResults: 6,
                  maxSuggestions: 6,
                  enableSuggestions: true,
                  minCharacters: 2,
                  outFields: ['*'],
                  exactMatch: false,
                  placeholder: info.name
                })));
              }
            } else if (layer.layerType === esriType.FEATURE) {
              if (layer.layerObject) {
                sources.push({
                  featureLayer: layer.layerObject,
                  name: layer.title,
                  maxResults: 6,
                  maxSuggestions: 6,
                  enableSuggestions: true,
                  minCharacters: 2,
                  outFields: ['*'],
                  exactMatch: false,
                  placeholder: layer.title
                });
              }
            }
          });
        }
        const defaultSources = this.searchWidget.get('sources');
        sources = sources.concat(defaultSources);
        this.searchWidget.set('sources', sources);
      }
    }
  }

  createSearchWidget = (map) => {
    this.searchWidget = new Search({
      map: map,
      enableHighlight: false,
      showInfoWindowOnSelect: true
    }, this.refs.searchNode);

    this.searchWidget.startup();
  };

  decimalDegreeSearch = () => {
    const values = [this.refs.decimalDegreeLat.value, this.refs.decimalDegreeLng.value].map(parseFloat);
    const [lat, lng] = values;
    if (values.map(isNaN).indexOf(true) > -1) { throw Error('Invalid input(s)'); }
    this.onClose();
    mapActions.centerAndZoomLatLng(lat, lng);
  };

  onClose = () => {
    mapActions.toggleSearchModal({ visible: false });
  };
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render () {
    const {language} = this.context;
    const { customColorTheme } = this.context.settings;
    const {buttonHover} = this.state;
    
    return (
      <ControlledModalWrapper onClose={this.onClose}>
        <div className='deg-box'>
          <span>Lat:</span><input ref='decimalDegreeLat' type='number' className='deg-input' id='deg-lat' name='deg-lat' />
        </div>
        <div className='deg-box'>
          <span>Lon:</span><input ref='decimalDegreeLng' type='number' className='deg-input' id='deg-lng' name='deg-lng' />
        </div>
        <button
          style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
          {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='search-submit-button fa-button color'
          onClick={this.decimalDegreeSearch}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          Search
        </button>
        <div className='search-widget-label'>
          {text[language].SEARCH_WIDGET_TITLE}
        </div>
        <div id='search-widget' ref='searchNode' className='search-widget'></div>
      </ControlledModalWrapper>
    );
  }
}
