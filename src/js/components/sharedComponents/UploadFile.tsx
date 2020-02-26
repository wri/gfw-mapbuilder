import React, { FunctionComponent, DragEvent } from 'react';
import { useSelector } from 'react-redux';

function UploadFile(): JSX.Element {
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );

  const uploadContent = {
    en: {
      shapefileButton: 'or drop a custom shapefile here'
    },
    ka: {
      shapefileButton: 'ან შემოიტანეთ სხვა შეიპფაილი'
    },
    fr: {
      shapefileButton: 'ou glissez un shapefile ici'
    },
    es: {
      shapefileButton: 'o dejar un shapefile aquí'
    },
    pt: {
      shapefileButton: 'ou soltar aqui um shapefile personalizado'
    },
    id: {
      shapefileButton: 'or drop a custom shapefile here'
    },
    zh: {
      shapefileButton: '或者在这里添加自定义地理信息系统文件（shapefile）'
    }
  };

  const { shapefileButton } = uploadContent[selectedLanguage];

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
    <>
      <div
        onDragOver={(e: DragEvent<HTMLDivElement>): void => onDragFile(e)}
        onDrop={(e: DragEvent<HTMLDivElement>): void => onDropFile(e)}
      >
        <span>{shapefileButton}</span>
      </div>
    </>
  );
}

export default UploadFile;
