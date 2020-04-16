import * as React from 'react';
import { ReactComponent as ShareIcon } from '../../images/shareIcon.svg';
import { ReactComponent as PrintIcon } from '../../images/printIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { renderModal } from 'js/store/appState/actions';
import { RootState } from 'js/store/index';
import 'css/report.scss';

import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { mapController } from 'js/controllers/mapController';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';

interface ReportProps {
  mapview: React.FunctionComponent;
}

const Report = (props: ReportProps): JSX.Element => {
  const dispatch = useDispatch();

  const [featureGeometry, setFeatureGeometry] = React.useState<any>('');
  const [geostoreID, setGeostoreID] = React.useState('');

  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );
  console.log(isMapReady);

  React.useEffect(() => {
    const geostoreID = new URL(window.location.href).searchParams.get(
      'geostoreID'
    );
    console.log(geostoreID);
    //On load using geostoreID coming from the URL, fetch information about the active feature
    async function fetchGeostoreInfo(): Promise<any> {
      fetch(`${geostoreURL}${geostoreID}`)
        .then(response => response.json())
        .then(data => setFeatureGeometry(data.data.attributes))
        .catch(e => console.error(e));
    }
    fetchGeostoreInfo();
  }, []);

  React.useEffect(() => {
    //Transform geojson retrieved earlier to usable esri geometry
    if (featureGeometry && isMapReady) {
      const esriGeo = geojsonToArcGIS(featureGeometry.geojson);
      mapController.addActiveFeatureGraphic(esriGeo);
      console.log(esriGeo);
    }
  }, [featureGeometry, isMapReady]);

  function printReport(): void {
    window.print();
  }

  function shareReport(): void {
    dispatch(renderModal('ShareWidget'));
  }

  return (
    <div className="report">
      <div className="report-header">
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
        <p>Analysis area</p>
      </div>
      <div className="report-charts">
        <p>Charts area</p>
      </div>
    </div>
  );
};

export default Report;
