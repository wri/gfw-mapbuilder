import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default class AnalysisDatePicker extends Component {
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

    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <div className="report-date-picker">
          <DatePicker
            customInput={<Button />}
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

const Button = ({ onClick, value }) => (
  <div>
    <label className='analysis-datepicker-button-label'>Date: </label>
    <button
    className='fa-button sml white pointer'
    onClick={onClick}
    >
    {value}
    </button>
  </div>
);
