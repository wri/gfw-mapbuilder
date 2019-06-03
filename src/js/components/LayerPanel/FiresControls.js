import LayersHelper from 'helpers/LayersHelper';
import React, {PropTypes} from 'react';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class FiresControls extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const currentDate = new Date();
    const oneYearAgo = currentDate.setFullYear(currentDate.getFullYear() - 1);
    const max = new Date();

    this.min = moment(oneYearAgo);
    this.max = moment(max);
    this.fireOptions = [
      {label: '24HR', value: '0'},
      {label: '48HR', value: '1'},
      {label: '72HR', value: '2'},
      {label: '7D', value: '3'}
    ];
    this.state = {
      customRange: false,
      activeFireOption: '0',
      activeFireOptionLabel: '24HR'
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {

    if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
      LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer);
    }

    // Anytime the map changes to a new map, update that here
    const {map} = this.context;
    if (prevContext.map !== map && prevContext.map.loaded) {
      const signal = map.on('update-end', () => {
        signal.remove();
        LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer);
      });
    }
  }

  handleStartChange = (startDate) => {
    this.props.updateStartDate(startDate);
  }

  handleEndChange = (endDate) => {
    this.props.updateEndDate(endDate);
  }

  renderActiveFireOptions = fireOptions => {
    return fireOptions.map((fireOption, index) => {
      return <option key={`option-${index}`} value={fireOption.value}>{fireOption.label}</option>;
    });
  };

  updateActiveFires = (evt, fireOptions) => {
    LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer, evt.target.value);
    this.setState({
      activeFireOption: evt.target.value,
      activeFireOptionLabel: fireOptions[evt.target.value].label
    });
  };

  render () {
    const { startDate, endDate } = this.props;
    const {language} = this.context;
    const {customRange, activeFireOption, activeFireOptionLabel} = this.state;
    return (
      <div>
        <div className="active-fires-controls-container">
          <div className="active-fires-time-range timeline-container imazon-controls flex">
            <div className='relative'>
              <select
                className="pointer"
                value={activeFireOption}
                onChange={evt => this.updateActiveFires(evt, this.fireOptions)}
              >
              {this.renderActiveFireOptions(this.fireOptions)}
              </select>
              <div className='fa-button sml white pointer'>{activeFireOptionLabel}</div>
            </div>
          </div>
          <div
            className="fa-button sml white pointer"
            onClick={() => this.setState({
              customRange: !customRange
            })}
          >
            Custom Range
          </div>
        </div>
          {customRange &&
            <div className="active-fires-custom-range-container">
            <div className='fires active-fires-custom-range'>
              <div className='glad-controls__calendars'>
                <div className='glad-controls__calendars--row'>
                  <label>{text[language].TIMELINE_START}</label>
                  <DatePicker
                    customInput={<StartButton />}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton='Jump to today'
                    minDate={this.min}
                    maxDate={moment(endDate)}
                    selected={moment(startDate)}
                    onChange={this.handleStartChange}
                  />
                </div>
                <div className='glad-controls__calendars--row'>
                  <label>{text[language].TIMELINE_END}</label>
                  <DatePicker
                    customInput={<EndButton />}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    todayButton='Jump to today'
                    minDate={moment(startDate)}
                    maxDate={this.max}
                    selected={moment(endDate)}
                    onChange={this.handleEndChange}
                  />
                </div>
              </div>
            </div>
            </div>
          }
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
