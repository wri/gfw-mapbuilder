import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { ReactComponent as ShapeWarning } from 'images/shapeWarning.svg';
import { ReactComponent as WorldShape } from 'images/worldShape.svg';
import { ReactComponent as DeleteIcon } from 'images/deleteIcon.svg';
import { format } from 'date-fns';
import { miniMapInit } from 'js/components/leftPanel/dataPanel/subscribeToAlerts/MiniMap';
import Loader from 'js/components/sharedComponents/Loader';

import { geojsonToArcGIS } from 'js/helpers/tempConvert';

import { RootState } from 'js/store/index';
import {
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
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [data, setData] = useState<aoiData[][]>();
  const [currentPage, setCurrentPage] = useState(0);

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
            <div>alert section last weeks alerts only GLAD and VIIRS</div>
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
