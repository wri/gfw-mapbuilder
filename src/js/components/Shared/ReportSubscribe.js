import React, { PropTypes, Component } from 'react';
import {getUrlParams} from 'utils/params';
import layerKeys from 'constants/LayerConstants';
import mapStore from 'stores/MapStore';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';
import moment from 'moment';

export default class ReportSubscribeButtons extends Component {

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
      modisEndDate
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
        settings
      };

      if (params.appid) {
        payload.appid = params.appid;
      }

      if (selectedFeature._layer && selectedFeature._layer.id && selectedFeature._layer.id !== layerKeys.USER_FEATURES) {
        let layerString = '';

        payload.OBJECTID = selectedFeature && selectedFeature.attributes ? selectedFeature.attributes.OBJECTID : null;

        layerString = selectedFeature._layer.url;
        layerString += '--' + selectedFeature._layer.id;

        payload.layerId = layerString;

        if (payload.OBJECTID) {
          payload.OBJECTID_Field = 'OBJECTID';
        } else {
          payload.OBJECTID_Field = 'objectid';
          payload.OBJECTID = selectedFeature && selectedFeature.attributes ? selectedFeature.attributes.objectid : null;
        }
      }
      appUtils.generateReport(payload);
    }

  };

  toggleSubscribe = () => {
    mapActions.toggleSubscribeModal({ visible: true });
  }

  render () {
    const { language } = this.context;

    const {
      isLoggedIn
    } = mapStore.getState();

    return (
      <div className='report-sub-buttons'>
        <button className='fa-button gold' onClick={this.printReport}>
          {text[language].PRINT_REPORT}
        </button>
        {!isLoggedIn ? null :
          <button className='fa-button gold' onClick={this.toggleSubscribe}>
            {text[language].SUBSCRIBE}
          </button>
        }
      </div>
    );
  }

}
