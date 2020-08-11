import React, { FunctionComponent, useEffect, useState } from 'react';
import Polygon from 'esri/geometry/Polygon';
import { useSelector, useDispatch } from 'react-redux';
import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { ReactComponent as ShapeWarning } from 'images/shapeWarning.svg';
import { ReactComponent as WorldShape } from 'images/worldShape.svg';
import { ReactComponent as DeleteIcon } from 'images/deleteIcon.svg';
import { format, subDays } from 'date-fns';
import { miniMapInit } from 'js/components/leftPanel/dataPanel/subscribeToAlerts/MiniMap';
import Loader from 'js/components/sharedComponents/Loader';

import { RootState } from 'js/store/index';
import {
  SubscriptionParams,
  SubscriptionAttributes
} from 'js/store/mapview/types';

import 'css/aoiDashboard.scss';
import {
  setActiveFeatures,
  setActiveFeatureIndex
} from 'js/store/mapview/actions';
import { renderModal, selectActiveTab } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

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
  const geostoreURL =
    'https://production-api.globalforestwatch.org/v1/geostore/';
  const viirsAlertsURL =
    'https://production-api.globalforestwatch.org/v1/viirs-active-fires';
  // const gladAlertsURL = 'https://production-api.globalforestwatch.org/v1/glad-alerts?aggregate_values=false&period=2018-01-01,2020-08-10&geostore=94be69a5016d7356726b316b702d7b83';
  const gladAlertsURL =
    'https://production-api.globalforestwatch.org/v1/glad-alerts';
  const AOISection = (props: AOISectionProps): JSX.Element => {
    const [esriGeometry, setEsriGeometry] = useState<null | any>(null);
    const [viirsAlers, setViirsAlerts] = useState(0);
    const [gladAlers, setGladAlerts] = useState(0);
    const [attributes, setAttributes] = useState();
    const dispatch = useDispatch();
    const webmapID = useSelector(
      (store: RootState) => store.appSettings.webmap
    );
    const miniMap = React.useRef<HTMLDivElement>(null);
    const { name, createdAt, geostore, tags } = props.dataObject.attributes;

    useEffect(() => {
      async function getGeometryFromGeostore(): Promise<void> {
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

      function fetchAlerts(): void {
        if (!esriGeometry) return;
        const today = new Date();
        const aWeekAgo = subDays(today, 7);
        const params = `?period=${format(aWeekAgo, 'yyyy-MM-dd')},${format(
          today,
          'yyyy-MM-dd'
        )}&geostore=${geostore}`;
        const viirsAnalysisURL = viirsAlertsURL.concat(params);
        const gladAnalysisURL = gladAlertsURL.concat(params);

        fetch(viirsAnalysisURL)
          .then(res => res.json())
          .then(data => {
            setViirsAlerts(data.data.attributes.value);
          })
          .catch(e => console.log(e));

        fetch(gladAnalysisURL)
          .then(res => res.json())
          .then(data => {
            setGladAlerts(data.data.attributes.value);
          })
          .catch(e => console.log(e));
      }

      if (esriGeometry) {
        initializeMiniMap();
        fetchAlerts();
      }
    }, [esriGeometry]);

    function handleViewOnMap(): void {
      const { type, id } = props.dataObject;
      const {
        name,
        createdAt,
        application,
        fireAlerts,
        deforestationAlerts,
        tags,
        confirmed,
        geostore,
        status,
        language
      } = props.dataObject.attributes;
      const aoiAttr = {
        name,
        createdAt,
        confirmed,
        geostore,
        status,
        language,
        type, //type: 'area'
        id,
        tags,
        application,
        fireAlerts,
        deforestationAlerts
      };
      const geometry = {
        ...esriGeometry.geometry,
        type: 'polygon'
      };
      const activeFeature: any = [
        {
          features: [
            {
              attributes: aoiAttr,
              geometry
            }
          ],
          fieldNames: null,
          layerID: 'user_features',
          layerTitle: 'User Features'
        }
      ];
      const poly = new Polygon({
        rings: esriGeometry.geometry.rings,
        spatialReference: esriGeometry.geometry.spatialReference
      });
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(activeFeature));
      mapController.drawGraphic([activeFeature[0].features[0]]);
      mapController._mapview.goTo({ target: poly }, { duration: 1000 });
      dispatch(selectActiveTab('data'));
      dispatch(renderModal(''));
    }

    function handleEditAOI(): void {
      const { type, id } = props.dataObject;
      const {
        name,
        createdAt,
        application,
        fireAlerts,
        deforestationAlerts,
        tags,
        confirmed,
        geostore,
        status,
        language
      } = props.dataObject.attributes;
      const aoiAttr = {
        name,
        createdAt,
        confirmed,
        geostore,
        status,
        language,
        type, //type: 'area'
        id,
        tags,
        application,
        fireAlerts,
        deforestationAlerts
      };
      const activeFeature: any[] = [
        {
          features: [
            {
              attributes: aoiAttr,
              geometry: esriGeometry.geometry
            }
          ],
          fieldNames: null,
          layerID: 'user_features',
          layerTitle: 'User Features'
        }
      ];
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(activeFeature));
      dispatch(renderModal('SaveAOI'));
    }

    return (
      <div className="aoi-section">
        <p className="area-name">{name}</p>
        <p className="date">{formatDate(createdAt)}</p>
        <div className="map-section">
          <div className="miniMap">
            <div style={{ height: '150px' }} ref={miniMap}></div>
          </div>
          <div className="controls">
            <div>
              <p>VIIRS {viirsAlers}</p>
              <p>GLAD {gladAlers}</p>
            </div>
            <button onClick={handleViewOnMap}>view on map</button>
            <button onClick={handleEditAOI}>edit area</button>
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
