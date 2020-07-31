import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mapController } from 'js/controllers/mapController';
import { renderModal } from 'js/store/appState/actions';
// import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { setUserSubscriptions } from 'js/store/mapview/actions';
import { ReactComponent as ShapeWarning } from 'images/shapeWarning.svg';
import { ReactComponent as WorldShape } from 'images/worldShape.svg';
import { ReactComponent as DeleteIcon } from 'images/deleteIcon.svg';
import { format } from 'date-fns';
import { miniMapInit } from 'js/components/leftPanel/dataPanel/subscribeToAlerts/MiniMap';
import Loader from 'js/components/sharedComponents/Loader';

import { geojsonToArcGIS } from 'js/helpers/tempConvert';

import { RootState } from 'js/store/index';
import {
  UserSubscription,
  SubscriptionParams,
  SubscriptionAttributes
} from 'js/store/mapview/types';

import 'css/aoiDashboard.scss';

function formatDate(dateStr: string): string {
  const jsDate = new Date(dateStr);
  return format(jsDate, 'MMM dd yyyy');
}

type aoiData = {
  attributes: {
    admin: any;
    application: string;
    confirmed: boolean;
    createdAt: string;
    datasets: any[];
    deforestationAlerts: boolean;
    email: string;
    fireAlerts: boolean;
    geostore: string;
    iso: any;
    language: string;
    monthlySummary: boolean;
    name: string;
    public: boolean;
    status: string;
    subscriptionId: string;
    tags: string[];
    use: any;
    userId: string;
    wdpaid: any;
    webhookUrl: string;
  };
  id: string;
  type: string;
};

const AOIDashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [data, setData] = useState<aoiData[][]>();
  const [currentPage, setCurrentPage] = useState(0);

  const { userSubscriptions } = useSelector(
    (state: RootState) => state.mapviewState
  );

  function turnPageForwards(): void {
    if (!data) return;
    if (currentPage !== data?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function turnPageBackwards(): void {
    if (!data) return;
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  // interface DatasetAlertsProps {
  //   dataset: string;
  //   datasetLabel: string;
  //   subscription: UserSubscription;
  // }
  // const DatasetAlerts = (props: DatasetAlertsProps): JSX.Element => {
  //   const { subscription, datasetLabel, dataset } = props;

  //   const updateDataset = (): void => {
  //     const jsonData: JSONData = {
  //       datasets: [],
  //       language: subscription.attributes.language,
  //       resource: subscription.attributes.resource,
  //       params: subscription.attributes.params
  //     };
  //     const datasetOn = subscription.attributes.datasets.includes(dataset);

  //     if (datasetOn) {
  //       jsonData.datasets = subscription.attributes.datasets.filter(
  //         datasetID => datasetID !== dataset
  //       );
  //     } else {
  //       subscription.attributes.datasets.push(dataset);
  //       jsonData.datasets = subscription.attributes.datasets;
  //     }

  //     fetch(
  //       `https://production-api.globalforestwatch.org/v1/subscriptions/${subscription.id}`,
  //       {
  //         method: 'PATCH',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(jsonData)
  //       }
  //     )
  //       .then(response => (response.status === 200 ? response.json() : null))
  //       .then(results => {
  //         if (results) {
  //           const copyUserSubscriptions = [...userSubscriptions];
  //           const index = copyUserSubscriptions.findIndex(
  //             u => u.id === results.data.id
  //           );
  //           copyUserSubscriptions[index] = { ...results.data };
  //           dispatch(setUserSubscriptions(copyUserSubscriptions));
  //         } else {
  //           // TODO [ ] - dispatch error UI
  //         }
  //       })
  //       .catch(e => console.log('error in updateDataset()', e));
  //   };

  //   return (
  //     <p className="subscribe-dataset">
  //       {datasetLabel}
  //       <span
  //         onClick={(): void => updateDataset()}
  //         className={`toggle-switch-subscription pointer ${
  //           subscription.attributes.datasets.indexOf(props.dataset) === -1
  //             ? ''
  //             : 'active-subscription'
  //         }`}
  //       >
  //         <span></span>
  //       </span>
  //     </p>
  //   );
  // };

  // interface SubscriptionProps {
  //   subscription: UserSubscription;
  //   userSubscriptions: UserSubscription[];
  // }

  //const SubscriptionDetails = (props: SubscriptionProps): JSX.Element => {
  //  const { subscription, userSubscriptions } = props;

  //  const date = new Date(subscription.attributes.createdAt);
  //  let dd: any = date.getDate();
  //  let months: any = date.getMonth() + 1;
  //  let min: any = date.getMinutes();

  //  if (dd < 10) {
  //    dd = '0' + dd;
  //  }
  //  if (months < 10) {
  //    months = '0' + months;
  //  }
  //  if (min < 10) {
  //    min = '0' + min;
  //  }

  //  const endDateString = `${date.getFullYear()}-${months}-${dd} ${date.getHours()}:${min}`;
  //  //TODO: May need to push into the config
  //  const subscribeUrl = `https://production-api.globalforestwatch.org/v1/subscriptions/${subscription.id}/send_confirmation`;

  //  const zoomToSubscription = async (
  //    subscription: UserSubscription
  //  ): Promise<void> => {
  //    // TODO [ ] - Integrate spinner!
  //    const geostoreID = subscription.attributes.params.geostore;
  //    const countryCode = subscription.attributes.params.iso.country;
  //    const regionCode = subscription.attributes.params.iso.region;
  //    const endPoint = regionCode
  //      ? `${countryCode}/${regionCode}`
  //      : `${countryCode}`;

  //    const geostoreEndpoint = `https://production-api.globalforestwatch.org/v1/geostore/${geostoreID}`;
  //    const countryCodeEndpoint = `https://api.resourcewatch.org/v1/geostore/admin/${endPoint}`;
  //    const specificEndpoint = geostoreID
  //      ? geostoreEndpoint
  //      : countryCodeEndpoint;

  //    await fetch(specificEndpoint)
  //      .then(response => {
  //        if (response.status === 200) {
  //          return response.json();
  //        }
  //      })
  //      .then(results => {
  //        const esriJson = geojsonToArcGIS(results.data.attributes.geojson);
  //        mapController.processGeojson(esriJson);
  //        dispatch(renderModal(''));
  //      })
  //      .catch(e => {
  //        console.log('error in /geostore/ of zoomToSubscription()', e);
  //        console.error('Edge case in zoomToSubscription()!');
  //        /**
  //         * ! Edge cases found via https://www.globalforestwatch.org/my-gfw/subscriptions/new;
  //         * ! Workflow 1. Select an area from a GFW data set / selecting an area by clicking a shape on the map
  //         * ! Workflow 2. Select a country or jurisdiction / creating a subscription with no country selected
  //         */
  //      });
  //  };
  //  const deleteSubscription = (subscriptionID: string): void => {
  //    fetch(
  //      `https://production-api.globalforestwatch.org/v1/subscriptions/${subscriptionID}`,
  //      {
  //        method: 'DELETE',
  //        credentials: 'include'
  //      }
  //    )
  //      .then(response => {
  //        if (response.status === 200) {
  //          const updatedSubscriptions = userSubscriptions.filter(
  //            (s: UserSubscription) => s.id !== subscriptionID
  //          );

  //          dispatch(setUserSubscriptions(updatedSubscriptions));
  //        }
  //      })
  //      .catch(e => {
  //        console.log('error in deleteSubscription()', e);
  //        // TODO [ ] - Need UI error handling logic!
  //      });
  //  };
  //};

  useEffect(() => {
    setLoading(true);
    const baseURL = 'https://production-api.globalforestwatch.org/v2/area';
    const token = localStorage.getItem('userToken');

    if (token) {
      fetch(baseURL, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          const hasError = response.status !== 200;
          response.json().then(data => {
            if (hasError) {
              setLoadingError(true);
              return;
            }
            setLoadingError(false);
            setLoading(false);
            //Put data in paginated chunks so we load only 5 at a time
            const chunks = [];
            while (data.data.length > 0) {
              chunks.push(data.data.splice(0, 5));
            }
            setData(chunks);
          });
        })
        .catch(e => {
          console.error(e);
          setLoadingError(true);
        });
    }
  }, []);

  const ErrorScreen = () => (
    <div style={{ textAlign: 'center', marginTop: '40%', color: 'red' }}>
      Error occured while fetching areas of interest. Refresh the page to try
      again.
    </div>
  );

  const LoadingScreen = () => (
    <Loader
      containerPositionStyling={{
        position: 'absolute',
        top: '40%',
        left: '42%'
      }}
      color={'#cfcdcd'}
      size={100}
    />
  );

  type AOISectionProps = {
    dataObject: aoiData;
  };
  const AOISection = (props: AOISectionProps): JSX.Element => {
    const [esriGeometry, setEsriGeometry] = useState<null | any>(null);
    const webmapID = useSelector(
      (store: RootState) => store.appSettings.webmap
    );
    const miniMap = React.useRef<HTMLDivElement>(null);
    const { name, createdAt, geostore, tags } = props.dataObject.attributes;

    useEffect(() => {
      const geostoreURL =
        'https://production-api.globalforestwatch.org/v1/geostore/';
      async function getGeometryFromGeostore(): Promise<any> {
        fetch(`${geostoreURL}${geostore}`)
          .then(response => response.json())
          .then(data => {
            const esriGeo = geojsonToArcGIS(data.data.attributes.geojson);
            setEsriGeometry(esriGeo[0]);
          })
          .catch(e => console.error(e));
      }
      getGeometryFromGeostore();
    }, []);

    useEffect(() => {
      function initializeMiniMap(): void {
        if (!esriGeometry || !miniMap?.current || !webmapID) return;
        miniMapInit(webmapID, miniMap, esriGeometry.geometry);
      }

      if (esriGeometry) {
        initializeMiniMap();
      }
    }, [esriGeometry]);

    return (
      <div className="aoi-section">
        <p className="area-name">{name}</p>
        <p className="date">{formatDate(createdAt)}</p>
        <div className="map-section">
          <div className="miniMap">
            <div style={{ height: '150px' }} ref={miniMap}></div>
          </div>
          <div className="controls">
            <div>alert section</div>
            <button>view on map</button>
            <button>edit area</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="aoi-dashboard">
      <h3>Dashboard</h3>
      {loadingError && <ErrorScreen />}
      {loading && <LoadingScreen />}
      {!loading && !loadingError && data && (
        <div className="aoi-wrapper">
          {data[currentPage].map((dataObject: aoiData, i: number) => (
            <AOISection key={i} dataObject={dataObject} />
          ))}
          <button onClick={turnPageForwards}>Next</button>
          <button onClick={turnPageBackwards}>Back</button>
          <div>
            Page {currentPage + 1}/{data.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AOIDashboard;
