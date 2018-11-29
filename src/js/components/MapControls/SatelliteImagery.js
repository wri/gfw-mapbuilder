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
    const { imageryModalVisible } = this.props;
    const { map } = this.context;
    if (!imageryModalVisible) {
      const xVal = window.innerWidth / 2;
      const yVal = window.innerHeight / 2;

      // Create new screen point at center;
      const screenPt = new ScreenPoint(xVal, yVal);

      // Convert screen point to map point and zoom to point;
      const mapPt = map.toMap(screenPt);
      const lon = mapPt.getLatitude();
      const lat = mapPt.getLongitude();

      // Request imagery with lat / lon
      mapActions.getSatelliteImagery({ lat, lon });
    }

    mapActions.toggleImageryVisible(!imageryModalVisible);
  };

  render () {
    const {language } = this.context;
    const { imageryModalVisible } = this.props;

    return (
      <div className={`control-panel map-component shadow imagery ${imageryModalVisible ? 'active' : ''}`}>
        <div className='pointer' title={text[language].TOOL_ZOOM_OUT} onClick={this.toggleImagery}>
          <SVGIcon id={'satellite-icon'} />
        </div>
      </div>
    );
  }

}
