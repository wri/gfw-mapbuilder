import React from 'react';

const printModal = (
  <div className="modal-content-container">
    <div className="directions">
      <p>Choose a print output</p>
    </div>
  </div>
);

const shareModal = (
  <div className="modal-content-container">
    <div className="directions">
      <h4 className="title">Share this view</h4>
      <p>
        Copy and paste the link to share it or use the buttons below to share on
        social media.
      </p>
    </div>
  </div>
);

const penModal = (
  <div className="modal-content-container">
    <div className="directions">
      <h4 className="title">Analyse your own shape</h4>
      <ol>
        <li>Draw a shape anywhere on the map</li>
        <li>Select the shape to run the analysis</li>
      </ol>

      <button>Start Drawing</button>
      <button>or drop a custom shapefile here</button>
      <p>
        * Only polygon data is supported and should use a spatial reference of
        WGS84. The recommended maximum size is 5MB, anything more than that may
        not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON
        files must be in .json files.
      </p>
    </div>
  </div>
);

const searchModal = (
  <div className="modal-content-container">
    <div className="directions">
      <div>
        <span>Lat:</span>
        <span>Long:</span>
        <button>Search</button>
      </div>
      <p>Search for feature:</p>
    </div>
  </div>
);

const setModalContent = (renderModal: String): any => {
  switch (renderModal) {
    case 'PrintWidget':
      return printModal;
    case 'ShareWidget':
      return shareModal;
    case 'PenWidget':
      return penModal;
    case 'SearchWidget':
      return searchModal;
    default:
      break;
  }
};

export default setModalContent;
