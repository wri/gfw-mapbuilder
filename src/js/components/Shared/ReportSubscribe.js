import React, { PropTypes, Component } from 'react';
import analysisKeys from 'constants/AnalysisConstants';
import {getUrlParams} from 'utils/params';
import mapStore from 'stores/MapStore';
import IdentifyTask from 'esri/tasks/IdentifyTask';
import IdentifyParameters from 'esri/tasks/IdentifyParameters';
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
        activeLayers: activeLayers,
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

  getTextContent = graphic => {
    const gisArea = graphic.feature.attributes.Area_GIS && graphic.feature.attributes.Area_GIS !== 'Null' ? parseFloat(graphic.feature.attributes.Area_GIS).toFixed(2) : '0.00';
    if (graphic.feature.attributes.Identity === 'Indigenous (self-identified)') {
        graphic.feature.attributes.Identity = 'Indigenous';
    }
    if (graphic.feature.attributes.Identity === 'Non-indigenous (self-identified)') {
        graphic.feature.attributes.Identity = 'Community';
    }
    if (graphic.feature.attributes.Form_Rec === 'Officially recognized (by law or decree)') {
        graphic.feature.attributes.Form_Rec = 'Officially recognized';
    }

    const fieldValues = [graphic.feature.attributes.Country, graphic.feature.attributes.Name, graphic.feature.attributes.Identity, graphic.feature.attributes.Form_Rec, graphic.feature.attributes.Doc_Status, gisArea];
    brApp.csv += fieldValues.join(',') + '\n';
  }

  launchLandmarkAnalysis = () => {
    const { map } = this.context;
    const selectedFeature = map.infoWindow && map.infoWindow.getSelectedFeature();

    this.props.setLoader({
      isLoading: true
    });

    const identifyTask = new IdentifyTask('http://gis.wri.org/server/rest/services/LandMark/comm_analysis/MapServer');
    const params = new IdentifyParameters();

    params.tolerance = 3;
    params.returnGeometry = false;
    params.layerIds = [0, 1];
    params.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
    params.mapExtent = brApp.map.extent;
    params.width = brApp.map.width;
    params.height = brApp.map.height;
    params.geometry = selectedFeature.geometry;

    identifyTask.execute(params, features => {
      this.props.setLoader({
        isLoading: false,
        error: false
      });

      if (features.length > 0) {
        const fields = ['Country', 'Name', 'Identity', 'Recognition Status', 'Documentation Status', 'GIS Area'];

        brApp.csv = fields.join(',') + '\n';

        for (let i = 0; i < features.length; i++) {
          this.getTextContent(features[i]);
        }

        const payload = {
          features: features,
          csv: brApp.csv
        };
        console.log('payload', payload);

        const openWindow = window.open('/map/analysis/');

        if (!openWindow || typeof openWindow === 'undefined') {
          alert('Turn off your pop-up blocker!');
          openWindow.payload = payload;
        } else {
          openWindow.payload = payload;
        }
      }
    }, error => {
      console.log('err', error);
      this.props.setLoader({
        isLoading: false,
        error: true
      });
    });

  }

  render () {
    const { language } = this.context;
    const { activeAnalysisType } = mapStore.getState();

    return (
      <div className='report-sub-buttons'>
        <div className='report-sub-button'>
          <button className='fa-button gold' onClick={this.printReport}>
            {text[language].PRINT_REPORT}
          </button>
        </div>
        <div className='report-sub-button'>
          <button className={`fa-button gold ${activeAnalysisType === analysisKeys.COMMODITIES ? '' : ' hidden'}`} onClick={this.launchLandmarkAnalysis}>
          Indigenous Lands Report
          </button>
        </div>
      </div>
    );
  }

}
