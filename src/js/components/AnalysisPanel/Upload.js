import scaleUtils from 'esri/geometry/scaleUtils';
import layerKeys from 'constants/LayerConstants';
import geometryUtils from 'utils/geometryUtils';
import Graphic from 'esri/graphic';
import mapActions from 'actions/MapActions';
import {uploadConfig} from 'js/config';
import Loader from 'components/Loader';
import request from 'utils/request';
import text from 'js/languages';
import esriRequest from 'esri/request';
import geojsonUtil from 'utils/arcgis-to-geojson';
import symbols from 'utils/symbols';
import Polygon from 'esri/geometry/Polygon';
import {attributes} from 'constants/AppConstants';
import graphicsUtils from 'esri/graphicsUtils';

import React, {
  Component,
  PropTypes
} from 'react';

const TYPE = {
  ZIP: '.zip',
  SHAPEFILE: 'shapefile',
  GEOJSON: 'geojson'
};

const isZip = function isZip (filename) {
  return filename.indexOf(TYPE.ZIP) === filename.length - TYPE.ZIP.length;
};

export default class Upload extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      dndActive: false,
      isUploading: false
    };
  }

  //- DnD Functions
  prevent = (evt) => {
    evt.preventDefault();
    return false;
  };

  enter = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: true });
  };

  leave = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: false });
  };

  drop = (evt) => {
    evt.preventDefault();
    const {map} = this.context;
    const file = evt.dataTransfer &&
                 evt.dataTransfer.files &&
                 evt.dataTransfer.files[0];

    if (!file) {
      return;
    }

    //- Update the view
    this.setState({
      dndActive: false,
      isUploading: true
    });

    //- If the analysis modal is visible, hide it
    mapActions.toggleAnalysisModal({ visible: false });

    const extent = scaleUtils.getExtentForScale(map, 40000);
    const type = isZip(file.name) ? TYPE.SHAPEFILE : TYPE.GEOJSON;
    const params = uploadConfig.shapefileParams(file.name, map.spatialReference, extent.getWidth(), map.width);
    params.targetSr = {
      latestWkid: 3857,
      wkid: 102100
    };
    const content = uploadConfig.shapefileContent(JSON.stringify(params), type);

    // the upload input needs to have the file associated to it
    const inputs = this.refs.fileInput;

    if(evt.dataTransfer.files.length > 0)
    {
      var formData = new FormData();
      formData.append('file', evt.dataTransfer.files[0], evt.dataTransfer.files[0].name);

      var xhr = new XMLHttpRequest();
      const url = 'https://production-api.globalforestwatch.org/v1/ogr/convert';
      xhr.open('POST', url, true);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let response = geojsonUtil.geojsonToArcGIS(JSON.parse(xhr.responseText).data.attributes);
          this.processGeojson(response);
        } else if (xhr.readyState === 4) {
          console.log("Error: shapefile not working");
        }
      };
      xhr.send(formData);
    } else {
      console.log('Error: file upload was unsuccessful');
    }
  };

  processGeojson = (esriJson) => {
    let graphics = [];
    esriJson.forEach(feature => {
      graphics.push(new Graphic(
          new Polygon(feature.geometry),
          symbols.getCustomSymbol(),
          {
            ...feature.attributes,
            source: attributes.SOURCE_UPLOAD
          }
      ));
    });
    const graphicsExtent = graphicsUtils.graphicsExtent(graphics);
    const layer = this.context.map.getLayer(layerKeys.USER_FEATURES);
    if (layer) {
      this.context.map.setExtent(graphicsExtent, true);
      graphics.forEach((graphic) => {
        layer.add(graphic);
      });
    }
    this.setState({isUploading: false});
  }

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
    );
  };

  render () {
    const {embeddedInModal} = this.props;
    const {language} = this.context;
    let header, label;

    label = text[language].ANALYSIS_SHAPEFILE_UPLOAD;

    if (!embeddedInModal) {
      header = (
        <h4 className='analysis-instructions__header--additional'>
          <span dangerouslySetInnerHTML={{ __html: text[language].ANALYSIS_INSTRUCTION_ADDITIONAL}} />
        </h4>
      );

      label += ' *';
    }

    return (
      <div className='analysis-instructions__upload'>
        {header}
        <form
          className={`analysis-instructions__upload-container mobile-hide ${this.state.dndActive ? 'active' : ''}`}
          encType='multipart/form-data'
          onDragEnter={this.enter}
          onDragLeave={this.leave}
          onDragOver={this.prevent}
          onDrop={this.drop}
          name='upload'
          ref='upload'>
          <Loader active={this.state.isUploading} />
          <span className='analysis-instructions__upload-label'>
            {label}
          </span>
          <input type='file' name='file' ref='fileInput' />
          <input type='hidden' name='publishParameters' value='{}' />
					<input type='hidden' name='filetype' value='shapefile' />
					<input type='hidden' name='f' value='json' />
        </form>
        <div className='analysis-instructions__upload-instructions'>
          <span>* {text[language].ANALYSIS_SHAPEFILE_INSTRUCTIONS}</span>
        </div>
      </div>
    );
  }

}

Upload.propTypes = {
  embeddedInModal: PropTypes.bool
};
