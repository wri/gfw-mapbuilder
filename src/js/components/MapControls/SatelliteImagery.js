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
    const { imageryActive } = this.props;
    mapActions.toggleImageryActive(!imageryActive);

    if (!imageryActive) {
      mapActions.toggleImageryVisible(true);
    } else {
      mapActions.toggleImageryVisible(false);
    }
  };

  render () {
    const {language } = this.context;
    const { imageryActive } = this.props;

    return (
      <div className={`control-panel map-component shadow imagery ${imageryActive ? 'active' : ''}`}>
        <div className='pointer' title={text[language].TOOL_ZOOM_OUT} onClick={this.toggleImagery}>
          <SVGIcon id={'satellite-icon'} />
        </div>
      </div>
    );
  }

}
