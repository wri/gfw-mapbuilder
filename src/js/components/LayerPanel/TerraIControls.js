import React, {Component, PropTypes} from 'react';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import layerActions from 'actions/LayerActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class TerraIControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  initialized = false;
  state = {};

  componentWillUpdate () {
    const {map} = this.context;

    if (map.loaded && !this.initialized) {
      this.initialized = true;
      const min = moment(new Date('2004', 0, 1));
      const max = moment(new Date('2016', 7, 12));
      this.setState({
        min,
        max,
        startDate: min,
        endDate: max
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.initialized) {
      if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
        this.setState({
          startDate: moment(this.props.startDate),
          endDate: moment(this.props.endDate)
        });
      }

      if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
        this.updateDateRange(this.state.startDate, this.state.endDate);
      }
    }
  }

  handleStartChange = (startDate) => {
    layerActions.updateTerraIStartDate(startDate);
    this.setState({ startDate });
  }

  handleEndChange = (endDate) => {
    layerActions.updateTerraIEndDate(endDate);
    this.setState({ endDate });
  }

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
    const { startDate, endDate, min, max } = this.state;
    const {language} = this.context;

    return (
      <div className='terra-i-controls'>
        <div className='terra-i-controls__calendars'>
          <div className='terra-i-controls__calendars--row'>
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
              minDate={min}
              maxDate={endDate}
              selected={startDate}
              onChange={this.handleStartChange}
            />
          </div>
          <div className='terra-i-controls__calendars--row'>
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
              maxDate={max}
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
