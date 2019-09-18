import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

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
    const { minDate, maxDate } = this.props;
    const { dateSelected } = this.state;
    const {customColorTheme, defaultColorTheme} = this.context.settings;

    return (
      <div className='analysis-results__select-form-item-container'>
        <DatePicker
          customInput={<Button customColorTheme={customColorTheme} defaultColorTheme={defaultColorTheme} />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton='Jump to today'
          minDate={moment(minDate)}
          maxDate={moment(maxDate || new Date())}
          selected={dateSelected}
          onChange={this.handleChange}
          popperPlacement='bottom'
          popperModifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: false
            }
          }}

        />
      </div>
    );
  }
}

const Button = ({ onClick, value, customColorTheme, defaultColorTheme }) => {
  return (
    <div>
      <button
        style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
        className='fa-button sml white pointer'
        onClick={onClick}
      >
      {value}
      </button>
    </div>
  );
};
