import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import esriRequest from 'esri/request';
import geojsonUtil from 'utils/arcgis-to-geojson';
import symbols from 'utils/symbols';
import Polygon from 'esri/geometry/Polygon';
import Graphic from 'esri/graphic';
import React, {Component, PropTypes} from 'react';

const initialState = {
  currentStep: 1,
  activeLanguage: 'English', //TODO: Get from context!
  email: '',
  aoiName: '',
  viirsAlerts: false,
  treeCoverAlerts: true,
  warnings: false
};

export default class SubscribeModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  updateEmail = evt => {
    this.setState({
      email: evt.target.value
    });
  }

  updateAreaName = evt => {
    this.setState({
      aoiName: evt.target.value
    });
  }

  optionMapper = (item) => {
    return <option key={item} value={item}>{item}</option>;
  };

  close = () => {
    mapActions.toggleSubscribeModal({ visible: false });
  };

  updateVIIRS = () => {
    this.setState({
      viirsAlerts: !this.state.viirsAlerts
    });
  }

  updateLoss = () => {
    this.setState({
      treeCoverAlerts: !this.state.treeCoverAlerts
    });
  }

  changeLanguage = evt => {
    this.setState({
      activeLanguage: evt.target.value
    });
  }

  next = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }

  back = () => {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }

  refreshSubscriptions = () => {
    $.ajax({
      url: 'https://production-api.globalforestwatch.org/v1/subscriptions',
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: (response) => {
        console.log('resp', response);
        this.setState(initialState);
        mapActions.toggleSubscribeModal({ visible: false });
        mapActions.setUserSubscriptions(response.data);
        mapActions.toggleSubscriptionsModal({ visible: true });
      },
      error: (error) => {
        console.log('err', error);
        this.setState({
          userSubscriptions: []
        });
      }
    });
  }

  save = () => {
    const { email, aoiName, viirsAlerts, treeCoverAlerts } = this.state;
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();

    if (email && aoiName && selectedFeature && (viirsAlerts || treeCoverAlerts)) {
      const datasets = [];
      let lang;
      if (viirsAlerts) {
        datasets.push('viirs-active-fires');
      }
      if (treeCoverAlerts) {
        datasets.push('umd-loss-gain');
      }
      switch (this.state.activeLanguage) {
        case 'English':
          lang = 'en';
          break;
        case '中文':
          lang = 'zh';
          break;
        case 'Français':
          lang = 'fr';
          break;
        case 'Bahasa Indonesia':
          lang = 'id';
          break;
        case 'Português (Brasil)':
          lang = 'pt';
          break;
        case 'Español (Mexico)':
          lang = 'es';
          break;
        default:
          lang = 'en';
      }

      const jsonData = {
        datasets: datasets,
        language: lang,
        name: aoiName,
        params: {
          geostore: selectedFeature.attributes.geostoreId,
          iso: {
            country: null,
            region: null
          },
          use: null,
          useid: null,
          wdpaid: null
        },
        resource: {
          content: this.state.email,
          type: 'EMAIL'
        }
      };

      $.ajax({
        url: 'https://production-api.globalforestwatch.org/v1/subscriptions',
        dataType: 'json',
        method: 'POST',
        data: jsonData,
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          console.log('response', response);
          this.setState({
            currentStep: 0,
            warnings: false,
            success: true
          });
        },
        error: (error) => {
          console.log('errr', error);
        }
      });
    } else {
      this.setState({
        warnings: true
      });
    }
  }

  render () {
    const {language} = this.context;
    const langs = ['English', '中文', 'Français', 'Bahasa Indonesia', 'Português (Brasil)', 'Español (Mexico)']; //TODO: Get from resources or config!

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className={`subscribe-step ${this.state.currentStep === 0 ? '' : 'hidden'}`}>
          <h3>{text[language].SUBSCRIBE_SAVED_TITLE}</h3>
          <p>
            {text[language].SUBSCRIBE_SAVED_DESC}<strong>{text[language].SUBSCRIBE_SAVED_DESC_STRONG}</strong> {text[language].SUBSCRIBE_SAVED_DESC_END} <a href="http://www.globalforestwatch.org/my_gfw/subscriptions" target='_blank'>{text[language].SUBSCRIBE_SAVED_LINK}</a>{text[language].SUBSCRIBE_SAVED_END}
          </p>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 1 ? '' : 'hidden'}`}>
          <h3 className='step-title'>{text[language].SUBSCRIBE_ALERTS_TITLE}</h3>
          <p>{text[language].SUBSCRIBE_ALERTS_SELECT}</p>
          <div className='alert-checkbox'>
            {text[language].SUBSCRIBE_ALERTS_VIIRS}<input className="dataset-checkbox" type="checkbox" checked={this.state.viirsAlerts} onChange={this.updateVIIRS} name="datasets" id="viirs-active-fires" />
            {text[language].SUBSCRIBE_ALERTS_TCL}<input className="dataset-checkbox" type="checkbox" checked={this.state.treeCoverAlerts} onChange={this.updateLoss} name="datasets" id="umd-loss-gain" />
          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 2 ? '' : 'hidden'}`}>
          <h3 className='step-title'>{text[language].SUBSCRIBE_EMAIL_TITLE}</h3>
          <p>{text[language].SUBSCRIBE_EMAIL}</p>
          <div className='alert-checkbox'>
            <input className="alert-input" placeholder='Enter email' onChange={this.updateEmail} />
          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 3 ? '' : 'hidden'}`}>
          <h3 className='step-title'>{text[language].SUBSCRIBE_NAME}</h3>
          <div className='alert-checkbox'>
            <p>Name</p>
            <input className="subscription-name" placeholder='Area name' onChange={this.updateAreaName} />
            <p>Receive Alert Emails In...</p>
            <select className='language-selector' onChange={this.changeLanguage} value={this.state.activeLanguage}>
              {langs.map(this.optionMapper)}
            </select>
          </div>
          <div className={`subscribe-warnings ${this.state.warnings ? '' : 'hidden'}`}>You must have an alert subscription, valid email, and area name!</div>
        </div>
        <div className='subscription-sub-buttons'>
          {this.state.currentStep === 0 ? <button className='fa-button gold' onClick={this.refreshSubscriptions}>OK!</button> : null }
          {this.state.currentStep > 1 ? <button className='fa-button gold' onClick={this.back}>Back</button> : null }
          {this.state.currentStep === 1 || this.state.currentStep === 2 ? <button className='fa-button gold' onClick={this.next}>Next</button> : null }
          {this.state.currentStep === 3 ? <button className='fa-button gold' onClick={this.save}>Save</button> : null }
        </div>

      </ControlledModalWrapper>
    );
  }

}
