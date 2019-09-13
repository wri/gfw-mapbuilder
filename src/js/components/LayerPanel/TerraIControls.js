import React, {Component, PropTypes} from 'react';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import layerActions from 'actions/LayerActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class TerraIControls extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
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
      const max = moment(new Date('2016', 6, 12));
      this.setState({
        min,
        max
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.initialized) {
      if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
        this.updateDateRange(this.props.startDate, this.props.endDate);
      }
    }
  }

  handleStartChange = (startDate) => {
    layerActions.updateTerraIStartDate(startDate);
  }

  handleEndChange = (endDate) => {
    layerActions.updateTerraIEndDate(endDate);
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
    const { startDate, endDate } = this.props;
    const { min, max } = this.state;
    const {language} = this.context;
    const { customColorTheme, defaultColorTheme } = this.context.settings;
    
    return (
      <div className='terra-i-controls'>
        <div className='terra-i-controls__calendars'>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            {startDate && <DatePicker
              customInput={<StartButton customColorTheme={customColorTheme} defaultColorTheme={defaultColorTheme} />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={min}
              maxDate={moment(endDate)}
              selected={moment(startDate)}
              onChange={this.handleStartChange}
            />}
          </div>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            {endDate && <DatePicker
              customInput={<EndButton customColorTheme={customColorTheme} defaultColorTheme={defaultColorTheme} />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={moment(startDate)}
              maxDate={max}
              selected={moment(endDate)}
              onChange={this.handleEndChange}
            />}
          </div>
        </div>
      </div>
    );
  }
}

const StartButton = ({ onClick, value, customColorTheme, defaultColorTheme }) => {
  return (
    <button
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
      className='fa-button sml white pointer'
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const EndButton = ({ onClick, value, customColorTheme, defaultColorTheme }) => {
  return (
    <button
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
      className='fa-button sml white pointer'
      onClick={onClick}
    >
      {value}
    </button>
  );
};
