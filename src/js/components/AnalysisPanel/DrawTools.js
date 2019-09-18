import layerKeys from 'constants/LayerConstants';
import geometryUtils from 'utils/geometryUtils';
import mapActions from 'actions/MapActions';
import Draw from 'esri/toolbars/draw';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';

import React, {
  Component,
  PropTypes
} from 'react';

export default class DrawTools extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      drawButtonActive: false
    };
  }

  componentDidMount () {
    const {map} = this.context;
    // If this component unmounts and destroys itself, recreate it
    if (!this.toolbar && map.loaded) {
      this.createToolbar(map);
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {map} = this.context;
    // Wait for the map to load and create it
    if (!this.toolbar && map.loaded) {
      this.createToolbar(map);
    } else if (prevContext.map !== map && map.loaded) { // If the map changes, recreate it
      this.createToolbar(map);
    }
  }

  createToolbar = (map) => {
    this.toolbar = new Draw(map);
    this.toolbar.on('draw-end', (evt) => {
      this.deactivate();
      // Add graphic to map and set as active feature
      geometryUtils.generateDrawnPolygon(evt.geometry).then(graphic => {
        const layer = map.getLayer(layerKeys.USER_FEATURES);
        if (layer) {
          layer.add(graphic);
          map.infoWindow.setFeatures([graphic]);
        }
      });
    });
  };

  draw = () => {
    // if active, toggle it off
    if (this.props.drawButtonActive) {
      if (this.toolbar._graphic && this.toolbar._graphic.geometry && this.toolbar._graphic.geometry.rings) { // && this.toolbar._graphic.geometry.rings.length > 1
        this.toolbar.finishDrawing();
        mapActions.activateDrawButton(false);
        mapActions.toggleAnalysisModal({ visible: false });
      } else {
        this.deactivate();
      }
    } else {
      this.activate();
      //- If the analysis modal is visible, hide it
      mapActions.toggleAnalysisModal({ visible: false });
    }
  };

  activate = () => {
    const {map} = this.context;
    this.toolbar.activate(Draw.POLYGON);
    mapActions.activateDrawButton(true);
    // Disable popups while this is active, this function is only available to webmaps when usePopupManager is true
    map.setInfoWindowOnClick(false);
  };

  deactivate = () => {
    const {map} = this.context;
    this.toolbar.deactivate();
    mapActions.activateDrawButton(false);
    // Reconnect the popups, this function is only available to webmaps when usePopupManager is true
    map.setInfoWindowOnClick(true);
    const selectedFeature = map.infoWindow.getSelectedFeature();
    map.infoWindow.clearFeatures();
    const layer = map.getLayer(layerKeys.USER_FEATURES);
    layer.remove(selectedFeature);
    brApp.map.graphics.clear();
    mapActions.setAnalysisType('default');
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
    );
  };

  render () {
    const {embeddedInModal} = this.props;
    const {language} = this.context;
    const instructions = embeddedInModal ?
            text[language].ANALYSIS_DRAW_INSTRUCTIONS.slice(1) :
            text[language].ANALYSIS_DRAW_INSTRUCTIONS;

    return (
      <div className='analysis-instructions__draw'>
        <h4 className='analysis-instructions__header'>
          {text[language].ANALYSIS_DRAW_HEADER}
        </h4>
        <ol className='analysis-instructions__olist'>
          {instructions.map(this.renderInstructionList)}
        </ol>
        <div className='analysis-instructions__draw-icon-container'>
          <svg className='analysis-instructions__draw-icon'>
            <SVGIcon id={'icon-analysis-draw'} />
          </svg>
        </div>
        <div
          className="fa-button gold analysis-instructions__draw-button"
          onClick={this.draw}>
          <span className="analysis-instructions__draw-upload-icon"><SVGIcon id={'icon-draw-upload-white'} /></span>
          <span className="analysis-instructions__draw-upload">{text[language].ANALYSIS_DRAW_BUTTON}</span>
        </div>
        <div className='analysis-instructions__separator'>
          <span className='analysis-instructions__separator-text'>{text[language].ANALYSIS_OR}</span>
        </div>
      </div>
    );
  }

}

DrawTools.propTypes = {
  embeddedInModal: PropTypes.bool
};
