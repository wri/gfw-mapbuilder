import React, { PropTypes, Component } from 'react';
import {getUrlParams} from 'utils/params';
import layerKeys from 'constants/LayerConstants';
import mapStore from 'stores/MapStore';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';
import moment from 'moment';
import {defaultColorTheme} from '../../config';

export default class ReportSubscribeButtons extends Component {
  constructor(props) {
    super(props);

    this.descriptionOptions = {
      print: '',
      subscribe: 'Subscribe to receive alerts for the selected area',
    };

    this.state = {
      descriptionText: '',
    };
  }

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  printReport = () => {
    const { map, settings, language } = this.context;
    const selectedFeature = map.infoWindow && map.infoWindow.getSelectedFeature();
    const {
      canopyDensity,
      activeSlopeClass,
      activeLayers,
      dynamicLayers,
      lossFromSelectIndex,
      lossToSelectIndex,
      gladStartDate,
      gladEndDate,
      terraIStartDate,
      terraIEndDate,
      viirsStartDate,
      viirsEndDate,
      modisStartDate,
      modisEndDate,
      activeFilters,
      activeVersions,
      selectedFeatureTitles
    } = mapStore.getState();
    
    if (selectedFeature) {

      const params = getUrlParams(location.href);
      const payload = {
        lang: language,
        activeLayers,
        dynamicLayers,
        tcLossFrom: lossFromSelectIndex,
        tcLossTo: lossToSelectIndex,
        gladFrom: gladStartDate,
        gladTo: gladEndDate,
        terraIFrom: moment(terraIStartDate).format('YYYY-MM-DD'),
        terraITo: moment(terraIEndDate).format('YYYY-MM-DD'),
        viirsStartDate: moment(viirsStartDate).format('YYYY-MM-DD HH:mm:ss'),
        viirsEndDate: moment(viirsEndDate).format('YYYY-MM-DD HH:mm:ss'),
        modisStartDate: moment(modisStartDate).format('YYYY-MM-DD HH:mm:ss'),
        modisEndDate: moment(modisEndDate).format('YYYY-MM-DD HH:mm:ss'),
        activeSlopeClass,
        selectedFeature,
        canopyDensity,
        settings,
        activeFilters: [],
        activeVersions: [],
        selectedFeatureTitles: selectedFeatureTitles
      };

      if (params.appid) {
        payload.appid = params.appid;
      }

      if (selectedFeature._layer && selectedFeature._layer.id && selectedFeature._layer.id !== layerKeys.USER_FEATURES) {
        let layerString = '';

        payload.OBJECTID = selectedFeature && selectedFeature.attributes ? selectedFeature.attributes[selectedFeature._layer.objectIdField] : null;
        payload.OBJECTID_Field = selectedFeature._layer.objectIdField;

        layerString = selectedFeature._layer.url;
        layerString += '--' + selectedFeature._layer.id;

        payload.layerId = layerString;
      }

      if (Object.keys(activeFilters).length) {
        Object.keys(activeFilters).forEach((key) => {
          payload.activeFilters.push(`${key}|${activeFilters[key]}`);
        });
      }

      if (Object.keys(activeVersions).length) {
        Object.keys(activeVersions).forEach((key) => {
          payload.activeVersions.push(`${key}|${activeVersions[key]}`);
        });
      }

      appUtils.generateReport(payload);
    }

  };

  toggleSubscribe = () => {
    mapActions.toggleSubscribeModal({ visible: true });
  }

  updateDescriptionText = (evt) => {
    const { id } = evt.target;
    this.setState({
      descriptionText: this.descriptionOptions[id],
    });
  }

  clearDescriptionText = () => {
    this.setState({
      descriptionText: '',
    });
  }

  render () {
    const { language } = this.context;
    const { descriptionText } = this.state;
    const {
      isLoggedIn
    } = mapStore.getState();
    const { customColorTheme } = this.context.settings;

    return (
      <div className='report-sub-button-container'>
        <div
          className='report-sub-buttons'
        >
          <button
            style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='report-sub-button pointer'
            id='print'
            onClick={this.printReport}
            onMouseEnter={this.updateDescriptionText}
            onMouseLeave={this.clearDescriptionText}
          >
            {text[language].PRINT_REPORT}
            <div className='print-icon' />
          </button>
          {!isLoggedIn ? null :
            <button
              className='report-sub-button pointer left-border-separator'
              id='subscribe'
              onClick={this.toggleSubscribe}
              onMouseEnter={this.updateDescriptionText}
              onMouseLeave={this.clearDescriptionText}
            >
              {text[language].SUBSCRIBE}
              <div className='subscribe-icon' />
            </button>
          }
        </div>
        <div className='button-description-container'>
          <div className='button-description-text'>
            {descriptionText}
          </div>
        </div>
      </div>
    );
  }

}
