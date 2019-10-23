import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {defaultColorTheme} from '../../../config';



export default class AnalysisDatePicker extends Component {
  static contextTypes = {
    settings: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: props.defaultSelected ? moment(props.defaultSelected, 'YYYY-MM-DD') : moment(new Date()),
    };
  }

  componentDidMount() {
    const { dateSelected } = this.state;
    const {
      calendarCallback,
      analysisId,
      startParamName,
      multi,
      combineParams
    } = this.props;

    calendarCallback(
      dateSelected.format('YYYY-MM-DD'),
      null,
      analysisId,
      combineParams,
      multi,
      startParamName,
      null,
      null,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { dateSelected } = this.state;
    const {
      calendarCallback,
      analysisId,
      startParamName,
      multi,
      combineParams
    } = this.props;

    if (prevState.dateSelected !== dateSelected) {
      calendarCallback(
        dateSelected.format('YYYY-MM-DD'),
        null,
        analysisId,
        combineParams,
        multi,
        startParamName,
        null,
        null,
      );
    }
  }

  handleChange = dateSelected => {
    this.setState({ dateSelected });
  }

  render() {
    const { label, minDate, maxDate } = this.props;
    const { dateSelected } = this.state;
    const { customColorTheme } = this.context.settings;
    
    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <div className="report-date-picker">
          <DatePicker
            customInput={<Button customColorTheme={customColorTheme} />}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            todayButton='Jump to today'
            minDate={moment(minDate)}
            maxDate={moment(maxDate || new Date())}
            selected={dateSelected}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const Button = ({ onClick, value, customColorTheme }) => {
  return (<div>
    <label className='analysis-datepicker-button-label'>Date: </label>
    <button
    style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
    className='fa-button sml white pointer'
    onClick={onClick}
    >
    {value}
    </button>
  </div>);
};
