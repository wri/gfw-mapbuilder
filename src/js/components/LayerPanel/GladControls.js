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
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    //- Defaults
    this.min = moment(new Date('2015', 0, 1));
    this.max = moment(new Date());

    this.state = {
      unconfirmed: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
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
    const { startDate, endDate } = this.props;
    const { map } = this.context;

    const julianFrom = utils.getJulianDate(startDate);
    const julianTo = utils.getJulianDate(endDate);
    if (map.getLayer && map.getLayer(layer.id)) {
      map.getLayer(layer.id).setDateRange(julianFrom, julianTo);
    }
  };

  handleStartChange = (startDate) => {
    layerActions.updateGladStartDate(startDate);
  }

  handleEndChange = (endDate) => {
    layerActions.updateGladEndDate(endDate);
  }

  render () {
    const {startDate, endDate} = this.props;
    const {unconfirmed} = this.state;
    const {language} = this.context;
    const { customColorTheme } = this.context.settings;
    
    return (
      <div className='glad-controls'>
        <ToggleSwitch label='Hide unconfirmed alerts' checked={unconfirmed} onChange={this.toggleConfirmedAlerts} />
        <div className='glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            {startDate && <DatePicker
              customInput={<StartButton customColorTheme={customColorTheme} />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={this.min}
              maxDate={moment(endDate)}
              selected={moment(startDate)}
              onChange={this.handleStartChange}
            />}
          </div>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            {endDate && <DatePicker
              customInput={<EndButton customColorTheme={customColorTheme} />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={moment(startDate)}
              maxDate={this.max}
              selected={moment(endDate)}
              onChange={this.handleEndChange}
            />}
          </div>
        </div>
      </div>
    );
  }
}

const StartButton = ({ onClick, value, customColorTheme }) => {
  return (
    <button
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : '#F0AB00'}`}}
      className='fa-button sml white pointer'
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const EndButton = ({ onClick, value, customColorTheme }) => {
  return (
    <button
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : '#F0AB00'}`}}
      className='fa-button sml white pointer'
      onClick={onClick}
    >
      {value}
    </button>
  );
};
