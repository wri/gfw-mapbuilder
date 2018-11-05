import {prepareStateForShare} from 'utils/shareUtils';
import modalActions from 'actions/ModalActions';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import {toQuerystring} from 'utils/params';
import basemapUtils from 'utils/basemapUtils';
import text from 'js/languages';
import moment from 'moment';
import SVGIcon from 'utils/svgIcon';
import React, {
  Component,
  PropTypes
} from 'react';

export default class RecentImagery extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  toggleImagery = () => {
    
  };

  render () {
    // const {tableOfContentsVisible, timeEnabled} = this.props;
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
