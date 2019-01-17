import React, {Component, PropTypes} from 'react';
import layerActions from 'actions/LayerActions';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class FormaControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    //- Defaults
    this.min = moment(new Date('2012', 0, 1));
    this.max = moment(new Date());

  }

  componentDidUpdate(prevProps) {
    if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
      this.updateDateRange();
    }
  }

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
    layerActions.updateFormaStartDate(startDate);
  }

  handleEndChange = (endDate) => {
    layerActions.updateFormaEndDate(endDate);
  }

  render () {
    const {startDate, endDate} = this.props;
    const {language} = this.context;

    return (
      <div className='glad-controls forma-controls'>
        <div className='glad-controls__calendars glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            {startDate && <DatePicker
              customInput={<StartButton />}
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
              customInput={<EndButton />}
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
