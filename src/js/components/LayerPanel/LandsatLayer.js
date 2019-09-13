import LayerKeys from 'constants/LayerConstants';
import basemapUtils from 'utils/basemapUtils';
import mapActions from 'actions/MapActions';
import utils from 'utils/AppUtils';

import React, {
  Component,
  PropTypes
} from 'react';

export default class LandsatLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      yearSelected: this.props.years[this.props.years.length - 1]
    };
  }

  render () {
    const classes = this.props.active ? 'layer-basemap selected' : 'layer-basemap';
    const imgStyles = {
      backgroundImage: `url('${this.props.icon}')`,
      backgroundRepeat: 'no-repeat'
    };
    const { customColorTheme, defaultColorTheme } = this.context.settings;
    return (
      <div className={classes}>
        <span style={imgStyles} className='layer-basemap-icon landsat' onClick={this.toggle}></span>
        <span className='layer-basemap-label' onClick={this.toggle}>{this.props.label}</span>
        <div className='relative'>
          <select className='pointer' onChange={this.changeYear.bind(this)} value={this.state.yearSelected}>
            {this.props.years.map(this.yearOption.bind(this))}
          </select>
          <div
            style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button sml white'
          >
            {this.state.yearSelected}
          </div>
        </div>
      </div>
    );
  }

  yearOption (year) {
    return (
      <option key={year} value={year}>{year}</option>
    );
  }

  toggle = () => {
    mapActions.changeBasemap(this.props.layerId);
  };

  changeYear (evt) {
    const {map, settings} = this.context;
    const year = this.props.years[evt.target.selectedIndex];
    const landsatConfig = utils.getObject(settings.layerPanel.GROUP_BASEMAP.layers, 'id', LayerKeys.LANDSAT);
    this.setState({ yearSelected: year });
    mapActions.changeBasemap(this.props.layerId);
    basemapUtils.changeLandsatYear(map, year, landsatConfig);
  }
}

LandsatLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
