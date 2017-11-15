import React, { PropTypes, Component } from 'react';
import {getUrlParams} from 'utils/params';
import mapStore from 'stores/MapStore';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';

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
      viirsFiresSelectIndex,
      modisFiresSelectIndex,
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
        terraIFrom: terraIStartDate,
        terraITo: terraIEndDate,
        viirsStartDate,
        viirsEndDate,
        modisStartDate,
        modisEndDate,
        viirsFiresSelectIndex,
        modisFiresSelectIndex,
        activeSlopeClass,
        selectedFeature,
        canopyDensity,
        settings
      };

      if (params.appid) {
        payload.appid = params.appid;
      }
      appUtils.generateReport(payload);
    }

  };

  render () {
    const { language, settings } = this.context;

    return (
      <div className='report-sub-buttons'>
        <button className='fa-button gold' onClick={this.printReport}>
          {text[language].PRINT_REPORT}
        </button>
        {!settings.includeSubscribeButton ? null :
          <button className='fa-button gold'>
            {text[language].SUBSCRIBE}
          </button>
        }
      </div>
    );
  }

}
