import React, { FunctionComponent, DragEvent } from 'react';
import { useSelector } from 'react-redux';

import 'css/uploadFile.scss';

function UploadFile(): JSX.Element {
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );

  const uploadContent = {
    en: {
      shapefileButton: 'or drop a custom shapefile here',
      shapefileInstructions:
        'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 1MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.'
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

  const onDropFile = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    console.log('onDropFile()', file);
  };

  return (
    <div className="upload-container">
      <div
        className="upload-wrapper"
        onDragOver={(e: DragEvent<HTMLDivElement>): void => onDragFile(e)}
        onDrop={(e: DragEvent<HTMLDivElement>): void => onDropFile(e)}
      >
        <span>{shapefileButton}</span>
      </div>
      <p className="shapefile-instructions">* {shapefileInstructions}</p>
    </div>
  );
}

export default UploadFile;
