import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import esriRequest from 'esri/request';
import geojsonUtil from 'utils/arcgis-to-geojson';
import symbols from 'utils/symbols';
import Polygon from 'esri/geometry/Polygon';
import Graphic from 'esri/graphic';
import React, {Component, PropTypes} from 'react';

export default class SubscribeModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      activeLanguage: 'English', //TODO: Get from context!
      email: '',
      aoiName: '',
      viirsAlerts: false,
      treeCoverAlerts: true,
      warnings: false
    };
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

  save = () => {
    const { email, aoiName, viirsAlerts, treeCoverAlerts } = this.state;
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();

    console.log(this.state);

    if (email && aoiName && selectedFeature && (viirsAlerts || treeCoverAlerts)) {
      const datasets = [];
      if (viirsAlerts) {
        datasets.push('viirs-active-fires');
      }
      if (treeCoverAlerts) {
        datasets.push('umd-loss-gain');
      }
      const jsonData = {
        datasets: datasets,
        language: this.state.activeLanguage === 'English' ? 'en' : 'sp', //TODO: Switch statement over all of our possibilities
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

      console.log('jsonData', jsonData);
      $.ajax({
        url: 'https://production-api.globalforestwatch.org/v1/subscriptions',
        dataType: 'json',
        method: 'POST',
        data: jsonData,
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          console.log('resss', response);
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
    // const {language} = this.context;
    const langs = ['English', 'Spanish']; //TODO: Get from resources or config!

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className={`subscribe-step ${this.state.currentStep === 0 ? '' : 'hidden'}`}>
          <h3>Subscription saved!</h3>
          <p>
              This subscription has been added to your profile. <strong>Please
              check your email and click on the link to confirm your
              subscription.</strong> Visit your <a href="http://www.globalforestwatch.org/my_gfw/subscriptions" target='_blank'>saved subscriptions</a> to manage them.
            </p>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 1 ? '' : 'hidden'}`}>
          <p>Forest change alerts</p>
          <p>Select the forest change alerts you would like to receive</p>
          <div className='alert-checkbox'>
            VIIRS active fire alerts<input className="dataset-checkbox" type="checkbox" checked={this.state.viirsAlerts} onChange={this.updateVIIRS} name="datasets" id="viirs-active-fires" />
            Tree cover loss data<input className="dataset-checkbox" type="checkbox" checked={this.state.treeCoverAlerts} onChange={this.updateLoss} name="datasets" id="umd-loss-gain" />

          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 2 ? '' : 'hidden'}`}>
          <p>Subscribe to alerts</p>
          <p>Enter your email below to receive an email notification when there are new annual tree cover loss data available for this area.</p>
          <div className='alert-checkbox'>
            <input className="alert-input" placeholder='Enter email' onChange={this.updateEmail} />
          </div>
        </div>
        <div className={`subscribe-step ${this.state.currentStep === 3 ? '' : 'hidden'}`}>
          <p>Name your subscription</p>
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
          {this.state.currentStep === 0 ? <button className='fa-button gold' onClick={this.next}>OK!</button> : null }
          {this.state.currentStep > 1 ? <button className='fa-button gold' onClick={this.back}>Back</button> : null }
          {this.state.currentStep === 1 || this.state.currentStep === 2 ? <button className='fa-button gold' onClick={this.next}>Next</button> : null }
          {this.state.currentStep === 3 ? <button className='fa-button gold' onClick={this.save}>Save</button> : null }
        </div>

      </ControlledModalWrapper>
    );
  }

}
