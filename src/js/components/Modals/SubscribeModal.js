import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {Component, PropTypes} from 'react';
import {defaultColorTheme} from '../../config';

const initialState = {
  currentStep: 1,
  activeLanguage: 'English', //TODO: Get from context!
  email: '',
  aoiName: '',
  viirsAlerts: false,
  treeCoverAlerts: true,
  gladAlerts: false,
  sadAlerts: false,
  formaAlerts: false,
  terraI: false,
  prodes: false,
  warnings: false,
  buttonHover: false
};

export default class SubscribeModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
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

  updateGLAD = () => {
    this.setState({
      gladAlerts: !this.state.gladAlerts
    });
  }

  updateSAD = () => {
    this.setState({
      sadAlerts: !this.state.sadAlerts
    });
  }

  updateForma = () => {
    this.setState({
      formaAlerts: !this.state.formaAlerts
    });
  }

  updateTerraI = () => {
    this.setState({
      terraI: !this.state.terraI
    });
  }

  updateProdes = () => {
    this.setState({
      prodes: !this.state.prodes
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
    fetch(
      'https://production-api.globalforestwatch.org/v1/subscriptions',
      {
        credentials: 'include'
      }
    ).then(response => {
      let hasError = false;
      if (response.status !== 200) {
        hasError = true;
        this.setState({
          userSubscriptions: []
        });
      }

      response.json().then(json => {
        if (hasError) {
          console.error(json);
          return;
        }
        this.setState(initialState);
        mapActions.toggleSubscribeModal({ visible: false });
        mapActions.setUserSubscriptions(json.data);
        mapActions.toggleSubscriptionsModal({ visible: true });
      });
    });
  }

  save = () => {
    const { email, aoiName, viirsAlerts, treeCoverAlerts, gladAlerts, sadAlerts, formaAlerts, terraI, prodes } = this.state;
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();

    if (email && aoiName && selectedFeature && (viirsAlerts || treeCoverAlerts || gladAlerts || sadAlerts || formaAlerts || terraI || prodes)) {

      const datasets = [];
      let lang;
      if (viirsAlerts) {
        datasets.push('viirs-active-fires');
      }
      if (treeCoverAlerts) {
        datasets.push('umd-loss-gain');
      }
      if (gladAlerts) {
        datasets.push('glad-alerts');
      }
      if (sadAlerts) {
        datasets.push('imazon-alerts');
      }
      if (formaAlerts) {
        datasets.push('forma-alerts');
      }
      if (terraI) {
        datasets.push('terrai-alerts');
      }
      if (prodes) {
        datasets.push('prodes-loss');
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
        confirmed: selectedFeature.attributes.confirmed,
        createdAt: selectedFeature.attributes.createdAt,
        datasets: datasets,
        datasetsQuery: selectedFeature.attributes.datasetsQuery,
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
        },
        userId: selectedFeature.attributes.userId
      };

      fetch(
        'https://production-api.globalforestwatch.org/v1/subscriptions',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        }
      ).then(response => {
        let hasError = false;
        if (response.status !== 200) {
          hasError = true;
        }

        response.json().then(json => {
          if (hasError) {
            console.error(json);
            return;
          }
          this.setState({
            currentStep: 0,
            warnings: false,
            success: true
          });
        });
      });
    } else {
      this.setState({
        warnings: true
      });
    }
  }
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render () {
    const {language} = this.context;
    const langs = ['English', '中文', 'Français', 'Bahasa Indonesia', 'Português (Brasil)', 'Español (Mexico)']; //TODO: Get from resources or config!
    const { customColorTheme } = this.context.settings;
    const {buttonHover} = this.state;
    
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
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.viirsAlerts} onChange={this.updateVIIRS} />
                {text[language].SUBSCRIBE_ALERTS_VIIRS}
              </label>
            </div>
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.treeCoverAlerts} onChange={this.updateLoss} />
                {text[language].SUBSCRIBE_ALERTS_TCL}
              </label>
            </div>

            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.gladAlerts} onChange={this.updateGLAD} />
                GLAD tree cover loss alerts
              </label>
            </div>
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.sadAlerts} onChange={this.updateSAD} />
                SAD tree cover loss alerts
              </label>
            </div>
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.formaAlerts} onChange={this.updateForma} />
                FORMA alerts data
              </label>
            </div>
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.terraI} onChange={this.updateTerraI} />
                Terra-i tree cover loss alerts
              </label>
            </div>
            <div className='custom-checkbox'>
              <label>
                <input className="dataset-checkbox" type="checkbox" checked={this.state.prodes} onChange={this.updateProdes} />
                PRODES deforestation data
              </label>
            </div>
          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 2 ? '' : 'hidden'}`}>
          <h3 className='step-title'>{text[language].SUBSCRIBE_EMAIL_TITLE}</h3>
          <p>{text[language].SUBSCRIBE_EMAIL}</p>
          <div className='alert-email'>
            <input className="alert-input" placeholder='Enter email' value={this.state.email} onChange={this.updateEmail} />
          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 3 ? '' : 'hidden'}`}>
          <h3 className='step-title'>{text[language].SUBSCRIBE_NAME}</h3>
          <div className='alert-email-settings'>
            <label>
              Name
              <input className="alert-input" placeholder='Area name' value={this.state.aoiName} onChange={this.updateAreaName} />
            </label>
            <label>
              Receive Alert Emails In...
              <select className='alert-dropdown' onChange={this.changeLanguage} value={this.state.activeLanguage}>
                {langs.map(this.optionMapper)}
              </select>
            </label>
          </div>
          <div className={`subscribe-warnings ${this.state.warnings ? '' : 'hidden'}`}>You must have an alert subscription, valid email, and area name!</div>
        </div>
        <div className='subscription-sub-buttons'>
          {this.state.currentStep === 0 ?
          <button
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button color'
            onClick={this.refreshSubscriptions}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            OK!
          </button> : null }
          {this.state.currentStep > 1 ?
          <button
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button color'
            onClick={this.back}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            Back
          </button> : null }
          {this.state.currentStep === 1 || this.state.currentStep === 2 ?
          <button
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button color'
            onClick={this.next}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            Next
          </button> : null }
          {this.state.currentStep === 3 ?
          <button
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button color'
            onClick={this.save}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            Save
          </button> : null }
        </div>

      </ControlledModalWrapper>
    );
  }

}
