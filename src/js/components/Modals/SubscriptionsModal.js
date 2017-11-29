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
    return (
      <div key={j} className='source-row'>
        <p>{subscription.attributes.name}</p>
        <p>Date of subscription: {subscription.attributes.createdAt}</p>
        <p>Data sets:</p>
        <p>{subscription.attributes.datasets.toString()}</p>
        <p className='dataset-zoom' id={subscription.attributes.params.geostore} onClick={this.showSubscription}>View on the map!</p>
      </div>
    );
  }

  showSubscription = evt => {
    const id = evt.target.id;
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

  close = () => {
    mapActions.toggleSubscriptionsModal({ visible: false });
  };

  render () {
    // const {language} = this.context;
    const {userSubscriptions} = this.props;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <p>Subscriptions</p>
        {userSubscriptions.map(this.subscriptionMap)}
      </ControlledModalWrapper>
    );
  }

}
