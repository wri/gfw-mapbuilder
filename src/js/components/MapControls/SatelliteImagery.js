import mapActions from 'actions/MapActions';
import text from 'js/languages';
import moment from 'moment';
import SVGIcon from 'utils/svgIcon';
import ScreenPoint from 'esri/geometry/ScreenPoint';
import React, {
  Component,
  PropTypes
} from 'react';

export default class SatelliteImagery extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  toggleImagery = () => {
    const { map } = this.context;

    if (!map.imageryModalVisible) {
      const xVal = window.innerWidth / 2;
      const yVal = window.innerHeight / 2;

      // Create new screen point at center;
      const screenPt = new ScreenPoint(xVal, yVal);

      // Convert screen point to map point and zoom to point;
      const mapPt = map.toMap(screenPt);
      map.centerAndZoom(mapPt, 8);
      const lat = mapPt.getLatitude();
      const lon = mapPt.getLongitude();

      // Request imagery with lat / lon
      mapActions.getSatelliteImagery({ lat, lon });
    }

    mapActions.toggleImageryVisible(!map.imageryModalVisible);
  };

  render () {
    const {language} = this.context;

    return (
      <div className='control-panel map-component shadow imagery'>
        <div className='pointer' title={text[language].TOOL_ZOOM_OUT} onClick={this.toggleImagery}>
          <SVGIcon id={'satellite-icon'} />
        </div>
      </div>
    );
  }

}
