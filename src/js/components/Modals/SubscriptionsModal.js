import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import esriRequest from 'esri/request';
import geojsonUtil from 'utils/arcgis-to-geojson';
import symbols from 'utils/symbols';
import Polygon from 'esri/geometry/Polygon';
import Graphic from 'esri/graphic';
import React, {Component, PropTypes} from 'react';


export default class SubscriptionsModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  subscriptionMap = (subscription, j) => {
    const date = new Date(subscription.attributes.createdAt);
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

    const endDateString = `${date.getFullYear()}-${months}-${dd} ${date.getHours()}:${min}`;
    return (
      <div key={j} className='source-row subscribe-row'>
        <div className='delete-row'>
          <button title='Delete subscription' onClick={evt => this.deleteSubscription(evt, subscription)} className='btn-delete-subscription'>
            <svg className='svg-icon'><use xlinkHref="#icon-analysis-remove" /></svg><span className='delete-row-label'>Delete</span>
          </button>
        </div>
        <div onClick={evt => this.showSubscription(evt, subscription)} className='map-row'>
          <button title='Show on map' className='btn-delete-subscription'>
            <svg className='svg-icon'><use xlinkHref="#shape-world" /></svg>
          </button>
        </div>
        <p className='name-row'>{subscription.attributes.name}</p>
        <p className='other-row'>Date of subscription: {endDateString}</p>
        <div className='other-row'>Data sets: <span>{subscription.attributes.datasets.map(dataset => this.listDataset(dataset, subscription, subscription.attributes.datasets.length))}</span></div>
      </div>
    );
  }

  listDataset = (dataset, subscription, length) => {
    let datasetName;
    switch (dataset) {
      case 'viirs-active-fires':
        datasetName = 'VIIRS active fires alerts';
        break;
      case 'umd-loss-gain':
        datasetName = 'Tree cover loss data';
        break;
      case 'glad-alerts':
        datasetName = 'GLAD tree cover loss alerts';
        break;
      case 'imazon-alerts':
        datasetName = 'SAD tree cover loss alerts';
        break;
      case 'forma-alerts':
        datasetName = 'FORMA active clearing alerts data';
        break;
      case 'terrai-alerts':
        datasetName = 'Terra-i tree cover loss alerts';
        break;
      case 'prodes-loss':
        datasetName = 'PRODES deforestation data';
        break;
      default:
        break;
    }
    if (length > 1) {
      return <p key={dataset}>{datasetName} <svg onClick={() => this.updateSubscription(dataset, subscription)} className='svg-icon delete-dataset'><use xlinkHref="#icon-analysis-remove" /></svg></p>;
    } else {
      return <p key={dataset}>{datasetName}</p>;
    }
  }

  updateSubscription = (dataset, subscription) => {
    subscription.attributes.datasets.splice(subscription.attributes.datasets.indexOf(dataset), 1);

    const jsonData = {
      datasets: subscription.attributes.datasets
    };

    $.ajax({
      url: 'https://production-api.globalforestwatch.org/v1/subscriptions/' + subscription.id,
      type: 'PATCH',
      dataType: 'json',
      data: JSON.stringify(jsonData),
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      },
      success: (response) => {
        const updateSubscriptions = this.props.userSubscriptions.map(subsc => {
          if (response.data.id === subsc.id) {
            return response.data;
          } else {
            return subsc;
          }
        });

        mapActions.setUserSubscriptions(updateSubscriptions);
      },
      error: (error) => {
        console.log('err', error);
      }
    });
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
    //TODO: Add confirm popup!
    // mapActions.toggleSubscriptionsModal({ visible: false });
    mapActions.toggleConfirmModal({ visible: true });

    mapActions.deleteSubscription(subscription);

    // $.ajax({
    //   url: 'https://production-api.globalforestwatch.org/v1/subscriptions/' + subscription.id,
    //   type: 'DELETE',
    //   xhrFields: {
    //     withCredentials: true
    //   },
    //   success: (response) => {
    //     console.log('resppp', response);
    //     const remainingSubscriptions = this.props.userSubscriptions.filter(subsc => subsc.id !== response.data.id);
    //
    //     mapActions.setUserSubscriptions(remainingSubscriptions);
    //   },
    //   error: (error) => {
    //     console.log('err', error);
    //   }
    // });
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
