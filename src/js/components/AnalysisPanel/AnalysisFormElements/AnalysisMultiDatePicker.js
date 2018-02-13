import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';



export default class AnalysisRangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: moment(this.props.defaultStartDate, 'YYYY-MM-DD') || moment(new Date()),
      selectedEndDate: moment(this.props.defaultEndDate, 'YYYY-MM-DD') || moment(new Date()),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedStartDate, selectedEndDate } = this.state;
    const { calendarCallback, analysisId, paramName } = this.props;
    if (prevState.selectedStartDate !== selectedStartDate || prevState.selectedEndDate !== selectedEndDate) {
      calendarCallback(
        selectedStartDate.format('YYYY-MM-DD'),
        analysisId,
        paramName,
        selectedEndDate.format('YYYY-MM-DD')
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
    const { label } = this.props;
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
          minDate={moment('2015-01-01', 'YYYY-MM-DD')}
          maxDate={selectedEndDate}
          selected={selectedStartDate}
          onChange={this.handleStartChange}
        />
        <DatePicker
          customInput={<EndButton />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton='Jump to today'
          minDate={selectedStartDate}
          maxDate={moment(new Date())}
          selected={selectedEndDate}
          onChange={this.handleEndChange}
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
