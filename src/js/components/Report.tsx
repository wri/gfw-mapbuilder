import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderModal } from '../../js/store/appState/actions';
import { RootState } from '../../js/store/index';
import Loader from '../../js/components/sharedComponents/Loader';
import { geojsonToArcGIS } from '../../js/helpers/spatialDataTransformation';
import { mapController } from '../../js/controllers/mapController';
import { ReportTable } from './report/ReportTable';
import { MemoReportChartsComponent } from './report/ReportChartsComponent';
import { ShareIcon } from '../../images/shareIcon';
import { PrintIcon } from '../../images/printIcon';
import '../../css/report.scss';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';

interface ReportProps {
  mapview: React.FunctionComponent;
}
const getLocalStorageAttributes = () => {
  const stringAttributes = localStorage.getItem('shareAttributes');

  if (stringAttributes) {
    return JSON.parse(stringAttributes);
  }
  return null;
};

const localStorageData = getLocalStorageAttributes();

const Report = (props: ReportProps): JSX.Element => {
  const dispatch = useDispatch();
  const logoURL = useSelector((store: RootState) => store.appSettings.logoUrl);
  const layersLoading = useSelector((store: RootState) => store.mapviewState.layersLoading);
  const [featureGeometry, setFeatureGeometry] = React.useState<any>('');
  const [esriGeometry, setEsriGeometry] = React.useState();
  const [geostoreID, setGeostoreID] = React.useState<string | null>(null);

  const isMapReady = useSelector((store: RootState) => store.mapviewState.isMapReady);

  React.useEffect(() => {
    const geostoreID = new URL(window.location.href).searchParams.get('geostoreID');
    //On load using geostoreID coming from the URL, fetch information about the active feature
    async function fetchGeostoreInfo(): Promise<any> {
      fetch(`${geostoreURL}${geostoreID}`)
        .then((response) => response.json())
        .then((data) => {
          setFeatureGeometry(data.data.attributes);
          setGeostoreID(geostoreID);
        })
        .catch((e) => console.error(e));
    }
    fetchGeostoreInfo();
  }, []);

  React.useEffect(() => {
    //Transform geojson retrieved earlier to usable esri geometry
    async function addFeatures(esriGeo: any) {
      await mapController.addActiveFeatureGraphic(esriGeo);
    }

    if (featureGeometry && isMapReady && !layersLoading) {
      const esriGeo = geojsonToArcGIS(featureGeometry.geojson);
      setEsriGeometry(esriGeo[0]);
      //Add Geometry graphic to the map
      if (esriGeo[0].geometry.hasOwnProperty('rings')) {
        //Dealing with a poly
        addFeatures(esriGeo);
      } else {
        //Dealing with a point
        mapController.addActiveFeaturePointGraphic(esriGeo[0]);
      }
    }

    //disable map interactions
    mapController.disableMapInteractions();
  }, [featureGeometry, layersLoading]);

  function printReport(): void {
    window.print();
  }

  function shareReport(): void {
    dispatch(renderModal('ShareWidget'));
  }

  const attributes = localStorageData?.attributes || [];

  return (
    <div className="report">
      <div className="report-header">
        {logoURL && logoURL.length && <img src={logoURL} alt="logo" className="logo" />}
        <p className="title">{`${window.document.title} Custom Analysis`}</p>
        <button onClick={printReport}>
          <PrintIcon height={25} width={25} fill={'#fff'} />
        </button>
        <button onClick={shareReport}>
          <ShareIcon height={28} width={28} fill={'#fff'} />
        </button>
      </div>
      <div className="report-map">
        <props.mapview />
      </div>
      <div className="report-analysis">
        {localStorageData?.attributes && !attributes.length && (
          <div
            style={{
              width: '100%',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ textAlign: 'center', marginTop: '30px' }}>Running analysis...</p>
            <Loader
              containerPositionStyling={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                marginLeft: '-50px',
              }}
              color={'#cfcdcd'}
              size={100}
            />
          </div>
        )}
        {localStorageData?.layerTitle && (
          <>
            <p className="analysis-title">AREA OF ANALYSIS</p>
            <p className="analysis-subtitle">{localStorageData?.attributes ? localStorageData?.layerTitle : ''}</p>
            <ReportTable attributes={localStorageData?.attributes || []} />
          </>
        )}
      </div>
      <div className="report-charts">
        <div className="pagebreak"></div>
        {geostoreID && esriGeometry && attributes && (
          <MemoReportChartsComponent
            esriGeometry={esriGeometry}
            geostoreID={geostoreID}
            attributes={localStorageData?.attributes}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
