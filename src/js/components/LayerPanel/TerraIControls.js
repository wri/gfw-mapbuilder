import React, {Component, PropTypes} from 'react';
import {loadCSS} from 'utils/loaders';
import {assetUrls} from 'js/config';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import 'pickadate';

/**
* Same function that is in the layer, but the layer is not always loaded when the data is back from the server
*/
const getJulianDateFromGridCode = function getJulianDateFromGridCode (gridCode) {
  const {year, day} = utils.getDateFromGridCode(gridCode);
  return ((year % 2000) * 1000) + day;
};

export default class TerraIControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  initialized = false;
  state = {};

  componentDidMount () {
    //- Load the pickers css if it has not already been loaded
    const base = window._app.base ? window._app.base + '/' : '';
    loadCSS(base + assetUrls.pickadateCSS);
    loadCSS(base + assetUrls.pickadateDateCSS);
  }

  componentWillUpdate () {
    const {map} = this.context;
    const {layer} = this.props;
    if (map.loaded && !this.initialized) {
      this.initialized = true;
      //- Fetch the max date for these requests
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        const mapLayer = map.getLayer(layer.id);
        const data = JSON.parse(xhr.response);
        const maxDateValue = getJulianDateFromGridCode(data.maxValues[0]);
        //- Update local state
        this.setState({
          minDate: layer.minDateValue,
          maxDate: maxDateValue
        });
        //- Update the layer if ready, if not it will get updated on first set
        if (mapLayer) {
          mapLayer.setDateRange(layer.minDateValue, maxDateValue);
        }
        //- Get date in normal JS Date format
        const min = new Date(((layer.minDateValue / 1000) + 2000).toString(), 0, 1);
        const max = new Date(((maxDateValue / 1000) + 2000).toString(), 0, maxDateValue % 1000);
        //- Create the date pickers
        const {fromTerraCalendar, toTerraCalendar} = this.refs;
        //- Starting date
        this.fromPicker = $(fromTerraCalendar).pickadate({
          today: 'Jump to today',
          min: min,
          max: max,
          selectYears: max.getFullYear() - min.getFullYear(),
          selectMonths: true,
          closeOnSelect: true,
          klass: { picker: 'picker__top' },
          onSet: this.didSetStartDate,
          onStart: function () { this.set('select', min); }
        }).pickadate('picker');
        //- Ending date
        this.toPicker = $(toTerraCalendar).pickadate({
          today: 'Jump to today',
          min: min,
          max: max,
          selectYears: max.getFullYear() - min.getFullYear(),
          selectMonths: true,
          closeOnSelect: true,
          klass: { picker: 'picker__top' },
          onSet: this.didSetEndDate,
          onStart: function () { this.set('select', max); }
        }).pickadate('picker');
      });
      xhr.open('GET', `${layer.imageServer}?f=json`, true);
      xhr.send();
    }
  }

  didSetStartDate = ({select}) => {
    if (select) {
      this.setState({ startDate: new Date(select) });
      this.updateDateRange();
      if (this.fromPicker && this.toPicker) {
        this.toPicker.set('min', this.fromPicker.get('select'));
      }
    }
  };

  didSetEndDate = ({select}) => {
    if (select) {
      this.setState({ endDate: new Date(select) });
      this.updateDateRange();
      if (this.fromPicker && this.toPicker) {
        this.fromPicker.set('max', this.toPicker.get('select'));
      }
    }
  };

  updateDateRange = () => {
    const {startDate, endDate} = this.state;
    const {map} = this.context;
    const {layer} = this.props;
    const julianFrom = utils.getJulianDate(startDate);
    const julianTo = utils.getJulianDate(endDate);
    if (map.getLayer && map.getLayer(layer.id)) {
      map.getLayer(layer.id).setDateRange(julianFrom, julianTo);
    }
  };

  render () {
    const {language} = this.context;

    return (
      <div className='terra-i-controls'>
        <div className='terra-i-controls__calendars'>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <input className='fa-button sml white pointer' type='text' ref='fromTerraCalendar' />
          </div>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <input className='fa-button sml white pointer' type='text' ref='toTerraCalendar' />
          </div>
        </div>
      </div>
    );
  }

}
