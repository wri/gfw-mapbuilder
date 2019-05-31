import LayersHelper from 'helpers/LayersHelper';
import React, {PropTypes} from 'react';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

let startCount = 0;

let endCount = 0;
export default class FiresControls extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const currentDate = new Date();
    const oneYearAgo = currentDate.setFullYear(currentDate.getFullYear() - 1);
    this.min = moment(oneYearAgo);
    console.log('min', this.min);
    const max = new Date();
    this.max = moment(max);
    console.log('max', this.max);
    
    
    this.state = {
      customRange: false,
      activeFireOption: 0
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
  
  renderActiveFireOptions = () => {
    const fireOptions = [
    {label: '24HR', value: 0},
    {label: '48HR', value: 1},
    {label: '72HR', value: 2},
    {label: '7D', value: 3}
    ];
    return fireOptions.map(fireOption => {
      return <option value={fireOption.value}>{fireOption.label}</option>
    });
  };
  
  updateActiveFires = evt => {
    LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer, evt.target.value);
    this.setState({
      activeFireOption: evt.target.value
    });
  };

  render () {
    const { startDate, endDate } = this.props;
    const {language} = this.context;
    const {customRange} = this.state;

    return (
        <div>
          <div className="select">
            <select
            value={this.state.activeFireOption}
            onChange={evt => this.updateActiveFires(evt)}
            >
            {this.renderActiveFireOptions()}
            </select>
            
          </div>
          <button
          className="custom-range-button"
          onClick={() => this.setState({
            customRange: !customRange
          })}
          >
            Custom Range
          </button>
          {customRange &&
            <div className='fires'>
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
