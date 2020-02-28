import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { renderModal } from 'js/store/appState/actions';

import { geojsonToArcGIS } from 'js/utils/geojson.config';

import { ReactComponent as ShapeWarning } from 'images/shapeWarning.svg';
import { ReactComponent as WorldShape } from 'images/worldShape.svg';
import { ReactComponent as DeleteIcon } from 'images/deleteIcon.svg';

import { RootState } from 'js/store/index';

//TODO: Investigate if this is exhaustive list or needs to be configed out somehow
const datasetMap = [
  { id: 'viirs-active-fires', label: 'VIIRS active fires alerts' },
  { id: 'umd-loss-gain', label: 'Tree cover loss data' },
  { id: 'glad-alerts', label: 'GLAD tree cover loss alerts' },
  { id: 'imazon-alerts', label: 'SAD tree cover loss alerts' },
  { id: 'forma-alerts', label: 'FORMA active clearing alerts' },
  { id: 'terrai-alerts', label: 'Terra-i tree cover loss alerts' },
  { id: 'prodes-loss', label: 'PRODES deforestation data' }
];

interface SubscriptionAttributes {
  name: string;
  createdAt: string;
  userId: string;
  resource: object;
  datasets: string[];
  params: {
    geostore: any;
    iso: {
      country: string;
      region: string;
    };
  };
  // datasets: Array<string>;
  // resource: {type: "EMAIL", content: "lc07@uw.edu"}
  // datasets: (2) ["umd-loss-gain", "glad-alerts"]
}

interface Subscription {
  attributes: SubscriptionAttributes;
  type: string;
  id: string;
  key: number;
}

const SubscriptionContent: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { userSubscriptions } = useSelector(
    (state: RootState) => state.mapviewState
  );

  interface DatasetAlertsProps {
    dataset: string;
    datasetLabel: string;
    subscription: Subscription;
  }
  const DatasetAlerts = (props: DatasetAlertsProps): JSX.Element => {
    console.log('datasetNamedatasetName', props.datasetLabel);

    const colorTheme = '#929292';
    // const { customColorTheme } = this.context.settings;
    // if (subscription.attributes.datasets.indexOf(dataset) !== -1 && customColorTheme && customColorTheme !== '') {
    //     colorTheme = customColorTheme;
    // } else if (subscription.attributes.datasets.indexOf(dataset) !== -1 && (!customColorTheme || customColorTheme === '')) {
    //     colorTheme = defaultColorTheme;
    // } else {
    //     colorTheme = '#929292';
    // }

    return (
      <p className="subscribe-dataset">
        {props.datasetLabel}
        <span
          onClick={() => console.log('udpate dataset')}
          style={{ backgroundColor: `${colorTheme}` }}
          className={`toggle-switch-subscription pointer ${
            props.subscription.attributes.datasets.indexOf(props.dataset) === -1
              ? ''
              : 'active-subscription'
          }`}
        >
          <span></span>
        </span>
      </p>
    );
  };

  const SubscriptionDetails = (props: any, key: number): any => {
    const { subscription } = props;
    // dispatch
    console.log('subscription in SusbcriptionDeatils;, ', subscription);

    const date = new Date(subscription.attributes.createdAt);
    let dd: any = date.getDate();
    let months: any = date.getMonth() + 1;
    let min: any = date.getMinutes();

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
    //TODO: May need to push into the config
    const subscribeUrl = `https://production-api.globalforestwatch.org/v1/subscriptions/${subscription.id}/send_confirmation`;

    const zoomToSubscription = async (
      subscription: Subscription
    ): Promise<void> => {
      // TODO [ ] - Integrate spinner!
      const geostoreID = subscription.attributes.params.geostore;
      let results;

      if (geostoreID) {
        // * NOTE: original logic
        results = await fetch(
          `https://production-api.globalforestwatch.org/v1/geostore/${geostoreID}`
        )
          .then(response => response.json())
          .catch(e =>
            console.log('error in /geostore/ of zoomToSubscription()', e)
          );
      } else {
        // * NOTE: New logic accounts for when geostoreID is null
        const countryCode = subscription.attributes.params.iso.country;
        const regionCode = subscription.attributes.params.iso.region;
        results = await fetch(
          `https://api.resourcewatch.org/v1/geostore/admin/${countryCode}/${regionCode}`
        )
          .then(response => response.json())
          .catch(e =>
            console.log('error in /geostore/admin/ of zoomToSubscription()', e)
          );
      }

      const esriJson = geojsonToArcGIS(results.data.attributes.geojson);
      mapController.processGeojson(esriJson);
      dispatch(renderModal(''));
    };

    return (
      <div key={key} className="source-row subscribe-row">
        <div className="subscribe-button-container">
          <div className="subscription-unconfirmed">
            <div
              className={`subscription-unconfirmed-wrap ${
                subscription.attributes.confirmed ? 'hidden' : ''
              }`}
            >
              <a href={subscribeUrl} className="subscription-uncle">
                <ShapeWarning height={25} width={25} fill={'#F0AB00'} />
                <span className="subscribe-tooltipmap">
                  Subscription has not been confirmed, click here to resend the
                  confirmation email
                </span>
              </a>
            </div>
            <p
              className={`name-row ${
                subscription.attributes.confirmed ? 'no-warning' : ''
              }`}
            >
              {subscription.attributes.name}
            </p>
          </div>
          <div onClick={() => console.log('shoow')} className="map-row">
            <button
              title="Show on map"
              className="btn-delete-subscription"
              onClick={(): Promise<void> => zoomToSubscription(subscription)}
            >
              <WorldShape height={25} width={25} fill={'#555'} />
            </button>
          </div>
          <div className="delete-row">
            <button
              title="Delete subscription"
              onClick={() => console.log('DeleteDelete')}
              className="btn-delete-subscription"
            >
              <DeleteIcon height={25} width={25} fill={'#555'} />
            </button>
          </div>
        </div>
        <p className="other-row date-created">
          Created on <br />
          {endDateString}
        </p>
        <div className="other-row">
          Data sets:
          <div className="subscribe-datasets">
            {datasetMap.map((dataset, i) => (
              <DatasetAlerts
                key={i}
                dataset={dataset.id}
                datasetLabel={dataset.label}
                subscription={subscription}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Subscriptions</h3>
      <p>
        To add new subscriptions select a feature on the map and click on
        Subscribe in the info window.
      </p>
      {userSubscriptions.map((subscription: any, i: number) => (
        <SubscriptionDetails subscription={subscription} key={i} />
      ))}
    </div>
  );
};

export default SubscriptionContent;
