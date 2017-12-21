import ToggleSwitch from 'components/Shared/ToggleSwitch';
import React, {Component, PropTypes} from 'react';
import layerActions from 'actions/LayerActions';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class GladControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    //- Defaults
    this.min = moment(new Date('2015', 0, 1));
    this.max = moment(new Date());

    this.state = {
      unconfirmed: false,
      startDate: this.min,
      endDate: this.max
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if ((Date.parse(prevState.startDate) !== Date.parse(this.state.startDate)) || (Date.parse(prevState.endDate) !== Date.parse(this.state.endDate))) {
      this.updateDateRange();
    }
  }

  toggleConfirmedAlerts = () => {
    this.setState({ unconfirmed: !this.state.unconfirmed });
    const {map} = this.context;
    const {layer} = this.props;
    const confirmation = this.state.unconfirmed ? 'all' : 'confirmed';
    map.getLayer(layer.id).setConfidenceLevel(confirmation);
  };

  updateDateRange = () => {
    const { layer } = this.props;
    const { startDate, endDate } = this.state;
    const { map } = this.context;

    const julianFrom = utils.getJulianDate(startDate);
    const julianTo = utils.getJulianDate(endDate);
    layerActions.updateGladStartDate(startDate);
    layerActions.updateGladEndDate(endDate);
    if (map.getLayer && map.getLayer(layer.id)) {
      map.getLayer(layer.id).setDateRange(julianFrom, julianTo);
    }
  };

  handleStartChange = (startDate) => {
    this.setState({ startDate });
  }

  handleEndChange = (endDate) => {
    this.setState({ endDate });
  }

  render () {
    const {unconfirmed, startDate, endDate} = this.state;
    const {language} = this.context;

    return (
      <div className='glad-controls'>
        <ToggleSwitch label='Hide unconfirmed alerts' checked={unconfirmed} onChange={this.toggleConfirmedAlerts} />
        <div className='glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <DatePicker
              customInput={<StartButton />}
              popperPlacement="top-end"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '30px'
                }
              }}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={this.min}
              maxDate={endDate}
              selected={startDate}
              onChange={this.handleStartChange}
            />
          </div>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <DatePicker
              customInput={<EndButton />}
              popperPlacement="top-end"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '30px'
                }
              }}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={startDate}
              maxDate={this.max}
              selected={endDate}
              onChange={this.handleEndChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const StartButton = ({ onClick, value }) => (
  <button
    className='fa-button sml white pointer'
    onClick={onClick}
  >
    {value}
  </button>
);

const EndButton = ({ onClick, value }) => (
  <button
    className='fa-button sml white pointer'
    onClick={onClick}
  >
    {value}
  </button>
);
