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
          coordinateButtonActive: false
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

    render() {
        return (
            <div></div>
        );
    }
}
