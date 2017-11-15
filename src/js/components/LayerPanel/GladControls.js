import ToggleSwitch from 'components/Shared/ToggleSwitch';
import React, {Component, PropTypes} from 'react';
import layerActions from 'actions/LayerActions';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import 'pickadate';

export default class GladControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    //- Defaults
    this.min = new Date('2015', 0, 1);
    this.max = new Date();

    this.state = {
      unconfirmed: false
    };
  }

  componentDidMount () {
    //- Create the date pickers
    const {fromCalendar, toCalendar} = this.refs;
    const {startDate, endDate} = this.props;
    //- Starting date
    this.fromPicker = $(fromCalendar).pickadate({
      today: 'Jump to today',
      min: this.min,
      max: this.max,
      selectYears: true,
      selectMonths: true,
      closeOnSelect: true,
      klass: { picker: 'picker__top' },
      onSet: this.didSetStartDate,
      onStart: function () { this.set('select', startDate); }
    }).pickadate('picker');
    //- Ending date
    this.toPicker = $(toCalendar).pickadate({
      today: 'Jump to today',
      min: this.min,
      max: this.max,
      selectYears: true,
      selectMonths: true,
      closeOnSelect: true,
      klass: { picker: 'picker__top' },
      onSet: this.didSetEndDate,
      onStart: function () { this.set('select', endDate); }
    }).pickadate('picker');
  }

  componentDidUpdate(prevProps) {
    if ((Date.parse(prevProps.startDate) !== Date.parse(this.props.startDate)) || (Date.parse(prevProps.endDate) !== Date.parse(this.props.endDate))) {
      this.updateDateRange();
      this.toPicker.set('select', this.props.endDate);
      this.fromPicker.set('select', this.props.startDate);
    }
  }

  didSetStartDate = ({select}) => {
    if (select) {
      const startDate = new Date(select);
      layerActions.updateGladStartDate.defer(startDate);
      if (this.fromPicker && this.toPicker) {
        this.toPicker.set('min', this.fromPicker.get('select'));
      }
    }
  };

  didSetEndDate = ({select}) => {
    if (select) {
      const endDate = new Date(select);
      layerActions.updateGladEndDate.defer(endDate);
      if (this.fromPicker && this.toPicker) {
        this.fromPicker.set('max', this.toPicker.get('select'));
      }
    }
  };

  toggleConfirmedAlerts = () => {
    this.setState({ unconfirmed: !this.state.unconfirmed });
    const {map} = this.context;
    const {layer} = this.props;
    const confirmation = this.state.unconfirmed ? 'all' : 'confirmed';
    map.getLayer(layer.id).setConfidenceLevel(confirmation);
  };

  updateDateRange = () => {
    const {startDate, endDate, layer} = this.props;
    const {map} = this.context;
    const julianFrom = utils.getJulianDate(startDate);
    const julianTo = utils.getJulianDate(endDate);
    if (map.getLayer) {
      map.getLayer(layer.id).setDateRange(julianFrom, julianTo);
    }
  };

  render () {
    const {unconfirmed} = this.state;
    const {language} = this.context;

    return (
      <div className='glad-controls'>
        <ToggleSwitch label='Hide unconfirmed alerts' checked={unconfirmed} onChange={this.toggleConfirmedAlerts} />
        <div className='glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <input className='fa-button sml white pointer' type='text' ref='fromCalendar' />
          </div>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <input className='fa-button sml white pointer' type='text' ref='toCalendar' />
          </div>
        </div>
      </div>
    );
  }

}
