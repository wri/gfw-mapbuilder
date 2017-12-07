import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import esriRequest from 'esri/request';
import geojsonUtil from 'utils/arcgis-to-geojson';
import symbols from 'utils/symbols';
import Polygon from 'esri/geometry/Polygon';
import Graphic from 'esri/graphic';
import React, {Component, PropTypes} from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class SubscriptionsModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  subscriptionMap = (subscription, j) => {
    const date = new Date(subscription.attributes.createdAt);
    const dayOfWeek = days[ date.getDay() ];
    let dd = date.getDate();
    let months = date.getMonth() + 1;
    let min = date.getMinutes();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (months < 10) {
        months = '0' + months;
    }
    if (min < 10) {
        min = '0' + min;
    }

    const endDateString = `${dayOfWeek}, ${date.getFullYear()}-${months}-${dd} ${date.getHours()}:${min}`;
    return (
      <div key={j} className='source-row'>
        <div className='delete-row'>
          <button onClick={evt => this.deleteSubscription(evt, subscription)} className='btn-delete-subscription'>
            <svg className='svg-icon'><use xlinkHref="#icon-analysis-remove" /></svg><span className='delete-row-label'>Delete</span>
          </button>
        </div>
        <div onClick={evt => this.showSubscription(evt, subscription)} className='map-row'>
          <button className='btn-delete-subscription'>
            <svg className='svg-icon'><use xlinkHref="#shape-world" /></svg>
          </button>
        </div>
        <p>{subscription.attributes.name}</p>
        <p>Date of subscription: {endDateString}</p>
        <p>Data sets:</p>
        <p>{subscription.attributes.datasets.toString()}</p>
      </div>
    );
  }

  showSubscription = (evt, subscription) => {
    const id = subscription.attributes.params.geostore;
    esriRequest({
      url: 'https://production-api.globalforestwatch.org/v1/geostore/' + id,
      callbackParamName: 'callback',
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false}).then(geostoreResult => {
      const esriJson = geojsonUtil.geojsonToArcGIS(geostoreResult.data.attributes.geojson.features[0].geometry);
      const graphic = new Graphic({
        attributes: geostoreResult.data.attributes,
        geostoreId: geostoreResult.data.id,
        geometry: new Polygon(esriJson),
        title: id,
        isCustom: true
      });
      graphic.setSymbol(symbols.getCustomSymbol());
      const graphicExtent = graphic.geometry.getExtent();
      this.context.map.setExtent(graphicExtent, true);
      this.context.map.graphics.add(graphic);
      mapActions.toggleSubscriptionsModal({ visible: false });
    }, err => {
      console.error(err);
    });
  }

  deleteSubscription = (evt, subscription) => {

    $.ajax({
      url: 'https://production-api.globalforestwatch.org/v1/subscriptions/' + subscription.id,
      type: 'DELETE',
      xhrFields: {
        withCredentials: true
      },
      success: (response) => {
        console.log('resppp', response);
        const remainingSubscriptions = this.props.userSubscriptions.filter(subsc => subsc.id !== response.data.id);

        mapActions.setUserSubscriptions(remainingSubscriptions);
      },
      error: (error) => {
        console.log('err', error);
      }
    });
  }

  close = () => {
    mapActions.toggleSubscriptionsModal({ visible: false });
  };

  render () {
    const {userSubscriptions} = this.props;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <p>Subscriptions</p>
        {userSubscriptions.map(this.subscriptionMap)}
      </ControlledModalWrapper>
    );
  }

}
