import React, { DragEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';

import {
  renderModal,
  toggleTabviewPanel,
  selectActiveTab
} from 'js/store/appState/actions';
import { FeatureResult } from 'js/store/mapview/types';
import { LayerFeatureResult } from 'js/store/mapview/types';
import {
  setActiveFeatures,
  setActiveFeatureIndex
} from 'js/store/mapview/actions';

import { geojsonToArcGIS } from 'js/helpers/spatialDataTransformation';
import { registerGeometry } from 'js/helpers/geometryRegistration';
import { mapController } from 'js/controllers/mapController';

import 'css/uploadFile.scss';

const UploadFile = (): JSX.Element => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );
  const { activeFeatures } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const [wrongFileType, setWrongFileType] = useState(false);

  const uploadContent = {
    en: {
      shapefileButton: 'or drop a custom shapefile here',
      shapefileInstructions:
        'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 1MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.'
    },
    nl: {
      shapefileButton: 'of plaats hier een aangepast shapefile hier',
      shapefileInstructions:
        'Alleen polygoongegevens worden ondersteund en zouden een ruimtelijke referentie van WGS84 moeten gebruiken. De aanbevolen maximale grootte is 1 MB, meer dan dat werkt mogelijk niet zoals verwacht. Esri-shapefiles moeten gezipt zijn (.zip) en GeoJSON-bestanden moeten in .json-bestanden zijn.'
    },
    hy: {
      shapefileButton: 'կամ գցել սովորական շեյփ-ֆայլ (shapefile) այստեղ',
      shapefileInstructions:
        'Անհրաժեշտ է մուտքագրել միայն բազմակնութուն տվյալներ և օգտագործել WGS84 կոորդինատային համակարգ: Մուտքագրվող տվյալների առաջարկվող առավելագույն ծավալը 1 ՄԲ է, դրանից ավել ծավալների դեպքում գործիքը կարող է նախատեսված կարգով չաշխատել: Esri շեյփ-ֆայլերը (shapefile) պետք է լինեն արխիվացված (.zip), իսկ GeoJSON ֆայլերը որպես .json ֆորմատով '
    },
    ka: {
      shapefileButton: 'ან შემოიტანეთ სხვა შეიპფაილი',
      shapefileInstructions:
        'უნდა იყოს გამოყენებული მხოლოდ პოლიგონების მონაცემები WGS84 სივრცული რეფერენსებით. რეკომენდირებული მაქსიმალური ზომაა 1 მბ, უფრო დიდმა ფაილმა შეიძლება ვერ იმუშაოს კორექტულად.  Esri შეიპფაილები უნდა იყოს დაზიპული (.zip) ხოლო GeoJSON ფაილები უნდა იყოს  .json ფორმატით.'
    },
    fr: {
      shapefileButton: 'ou glissez un shapefile ici',
      shapefileInstructions:
        'Fonctionne uniquement avec des données de type polygone avec la réérence spatiale WGS84. La taille maximale est de 1MB. Les fichiers shapefiles doivent être compressés(.zip) et les fichiers GeoJSON sous le format .json.'
    },
    es: {
      shapefileButton: 'o dejar un shapefile aquí',
      shapefileInstructions:
        'Solo están permitido datos en formato de polígono, con el Sistema de Referencia de Coordinados WGS84. Se recomienda un tamaño máximo de 1MB, más grande de 1MB puede no funcionar como era de esperar. Shapefiles de ESRI necesitan estar en formato .zip, y archivos de GeoJSON necesitan estar en formato .json.'
    },
    pt: {
      shapefileButton: 'ou soltar aqui um shapefile personalizado',
      shapefileInstructions:
        'Somente geometria de polígono é suportada, devendo-se usar WGS81 como sistema de referência espacial. O tamanho máximo recomendado é de 5 MB, arquivos com tamanho maior que o recomendado podem não funcionar corretamente. ESRI shapefiles devem estar compactados (.zip) e arquivos GeoJSON devem estar no formato .json.'
    },
    id: {
      shapefileButton: 'or drop a custom shapefile here',
      shapefileInstructions:
        'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 1MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.'
    },
    zh: {
      shapefileButton: '或者在这里添加自定义地理信息系统文件（shapefile）',
      shapefileInstructions:
        '本网站仅支持空间参考系统为WGS84的图形数据文件。建议文件大小应小于1MB。ESRI文件必须为压缩文件（.zip）,GeoJSON 文件必须为后缀.json的文件。'
    }
  };

  const { shapefileButton, shapefileInstructions } = uploadContent[
    selectedLanguage
  ];

  const onDragFile = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDropFile = async (
    event: DragEvent<HTMLDivElement>
  ): Promise<void> => {
    setWrongFileType(false);
    const url = 'https://production-api.globalforestwatch.org/v1/ogr/convert';
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    const file = event.dataTransfer.files[0];
    const isZipfile = file.type === 'application/zip';
    const isGeoJSON = file.name.includes('geojson'); // * NOTE: geoJSON files don't have a set type

    if (file && (isZipfile || isGeoJSON)) {
      // TODO - [ ] Turn on spinner!
      dispatch(setActiveFeatureIndex([0, 0]));
      dispatch(setActiveFeatures([]));

      const formData = new FormData();
      formData.append('file', file, file.name);

      const featureCollection = await fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .catch(e => console.log('fetching error in onDropFile()', e));

      const arcGISResults = geojsonToArcGIS(featureCollection.data.attributes);

      Promise.all(
        arcGISResults.map(async (feature: any) => {
          const registeredGeometry: any = await registerGeometry(feature)
            .then((response: Response) =>
              response.status === 200 ? response.json() : null
            )
            .catch((e: Error) => {
              // TODO [ ] - error handling logic (to account for when one geometry produces an error)
              console.log(
                'error using registerGeometry() in UploadFile.tsx',
                e
              );
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
              features: arcGISResults.map(
                (g: __esri.Graphic, index: number) => {
                  const attr = g.attributes;
                  attr['attributeIndex'] = index;
                  return { attributes: attr, geometry: g.geometry };
                }
              ),
              fieldNames: null
            };

            dispatch(setActiveFeatureIndex([0, 0]));
            dispatch(setActiveFeatures([shapeFileFeatures]));
          } else {
            // TODO [ ] - error handling logic if array is empty
          }
        })
        .catch((e: Error) =>
          console.log('error in registerGeometry() in onDropFile()', e)
        );

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
        <span>{shapefileButton}</span>
      </div>
      <p className={`shapefile-instructions ${wrongFileType ? 'red' : ''}`}>
        * {shapefileInstructions}
      </p>
    </div>
  );
};

export default UploadFile;
