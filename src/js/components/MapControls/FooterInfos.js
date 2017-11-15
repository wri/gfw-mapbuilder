import React, {Component} from 'react';
import number from 'dojo/number';

export default class FooterInfos extends Component {

  state = {
    longitude: '--',
    latitude: '--'
  };

  formatNumber (value) {
    return number.format(value, { places: 6 });
  }

  componentDidUpdate () {
    const {map} = this.props;
    if (map.loaded && !this.listener) {
      //- Set the current map center
      const defaultCenter = map.extent.getCenter();
      this.setState({
        longitude: this.formatNumber(defaultCenter.getLongitude()),
        latitude: this.formatNumber(defaultCenter.getLatitude())
      });
      //- Add a listener to update the value anytime the extent changes
      this.listener = map.on('extent-change', ({extent}) => {
        const center = extent.getCenter();
        this.setState({
          longitude: this.formatNumber(center.getLongitude()),
          latitude: this.formatNumber(center.getLatitude())
        });
      });
    }
  }

  componentWillUnmount () {
    this.listener.remove();
    this.listener = undefined;
  }

  render () {
    const {longitude, latitude} = this.state;

    const { hidden } = this.props;

    return (
      <div className={`${hidden ? 'hidden' : ''} footer-info`}>
        <div className='footer-info_coords'>
          Lat/Long: {latitude}/{longitude}
        </div>
      </div>
    );
  }
}
