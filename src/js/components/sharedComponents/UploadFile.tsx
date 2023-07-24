import React, { DragEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderModal, toggleTabviewPanel, selectActiveTab } from '../../store/appState/actions';
import { LayerFeatureResult } from '../../store/mapview/types';
import { setActiveFeatures, setActiveFeatureIndex } from '../../store/mapview/actions';

import { geojsonToArcGIS } from '../../helpers/spatialDataTransformation';
import { registerGeometry } from '../../helpers/geometryRegistration';
import { mapController } from '../../controllers/mapController';
import { uploadContent } from '../../../../configs/translations/upload.translations';

import '../../../css/uploadFile.scss';

const UploadFile = (): JSX.Element => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state: any) => state.appState.selectedLanguage);
  const [wrongFileType, setWrongFileType] = useState(false);

  const { shapefileButton, shapefileInstructions } = uploadContent[selectedLanguage];

  const onDragFile = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDropFile = async (event: any): Promise<void> => {
    setWrongFileType(false);
    const url = 'https://production-api.globalforestwatch.org/v1/ogr/convert';
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    let file;

    if (event.dataTransfer) {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    const isZipfile = file.type === 'application/zip' || file.type === 'application/x-zip-compressed';
    const isGeoJSON = file.name.includes('geojson'); // * NOTE: geoJSON files don't have a set type

    if (file && (isZipfile || isGeoJSON)) {
      // TODO - [ ] Turn on spinner!
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures([]));

      const formData = new FormData();
      formData.append('file', file, file.name);

      const featureCollection = await fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .catch((e) => console.log('fetching error in onDropFile()', e));

      const arcGISResults = geojsonToArcGIS(featureCollection.data.attributes);

      Promise.all(
        arcGISResults.map(async (feature: any) => {
          const registeredGeometry: any = await registerGeometry(feature)
            .then((response: Response) => (response.status === 200 ? response.json() : null))
            .catch((e: Error) => {
              // TODO [ ] - error handling logic (to account for when one geometry produces an error)
              console.log('error using registerGeometry() in UploadFile.tsx', e);
            });

          feature.attributes.geostoreId = registeredGeometry.data.id;

          return registeredGeometry;
        })
      )
        .then((registeredGeometries: any) => {
          if (registeredGeometries.length) {
            const shapeFileFeatures: LayerFeatureResult = {
              layerID: 'user_features',
              layerTitle: 'Upload File Features',
              features: arcGISResults.map((g: __esri.Graphic, index: number) => {
                const attr = g.attributes;
                attr['attributeIndex'] = index;
                return { attributes: attr, geometry: g.geometry };
              }),
              fieldNames: null,
            };

            dispatch(setActiveFeatureIndex([0, 0]));
            dispatch(setActiveFeatures([shapeFileFeatures]));
          } else {
            // TODO [ ] - error handling logic if array is empty
          }
        })
        .catch((e: Error) => console.log('error in registerGeometry() in onDropFile()', e));

      mapController.processGeojson(arcGISResults);

      dispatch(toggleTabviewPanel(true));
      dispatch(selectActiveTab('analysis'));
      dispatch(renderModal(''));
      // TODO - [ ] Turn off spinner!
    } else {
      // TODO - [ ] Turn off spinner!
      setWrongFileType(true);
    }
  };

  return (
    <div className="upload-container">
      <div
        className="upload-wrapper"
        onDragOver={(e: DragEvent<HTMLDivElement>): void => onDragFile(e)}
        onDrop={(e: DragEvent<HTMLDivElement>): Promise<void> => onDropFile(e)}
      >
        <button className="btn" onClick={() => document.getElementById('upload-file-input')?.click()}>
          Click or drop a custom shapefile here
        </button>
        <input type="file" id="upload-file-input" onChange={(e: any) => onDropFile(e)} />
        <span>{shapefileButton}</span>
      </div>
      <p className={`shapefile-instructions ${wrongFileType ? 'red' : ''}`}>* {shapefileInstructions}</p>
    </div>
  );
};

export default UploadFile;
