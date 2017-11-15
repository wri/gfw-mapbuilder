import React, {Component, PropTypes} from 'react';
import {loadCSS} from 'utils/loaders';
import {assetUrls} from 'js/config';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import layerActions from 'actions/LayerActions';
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

  componentWillUpdate () {
    const {map} = this.context;
    const {layer} = this.props;

    if (map.loaded && !this.initialized) {
      //- Fetch the max date for these requests
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        const mapLayer = map.getLayer(layer.id);
        const data = JSON.parse(xhr.response);
        const maxDateValue = getJulianDateFromGridCode(data.maxValues[0]);
        //- Update the layer if ready, if not it will get updated on first set
        if (mapLayer) {
          mapLayer.setDateRange(layer.minDateValue, maxDateValue);
        }
        //- Get date in normal JS Date format
        const min = new Date(((layer.minDateValue / 1000) + 2000).toString(), 0, 1);
        const max = new Date(((maxDateValue / 1000) + 2000).toString(), 0, maxDateValue % 1000);
        layerActions.updateTerraIStartDate(min);
        layerActions.updateTerraIEndDate(max);
        this.initialized = true;
        this.setState({min, max});
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
          onStart: function () { this.set('select', min);}
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

  componentDidUpdate(prevProps) {

    if (this.initialized) {

      //ensure the startDate is an empty object and not a Date Object
      if ((prevProps.startDate !== this.props.startDate && this.props.startDate.constructor === Object)
      && prevProps.endDate !== this.props.endDate && this.props.endDate.constructor === Object) {
        this.fromPicker.set('select', this.state.min);
        this.toPicker.set('select', this.state.max);
      }
    }
  }

  didSetStartDate = ({select}) => {
    if (select) {
      const startDate = new Date(select);
      layerActions.updateTerraIStartDate(startDate);
      this.updateDateRange(startDate, this.props.endDate);
      if (this.fromPicker && this.toPicker) {
        this.toPicker.set('min', this.fromPicker.get('select'));
      }
    }
  };

  didSetEndDate = ({select}) => {
    if (select) {
      const endDate = new Date(select);
      layerActions.updateTerraIEndDate(endDate);
      this.updateDateRange(this.props.startDate, endDate);
      if (this.fromPicker && this.toPicker) {
        this.fromPicker.set('max', this.toPicker.get('select'));
      }
    }
  };

  updateDateRange = (startDate, endDate) => {
    const {layer} = this.props;
    startDate = startDate.constructor === Date ? startDate : this.state.min;
    endDate = endDate.constructor === Date ? endDate : this.state.max;
    const {map} = this.context;
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
