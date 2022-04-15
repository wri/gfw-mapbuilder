import * as React from 'react';
import { loadModules } from 'esri-loader';
import { useDispatch, useSelector } from 'react-redux';
import { renderModal } from '../../js/store/appState/actions';
import { RootState } from '../../js/store/index';
import Loader from '../../js/components/sharedComponents/Loader';
import { geojsonToArcGIS } from '../../js/helpers/spatialDataTransformation';
import { mapController } from '../../js/controllers/mapController';
import { esriQuery } from '../../js/helpers/dataPanel/esriQuery';
import { getAttributesToFetch } from '../../js/helpers/dataPanel/getAttributes';
import { getAllLayerFields } from '../../js/helpers/dataPanel/DataPanel';
import { formatAttributeValues } from '../../js/helpers/dataPanel/formatAttributes';
import { ReportTable } from './report/ReportTable';
import { extractLayerInfo } from './report/ReportUtils';
import { MemoReportChartsComponent } from './report/ReportChartsComponent';

import { ShareIcon } from '../../images/shareIcon';
import { PrintIcon } from '../../images/printIcon';

import '../../css/report.scss';

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

  const logoURL = useSelector((store: RootState) => store.appSettings.logoUrl);

  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);

  const layersLoading = useSelector((store: RootState) => store.mapviewState.layersLoading);

  const [featureGeometry, setFeatureGeometry] = React.useState<any>('');
  const [esriGeometry, setEsriGeometry] = React.useState();
  const [geostoreID, setGeostoreID] = React.useState<string | null>(null);
  const [sublayerTitle, setSublayerTitle] = React.useState('');
  const [layerTitle, setLayerTitle] = React.useState('');
  const [attributes, setAttributes] = React.useState<null | any>(null);
  const [hideAttributeTable, setHideAttributeTable] = React.useState<boolean>(false);

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
    async function getFeatures(activeLayer: any, activeLayerInfo: ActiveLayerInfo, objectID: any): Promise<any> {
      //Get The Fields
      const { layerFields: fields } = activeLayerInfo.sublayer
        ? await getAllLayerFields(activeLayerInfo.sub)
        : await getAllLayerFields(activeLayerInfo.parentLayer);

      // Get all attributes that we want to fetch
      const layerToQuery = activeLayerInfo.sublayer ? activeLayerInfo.sub : activeLayerInfo.parentLayer;
      const attributesToUse = getAttributesToFetch(layerToQuery, activeLayerInfo.sublayer, fields);
      const layerOutFields = attributesToUse?.map((f) => f.fieldName);
      const qParams = {
        where: '1=1',
        outFields: layerOutFields ? layerOutFields : ['*'],
        returnGeometry: false,
        objectIds: [objectID],
      };

      //TODO: this may need more testing, we are accounting here for edge case with layerId prop (usually to do with FeatureServer layers but unclear if this is 100% coverage solution)
      const url = activeLayerInfo?.parentLayer?.hasOwnProperty('layerId')
        ? activeLayerInfo.parentLayer.url + `/${activeLayerInfo.parentLayer.layerId}`
        : activeLayer.url;

      const responseAttributes = await esriQuery(url, qParams);

      const [esriIntl] = await loadModules(['esri/intl']);
      const formattedAttributes = await formatAttributeValues(
        responseAttributes?.features[0].attributes,
        attributesToUse,
        esriIntl
      );

      // console.log('responseAttributes', responseAttributes);
      console.log('formattedAttributes', formattedAttributes);
      setAttributes({
        attributes: formattedAttributes,
        fields: attributesToUse,
      });
      setLayerTitle(activeLayer.title);
    }

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

      //Grab active Feature layerid, sublayerid and objectid from the url
      const layerID = new URL(window.location.href).searchParams.get('acLayer');
      const sublayerID = new URL(window.location.href).searchParams.get('acSublayer');
      const objectID = new URL(window.location.href).searchParams.get('objectid');

      // ObjectID comes in as undefined in certain cases such as when report is loaded with user drawn or user uploaded polygon feature, in those cases we do not need attribute table loaded so this will short-circuit the
      // logic below and prevent breaking attribute table logic
      if (objectID !== 'undefined') {
        const { activeLayer, activeLayerInfo }: any = extractLayerInfo(
          layerID,
          sublayerID,
          allAvailableLayers,
          mapController._map
        );
        getFeatures(activeLayer, activeLayerInfo, objectID);
      } else {
        setAttributes({});
        setHideAttributeTable(true);
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
        {!attributes && (
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
        {attributes && (
          <>
            <p className="analysis-title">AREA OF ANALYSIS</p>
            <p className="analysis-subtitle">{layerTitle}</p>
            {!hideAttributeTable && <ReportTable attr={attributes} />}
          </>
        )}
      </div>
      <div className="report-charts">
        <div className="pagebreak"></div>
        {geostoreID && esriGeometry && attributes && (
          <MemoReportChartsComponent
            esriGeometry={esriGeometry}
            geostoreID={geostoreID}
            attributes={attributes?.attributes}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
