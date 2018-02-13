import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';



export default class AnalysisRangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: props.defaultSelected ? moment(props.defaultSelected, 'YYYY-MM-DD') : moment(new Date()),
    };
  }

  componentDidMount() {
    const { calendarCallback, analysisId, paramName } = this.props;
    const { dateSelected } = this.state;
    calendarCallback(dateSelected.format('YYYY-MM-DD'), analysisId, paramName);
  }

  handleChange = date => {
    const { calendarCallback, analysisId, paramName } = this.props;
    calendarCallback(date.format('YYYY-MM-DD'), analysisId, paramName);
  }

  render() {
    const { label, id, buttonLabel } = this.props;
    const { dateSelected } = this.props;

    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <DatePicker
          customInput={<Button id={id} buttonLabel={buttonLabel} />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton='Jump to today'
          minDate={moment('2015-01-01', 'YYYY-MM-DD')}
          maxDate={moment(new Date())}
          selected={dateSelected}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const Button = ({ onClick, value, id, buttonLabel }) => (
  <div>
    <label htmlFor={id} className='analysis-datepicker-button-label'>{buttonLabel}</label>
    <button
    id={id}
    className='fa-button sml white pointer'
    onClick={onClick}
    >
    {value}
    </button>
  </div>
);
