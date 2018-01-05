import React, {Component, PropTypes} from 'react';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import layerActions from 'actions/LayerActions';
import 'pickadate';
export default class TerraIControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  initialized = false;
  state = {
    min: new Date('2004', 0, 1),
    max: new Date('2016', 7, 12)
  };

  componentWillUpdate () {
    const {map} = this.context;
    const {min, max} = this.state;

    if (map.loaded && !this.initialized) {
      this.initialized = true;
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
    }
  }

  componentDidUpdate(prevProps) {

    if (this.initialized && prevProps.endDate.getTime) {
      const { startDate, endDate } = this.props;
      //ensure the startDate is an empty object and not a Date Object
      if ((prevProps.startDate !== startDate && startDate.constructor === Object)
      && prevProps.endDate !== endDate && endDate.constructor === Object) {
        this.fromPicker.set('select', this.state.min);
        this.toPicker.set('select', this.state.max);
      }

      if (prevProps.startDate.getTime() !== startDate.getTime()) {
        this.fromPicker.set('select', startDate);
        this.updateDateRange(startDate, this.toPicker.get('select').obj);
      }

      if (prevProps.endDate.getTime() !== endDate.getTime()) {
        this.toPicker.set('select', endDate);
        this.updateDateRange(this.fromPicker.get('select').obj, endDate);
      }
    }
  }

  didSetStartDate = ({select}) => {
    if (select) {
      const startDate = new Date(select);
      layerActions.updateTerraIStartDate.defer(startDate);
      if (this.fromPicker && this.toPicker) {
        this.toPicker.set('min', this.fromPicker.get('select').obj);
      }
    }
  };

  didSetEndDate = ({select}) => {
    if (select) {
      const endDate = new Date(select);
      layerActions.updateTerraIEndDate.defer(endDate);
      if (this.fromPicker && this.toPicker) {
        this.fromPicker.set('max', this.toPicker.get('select').obj);
      }
    }
  };

  updateDateRange = (startDate, endDate) => {
    const {layer} = this.props;
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
