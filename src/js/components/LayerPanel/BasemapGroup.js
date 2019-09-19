import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import React, {
  Component,
  PropTypes
} from 'react';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class BasemapGroup extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired
  };

  render() {
    const {activeTOCGroup, label} = this.props;
    const active = activeTOCGroup === layerKeys.GROUP_BASEMAP;
    const styles = { display: active ? 'block' : 'none' };
    const { customColorTheme } = this.context.settings;

    return (
      <div className='layer-category'>
        <div className='layer-category-label-container pointer' onClick={this.toggle}>
          <div className='layer-category-label'>{label}</div>
          <span
          style={{color: `${customColorTheme && customColorTheme !== '' ? customColorTheme : '#F0AB00'} !important`}}
          className='layer-category-caret'
          >
            {String.fromCharCode(active ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>
        <div className='layer-category-content' style={styles}>{this.props.children}</div>
      </div>
    );
  }

  toggle = () => {
    const {activeTOCGroup} = this.props;
    const updatedKey = activeTOCGroup === layerKeys.GROUP_BASEMAP ? '' : layerKeys.GROUP_BASEMAP;
    mapActions.openTOCAccordion(updatedKey);
  };

}

BasemapGroup.propTypes = {
  label: PropTypes.string.isRequired
};
