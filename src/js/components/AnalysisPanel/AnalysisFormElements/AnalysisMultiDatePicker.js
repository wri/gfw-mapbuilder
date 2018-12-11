import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';



export default class AnalysisMultiDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: moment(props.defaultStartDate, 'YYYY-MM-DD') || moment(new Date()),
      selectedEndDate: moment(props.defaultEndDate, 'YYYY-MM-DD') || moment(new Date()),
    };
  }

  componentDidMount() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const {
      calendarCallback,
      analysisId,
      startParamName,
      endParamName,
      multi,
      valueSeparator,
      combineParams
    } = this.props;

    calendarCallback(
      selectedStartDate.format('YYYY-MM-DD'),
      selectedEndDate.format('YYYY-MM-DD'),
      analysisId,
      combineParams,
      multi,
      startParamName,
      endParamName,
      valueSeparator,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedStartDate, selectedEndDate } = this.state;
    const {
      calendarCallback,
      analysisId,
      startParamName,
      endParamName,
      multi,
      valueSeparator,
      combineParams
    } = this.props;

    if (prevState.selectedStartDate !== selectedStartDate || prevState.selectedEndDate !== selectedEndDate) {
      calendarCallback(
        selectedStartDate.format('YYYY-MM-DD'),
        selectedEndDate.format('YYYY-MM-DD'),
        analysisId,
        combineParams,
        multi,
        startParamName,
        endParamName,
        valueSeparator,
      );
    }
  }

  handleStartChange = date => {
    this.setState({
      selectedStartDate: date,
    });
  }

  handleEndChange = date => {
    this.setState({
      selectedEndDate: date,
    });
  }

  render() {
    const { label, minDate, maxDate } = this.props;
    const { selectedStartDate, selectedEndDate } = this.state;

    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <DatePicker
          customInput={<StartButton />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton='Jump to today'
          minDate={moment(minDate)}
          maxDate={selectedEndDate}
          selected={selectedStartDate}
          onChange={this.handleStartChange}
          popperPlacement='bottom-start'
          popperModifiers={{
            flip: {
              enabled: false
            }
          }}

        />
        <DatePicker
          customInput={<EndButton />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton='Jump to today'
          minDate={selectedStartDate}
          maxDate={moment(maxDate || new Date())}
          selected={selectedEndDate}
          onChange={this.handleEndChange}
          popperPlacement='bottom-start'
          popperModifiers={{
            flip: {
              enabled: false
            }
          }}

        />
      </div>
    );
  }
}

const StartButton = ({ onClick, value }) => (
  <div>
    <label className='analysis-datepicker-button-label'>Start: </label>
    <button
    className='fa-button sml white pointer'
    onClick={onClick}
    >
    {value}
    </button>
  </div>
);

const EndButton = ({ onClick, value }) => (
  <div>
    <label className='analysis-datepicker-button-label'>End: </label>
    <button
    className='fa-button sml white pointer'
    onClick={onClick}
    >
    {value}
    </button>
  </div>
);
