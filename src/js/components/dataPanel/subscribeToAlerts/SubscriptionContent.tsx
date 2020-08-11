import React, { useEffect, useState } from 'react';
import Polygon from 'esri/geometry/Polygon';
import { useSelector, useDispatch } from 'react-redux';
import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { format, subDays } from 'date-fns';
import { miniMapInit } from 'js/components/leftPanel/dataPanel/subscribeToAlerts/MiniMap';
import Loader from 'js/components/sharedComponents/Loader';
import { RootState } from 'js/store/index';
import {
  setActiveFeatures,
  setActiveFeatureIndex
} from 'js/store/mapview/actions';
import { renderModal, selectActiveTab } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

import 'css/aoiDashboard.scss';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';
const viirsAlertsURL =
  'https://production-api.globalforestwatch.org/v1/viirs-active-fires';
const gladAlertsURL =
  'https://production-api.globalforestwatch.org/v1/glad-alerts';

function formatDate(dateStr: string): string {
  const jsDate = new Date(dateStr);
  return format(jsDate, 'MMM dd yyyy');
}

function createFeatureObject(aoiDataObject: aoiData, esriGeometry: any): any {
  const { type, id } = aoiDataObject;
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
  } = aoiDataObject.attributes;
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
  const activeFeature: any[] = [
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
  return activeFeature;
}

const ErrorScreen = (): JSX.Element => (
  <div style={{ textAlign: 'center', marginTop: '40%', color: 'red' }}>
    Error occured while fetching areas of interest. Refresh the page to try
    again.
  </div>
);

const LoadingScreen = (): JSX.Element => (
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

const AOIDashboardText = {
  en: {
    created: 'Created',
    glad: 'GLAD alerts',
    viirs: 'VIIRS alerts'
  },
  fr: {
    created: 'Créé le',
    glad: 'Alertes GLAD',
    viirs: 'Alertes VIIRS'
  },
  ka: {
    created: 'Created',
    glad: 'GLAD alerts',
    viirs: 'VIIRS alerts'
  },
  es: {
    created: 'Creado el',
    glad: 'Alertas GLAD',
    viirs: 'Alertas VIIRS'
  },
  pt: {
    created: 'Criado',
    glad: 'Alertas GLAD',
    viirs: 'Alertas VIIRS'
  },
  id: {
    created: 'Dibuat',
    glad: 'Peringatan GLAD',
    viirs: 'Peringatan VIIRS'
  },
  zh: {
    created: '已创建',
    glad: 'GLAD 预警',
    viirs: 'VIIRS 警报'
  }
};

const AOIDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [data, setData] = useState<aoiData[][]>();
  const [currentPage, setCurrentPage] = useState(0);

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
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
        .then(res => {
          res.json().then(data => {
            if (res.status !== 200) {
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

  type AOISectionProps = {
    dataObject: aoiData;
  };

  const AOISection = (props: AOISectionProps): JSX.Element => {
    const [esriGeometry, setEsriGeometry] = useState<null | any>(null);
    const [viirsAlers, setViirsAlerts] = useState(0);
    const [gladAlers, setGladAlerts] = useState(0);
    const dispatch = useDispatch();
    const webmapID = useSelector(
      (store: RootState) => store.appSettings.webmap
    );
    const miniMap = React.useRef<HTMLDivElement>(null);
    const { name, createdAt, geostore } = props.dataObject.attributes;

    //Effect responsible for converting geostore ID to ESRI geometry via API call
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

    //Effect response for fetching viirs and glad alerts for last week using geostoreID
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

    //Sets active feature to the AOI in redux, adds graphic on the map and zooms to the location on the map.
    function handleViewOnMap(): void {
      const featureFromAOIData = createFeatureObject(
        props.dataObject,
        esriGeometry
      );
      const poly = new Polygon({
        rings: esriGeometry.geometry.rings,
        spatialReference: esriGeometry.geometry.spatialReference
      });
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(featureFromAOIData));
      mapController.drawGraphic([featureFromAOIData[0].features[0]]);
      mapController._mapview.goTo({ target: poly }, { duration: 1000 });
      dispatch(selectActiveTab('data'));
      dispatch(renderModal(''));
    }

    function handleEditAOI(): void {
      const featureFromAOIData = createFeatureObject(
        props.dataObject,
        esriGeometry
      );
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(featureFromAOIData));
      dispatch(renderModal('SaveAOI'));
    }

    return (
      <div className="aoi-section">
        <div className="name-section">
          <p className="area-name">{name}</p>
          <p className="date">
            {AOIDashboardText[selectedLanguage].created} {formatDate(createdAt)}
          </p>
        </div>
        <div className="map-section">
          <div className="miniMap">
            <div style={{ height: '147px' }} ref={miniMap}></div>
          </div>
          <div className="controls">
            <div className="alert-section">
              <p>{"Last week's alerts:"}</p>
              <p className="viirs">
                {AOIDashboardText[selectedLanguage].viirs} {viirsAlers}
              </p>
              <p className="glad">
                {AOIDashboardText[selectedLanguage].glad} {gladAlers}
              </p>
            </div>
            <div className="map-btns">
              <button className="map" onClick={handleViewOnMap}>
                view on map
              </button>
              <button className="edit" onClick={handleEditAOI}>
                edit area
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="aoi-dashboard">
      <h3>My GFW Areas</h3>
      {loadingError && <ErrorScreen />}
      {loading && <LoadingScreen />}
      {!loading && !loadingError && data && (
        <div className="aoi-wrapper">
          {data[currentPage].map((dataObject: aoiData, i: number) => (
            <AOISection key={i} dataObject={dataObject} />
          ))}
          <div>
            <button className="back-btn" onClick={turnPageBackwards}>
              Back
            </button>
            <button className="next-btn" onClick={turnPageForwards}>
              Next
            </button>
          </div>
          <div style={{ fontSize: '0.8rem' }}>
            Page {currentPage + 1}/{data.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AOIDashboard;
