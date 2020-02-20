import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store/index';

const datasets = [
  'viirs-active-fires',
  'umd-loss-gain',
  'glad-alerts',
  'imazon-alerts',
  'forma-alerts',
  'terrai-alerts',
  'prodes-loss'
];

interface SubscriptionAttributes {
  name: string;
  createdAt: string;
  userId: string;
  resource: object;
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
  const userSubscriptions = useSelector(
    (state: RootState) => state.mapviewState.userSubscriptions
  );

  const DatasetAlerts = (props: any): any => {
    let datasetName;
    switch (props.dataset) {
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
        datasetName = 'FORMA active clearing alerts';
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
    console.log('datasetNamedatasetName', datasetName);

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
        {datasetName}
        <span
          // onClick={() => this.updateSubscription(dataset, subscription)}
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
    const subscribeUrl = `https://production-api.globalforestwatch.org/v1/subscriptions/${subscription.id}/send_confirmation`;

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
                <svg className="svg-icon subscription-svg">
                  {/* <SVGIcon id={'shape-warning'} /> */}
                </svg>
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
          {/* <div onClick={evt => this.showSubscription(evt, subscription)} className='map-row'> */}
          <div onClick={evt => console.log('shoow')} className="map-row">
            <button title="Show on map" className="btn-delete-subscription">
              {/* <SVGIcon id={'shape-world'} /> */}
            </button>
          </div>
          <div className="delete-row">
            {/* <button title='Delete subscription' onClick={evt => this.deleteSubscription(evt, subscription)} className='btn-delete-subscription'> */}
            <button
              title="Delete subscription"
              onClick={evt => console.log('DeleteDelete')}
              className="btn-delete-subscription"
            >
              {/* <SVGIcon id={'icon-analysis-remove'} /><span className='delete-row-label'>Delete</span> */}
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
            {datasets.map((dataset, j) => (
              <DatasetAlerts
                key={j}
                dataset={dataset}
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
