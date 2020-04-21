import * as React from 'react';
import { ReactComponent as ShareIcon } from '../../images/shareIcon.svg';
import { ReactComponent as PrintIcon } from '../../images/printIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { renderModal } from 'js/store/appState/actions';
import { RootState } from 'js/store/index';
import Loader from 'js/components/sharedComponents/Loader';
import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { mapController } from 'js/controllers/mapController';
import { esriQuery } from 'js/helpers/dataPanel/esriQuery';
import { getAttributesToFetch } from 'js/helpers/dataPanel/getAttributes';
import { getAllLayerFields } from 'js/helpers/dataPanel/DataPanel';
import { formatAttributeValues } from 'js/helpers/dataPanel/formatAttributes';
import { ReportTable } from './report/ReportTable';
import { extractLayerInfo } from './report/ReportUtils';
import { MemoReportChartsComponent } from './report/ReportChartsComponent';

import 'css/report.scss';

const geostoreURL = 'https://production-api.globalforestwatch.org/v1/geostore/';

interface ActiveLayerInfo {
  sub: any;
  parentLayer: any;
  sublayer?: boolean;
  type: string;
}
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
  const [geostoreID, setGeostoreID] = React.useState<string | null>(null);
  const [sublayerTitle, setSublayerTitle] = React.useState('');
  const [layerTitle, setLayerTitle] = React.useState('');
  const [attributes, setAttributes] = React.useState<null | object>(null);

  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );

  React.useEffect(() => {
    //disable map interactions
    mapController.disableMapInteractions();
    const geostoreID = new URL(window.location.href).searchParams.get(
      'geostoreID'
    );
    //On load using geostoreID coming from the URL, fetch information about the active feature
    async function fetchGeostoreInfo(): Promise<any> {
      fetch(`${geostoreURL}${geostoreID}`)
        .then(response => response.json())
        .then(data => {
          setFeatureGeometry(data.data.attributes);
          setGeostoreID(geostoreID);
        })
        .catch(e => console.error(e));
    }
    fetchGeostoreInfo();
  }, []);

  React.useEffect(() => {
    //Transform geojson retrieved earlier to usable esri geometry
    async function getFeatures(
      activeLayer: any,
      activeLayerInfo: ActiveLayerInfo,
      objectID: any
    ): Promise<any> {
      //Get The Fields
      const fields = activeLayerInfo.sublayer
        ? await getAllLayerFields(activeLayerInfo.sub)
        : await getAllLayerFields(activeLayerInfo.parentLayer);

      // Get all attributes that we want to fetch
      const layerToQuery = activeLayerInfo.sublayer
        ? activeLayerInfo.sub
        : activeLayerInfo.parentLayer;
      const attributesToUse = getAttributesToFetch(
        layerToQuery,
        activeLayerInfo.sublayer,
        fields
      );
      const layerOutFields = attributesToUse?.map(f => f.fieldName);
      const qParams = {
        where: '1=1',
        outFields: layerOutFields ? layerOutFields : ['*'],
        returnGeometry: false,
        objectIds: objectID
      };

      const url = activeLayer.url;
      const responseAttributes = await esriQuery(url, qParams);
      const formattedAttributes = formatAttributeValues(
        responseAttributes.features[0].attributes,
        attributesToUse
      );
      setAttributes({
        attributes: formattedAttributes,
        fields: attributesToUse
      });
      setLayerTitle(activeLayer.title);
    }
    if (featureGeometry && isMapReady && !layersLoading) {
      const esriGeo = geojsonToArcGIS(featureGeometry.geojson);

      //Add Geometry graphic to the map
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

      const { activeLayer, activeLayerInfo }: any = extractLayerInfo(
        layerID,
        sublayerID,
        allAvailableLayers,
        mapController._map
      );

      getFeatures(activeLayer, activeLayerInfo, objectID);
    }
  }, [featureGeometry, layersLoading]);

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
        {!attributes && (
          <div
            style={{
              width: '100%',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <p style={{ textAlign: 'center', marginTop: '30px' }}>
              Running analysis...
            </p>
            <Loader
              containerPositionStyling={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                marginLeft: '-50px'
              }}
              color={'#cfcdcd'}
              size={100}
            />
          </div>
        )}
        {attributes && (
          <>
            <p className="analysis-title">AREA OF ANALYSIS</p>
            <p className="analysis-subtitle">{layerTitle}</p>
            <ReportTable attr={attributes} />
          </>
        )}
      </div>
      <div className="report-charts">
        <div className="pagebreak"></div>
        {geostoreID && <MemoReportChartsComponent geostoreID={geostoreID} />}
      </div>
    </div>
  );
};

export default Report;
