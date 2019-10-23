import mapActions from 'actions/MapActions';
import text from 'js/languages';
import moment from 'moment';
import SVGIcon from 'utils/svgIcon';
import ScreenPoint from 'esri/geometry/ScreenPoint';
import React, {
  Component,
  PropTypes
} from 'react';

export default class ImageryHoverModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    const { top, left, selectedImagery } = this.props;
    const {language} = this.context;

    return (
      <div className='imagery-hover-modal' style={{ top: top + 'px', left: left + 'px' }} >
        <div><h4>{text[language].INSTRUMENT}:</h4>{selectedImagery.attributes.instrument}</div>
        <div><h4>{text[language].DATE}:</h4>{moment(selectedImagery.attributes.date_time).format('DD-MM-YYYY, h:mm a')}</div>
        <div><h4>{text[language].CLOUD}:</h4>{selectedImagery.attributes.cloud_score.toFixed(0)}%</div>
      </div>
    );
  }

}
