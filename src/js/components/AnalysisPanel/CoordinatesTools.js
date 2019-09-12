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

export default class CoordinatesTools extends Component {

    static contextTypes = {
        language: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired
      };
    
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
      
      renderInstructionList = (instruction, index) => {
        return (
          <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
        );
      };
      
      enterValues = () => {
       // if active, toggle it off
        if (this.props.enterValuesButtonActive) {
            mapActions.toggleCoordinatesModal({ visible: false });
        } else {
          mapActions.activateEnterValuesButton(true);
          //- If the analysis modal is visible, hide it
          mapActions.toggleCoordinatesModal({ visible: true });
        }
      };
      
      createToolbar = (map) => {
        this.toolbar = new Draw(map);
        this.toolbar.on('draw-end', (evt) => {
          mapActions.activateEnterValuesButton(true);
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

      render() {
        const {language} = this.context;
       
        return (
          <div className='analysis-instructions__coordinates'>
            <h4 className='analysis-instructions__header'>
              {text[language].ANALYSIS_COORDINATES_HEADER}
            </h4>
            <ol className='analysis-instructions__olist'>
              {text[language].ANALYSIS_COORDINATES_INSTRUCTIONS.map(this.renderInstructionList)}
            </ol>
            <div className="fa-button gold analysis-instructions__enter-values-button"
            onClick={this.enterValues}>
              <span className="analysis-instructions__enter-values-icon"><SVGIcon id={'icon-enter-values'} /></span>
              <span className="analysis-instructions__enter-values">{text[language].ANALYSIS_COORDINATES_BUTTONS[0]}</span>
            </div>
            <div className='analysis-instructions__separator'>
              <span className='analysis-instructions__separator-text'>{text[language].ANALYSIS_OR}</span>
            </div>
          </div>
        );
      }
}
