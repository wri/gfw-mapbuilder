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

  const allAvailableLayers = useSelector(
    (store: RootState) => store.mapviewState.allAvailableLayers
  );

  const layersLoading = useSelector(
    (store: RootState) => store.mapviewState.layersLoading
  );

  const [featureGeometry, setFeatureGeometry] = React.useState<any>('');
  const [geostoreID, setGeostoreID] = React.useState('');
  const [sublayerTitle, setSublayerTitle] = React.useState('');
  const [layerTitle, setLayerTitle] = React.useState('');

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
    if (featureGeometry && isMapReady && !layersLoading) {
      const esriGeo = geojsonToArcGIS(featureGeometry.geojson);
      if (esriGeo[0].geometry.hasOwnProperty('rings')) {
        //Dealing with a poly
        mapController.addActiveFeatureGraphic(esriGeo);
      } else {
        //Dealing with a point
        mapController.addActiveFeaturePointGraphic(esriGeo[0]);
      }

      //Grab active Feature layerid, sublayerid and objectid from the url
      const layerID = new URL(window.location.href).searchParams.get('acLayer');
      const sublayerID = new URL(window.location.href).searchParams.get(
        'acSublayer'
      );
      const objectID = new URL(window.location.href).searchParams.get(
        'objectid'
      );
      console.log(layerID);
      console.log(sublayerID);
      console.log(allAvailableLayers);
      //Find Layer URL that we would Query
      let activeLayerURL;
      allAvailableLayers.forEach(l => {
        if (l.parentID) {
          //we are dealing with a sublayer
          if (l.parentID === layerID) {
            if (String(l.id) === String(sublayerID)) {
              console.log('found', l);
              activeLayerURL = l.url;
            }
          }
        } else {
          if (l.id === layerID) {
            //we are dealing with normal layer
            console.log('found', l);
            activeLayerURL = l.url;
          }
        }
      });

      console.log(activeLayerURL);
    }
  }, [layersLoading]);

  function printReport(): void {
    window.print();
  }

  function shareReport(): void {
    dispatch(renderModal('ShareWidget'));
  }

  // Forêts communautaires: Forêts communautaires
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
        <p>AREA OF ANALYSIS</p>
      </div>
      <div className="report-charts">
        <p>Charts area</p>
      </div>
    </div>
  );
};

export default Report;
