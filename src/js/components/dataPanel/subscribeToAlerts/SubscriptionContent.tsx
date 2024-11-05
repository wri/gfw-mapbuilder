import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PrintIcon } from '../../../../images/printIcon';
import Polygon from '@arcgis/core/geometry/Polygon';
import { getShareableURL } from '../../../../js/helpers/shareFunctionality';
import { geojsonToArcGIS } from '../../../../js/helpers/spatialDataTransformation';
import { format, subDays } from 'date-fns';
import Loader from '../../../../js/components/sharedComponents/Loader';
import { RootState } from '../../../../js/store/index';
import { setActiveFeatures, setActiveFeatureIndex } from '../../../../js/store/mapview/actions';
import {
  AOIDashboardText,
  myGFWContentConfig,
} from '../../../../../configs/translations/subscribeToAlerts.translations';
import { renderModal, selectActiveTab } from '../../../../js/store/appState/actions';
import { mapController } from '../../../../js/controllers/mapController';
import { generateMinimaps } from './generateMinimaps';

import '../../../../css/aoiDashboard.scss';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';
const viirsAlertsURL = 'https://production-api.globalforestwatch.org/v1/viirs-active-fires';
const gladAlertsURL = 'https://production-api.globalforestwatch.org/v1/glad-alerts';

function formatDate(dateStr: string): string {
  const jsDate = new Date(dateStr);
  return format(jsDate, 'MMM dd yyyy');
}

type EsriGeometryObject = {
  attributes: {};
  geometry: {
    rings: number[][][];
    spatialReference: any;
  };
};

function createFeatureObject(aoiDataObject: aoiData, esriGeometry: EsriGeometryObject): any {
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
    language,
    monthlySummary,
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
    deforestationAlerts,
    monthlySummary,
  };
  const geometry = {
    ...esriGeometry.geometry,
    type: 'polygon',
  };
  const activeFeature: any[] = [
    {
      features: [
        {
          attributes: aoiAttr,
          geometry,
        },
      ],
      fieldNames: null,
      layerID: 'user_features',
      layerTitle: 'User Features',
    },
  ];
  return activeFeature;
}

const ErrorScreen = (): JSX.Element => (
  <div style={{ textAlign: 'center', marginTop: '40%', color: 'red' }}>
    Error occured while fetching areas of interest. Refresh the page to try again.
  </div>
);

const LoadingScreen = (): JSX.Element => (
  <Loader
    containerPositionStyling={{
      position: 'absolute',
      top: '40%',
      left: '42%',
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

type AOISectionProps = {
  dataObject: aoiData;
};

const AOIDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [data, setData] = useState<aoiData[][]>();
  const [currentPage, setCurrentPage] = useState(0);

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

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
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          res.json().then(async (areaRes) => {
            if (res.status !== 200) {
              setLoadingError(true);
              return;
            }
            setLoadingError(false);
            setLoading(false);
            const userAreas = areaRes.data;
            //Put data in paginated chunks so we load only 5 at a time
            await generateMinimaps(userAreas);
            const chunks: any[] = [];
            while (areaRes.data.length > 0) {
              chunks.push(areaRes.data.splice(0, 5));
            }
            setData(chunks);
          });
        })
        .catch((e) => {
          console.error(e);
          setLoadingError(true);
        });
    }
    return (): void => {
      const mapHelper = document.getElementById('minimap-print');
      mapHelper?.remove();
    };
  }, []);

  const AOISection = (props: AOISectionProps): JSX.Element => {
    const [esriGeometry, setEsriGeometry] = useState<null | EsriGeometryObject>(null);
    const [viirsAlers, setViirsAlerts] = useState(0);
    const [gladAlers, setGladAlerts] = useState(0);
    const [mapLoading, setMapLoading] = useState(true);
    const dispatch = useDispatch();
    const webmapID = useSelector((store: RootState) => store.appSettings.webmap);
    const { areaImages } = useSelector((store: RootState) => store.appState);
    const miniMap = React.useRef<HTMLImageElement>(null);
    const { name, createdAt, geostore } = props.dataObject.attributes;

    useEffect(() => {
      const areaID = areaImages.find((id) => id === props.dataObject.id);

      if (areaID && miniMap.current) {
        const uri = localStorage.getItem(`areaID-${areaID}`);
        if (!uri) return;
        setMapLoading(false);
        miniMap.current.src = uri;
      }
    }, [areaImages.length, props.dataObject.id, areaImages]);

    //Effect responsible for converting geostore ID to ESRI geometry via API call
    useEffect(() => {
      async function getGeometryFromGeostore(): Promise<void> {
        fetch(`${geostoreURL}${geostore}`)
          .then((response) => response.json())
          .then((data) => {
            const esriGeo = geojsonToArcGIS(data.data.attributes.geojson);
            setEsriGeometry(esriGeo[0]);
          })
          .catch((e) => console.error(e));
      }
      getGeometryFromGeostore();
    }, []);

    //Effect for fetching viirs and glad alerts for last week using geostoreID
    useEffect(() => {
      function fetchAlerts(): void {
        if (!esriGeometry) return;
        const today = new Date();
        const aWeekAgo = subDays(today, 7);
        const params = `?period=${format(aWeekAgo, 'yyyy-MM-dd')},${format(today, 'yyyy-MM-dd')}&geostore=${geostore}`;
        const viirsAnalysisURL = viirsAlertsURL.concat(params);
        const gladAnalysisURL = gladAlertsURL.concat(params);

        fetch(viirsAnalysisURL)
          .then((res) => res.json())
          .then((data) => {
            setViirsAlerts(data.data.attributes.value);
          })
          .catch((e) => console.log(e));

        fetch(gladAnalysisURL)
          .then((res) => res.json())
          .then((data) => {
            setGladAlerts(data.data.attributes.value);
          })
          .catch((e) => console.log(e));
      }

      if (esriGeometry) {
        fetchAlerts();
      }
    }, [esriGeometry]);

    //Sets active feature to the AOI in redux, adds graphic on the map and zooms to the location on the map.
    async function handleViewOnMap(): Promise<void> {
      if (!esriGeometry) return;
      const featureFromAOIData = createFeatureObject(props.dataObject, esriGeometry);
      const poly = new Polygon({
        rings: esriGeometry.geometry.rings,
        spatialReference: esriGeometry.geometry.spatialReference,
      });
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(featureFromAOIData));
      await mapController.drawGraphic([featureFromAOIData[0].features[0]]);
      mapController._mapview?.goTo({ target: poly }, { duration: 1000 });
      dispatch(selectActiveTab('data'));
      dispatch(renderModal(''));
    }

    function handleEditAOI(): void {
      if (!esriGeometry) return;
      const featureFromAOIData = createFeatureObject(props.dataObject, esriGeometry);
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(featureFromAOIData));
      dispatch(renderModal('SaveAOI'));
    }

    async function printReport(): Promise<void> {
      if (!esriGeometry) return;
      const featureFromAOIData = createFeatureObject(props.dataObject, esriGeometry);
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures(featureFromAOIData));
      const appID = new URL(window.location.href).searchParams.get('appid');
      const baseURL = new URL(window.location.href);
      let combinedReportURL = baseURL.origin + baseURL.pathname;
      const stateUrl = await getShareableURL({ report: true });
      combinedReportURL = appID
        ? combinedReportURL + '?' + 'appid=' + appID + '&' + stateUrl
        : combinedReportURL + '?' + stateUrl;
      window.open(combinedReportURL);
    }

    return (
      <div className="aoi-section">
        <div className="map-section">
          <div className="miniMap">
            <div style={{ height: '120px' }}>
              {mapLoading && (
                <div style={{ height: '120px', width: '160px' }}>
                  <Loader
                    containerPositionStyling={{
                      position: 'relative',
                      top: '30%',
                    }}
                    color={'#cfcdcd'}
                    size={50}
                  />
                </div>
              )}
              <img
                src=""
                style={{
                  height: '120px',
                  width: '160px',
                  visibility: mapLoading ? 'hidden' : 'visible',
                }}
                ref={miniMap}
              />
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          <div className="controls">
            <div className="name-section">
              <p className="area-name">{name}</p>
              <p className="date">
                {AOIDashboardText[selectedLanguage].created} {formatDate(createdAt)}
              </p>
            </div>
            <div className="alert-section">
              <p className="title">{myGFWContentConfig[selectedLanguage].alertsTitle}</p>
              <p className="viirs">
                {AOIDashboardText[selectedLanguage].viirs} {viirsAlers}
              </p>
              <p className="glad">
                {AOIDashboardText[selectedLanguage].glad} {gladAlers}
              </p>
            </div>
          </div>
          <div className="map-btns">
            <button className="map" onClick={handleViewOnMap}>
              {myGFWContentConfig[selectedLanguage].button1}
            </button>
            <button className="edit" onClick={handleEditAOI}>
              {myGFWContentConfig[selectedLanguage].button2}
            </button>
            <button className="print" onClick={printReport}>
              <PrintIcon height={15} width={15} fill={'#f0ab00'} />
              <p>{myGFWContentConfig[selectedLanguage].button3}</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NoAreasScreen = (): JSX.Element => {
    return (
      <div className="no-areas-section">
        <h4>{"You haven't created any Areas of Interest yet"}</h4>
        <div className="area-alerts-img"></div>
        <p className="no-areas-subsection">
          Creating an Area of Interest lets you customize and perform an in-depth analysis of the area, as well as
          receiving email notifications when new deforestation alerts are available.
        </p>
      </div>
    );
  };

  return (
    <div className="aoi-dashboard">
      <h3>{myGFWContentConfig[selectedLanguage].myGFWTitle}</h3>
      {loadingError && <ErrorScreen />}
      {loading && <LoadingScreen />}
      {!loading && !loadingError && data && data.length !== 0 && (
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
      {!loadingError && data?.length === 0 && <NoAreasScreen />}
    </div>
  );
};

export default AOIDashboard;
