import LayersHelper from 'helpers/LayersHelper';
import React, {PropTypes} from 'react';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {defaultColorTheme} from '../../config';
import layerActions from '../../actions/LayerActions';
import MapStore from '../../stores/MapStore';

export default class FiresControls extends React.Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
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
      {label: '', value: 0},
      {label: 'Past 24 hours', value: 1},
      {label: 'Past 48 hours', value: 2},
      {label: 'Past 72 hours', value: 3},
      {label: 'Past Week', value: 4}
    ];
    this.state = {
      ...MapStore.getState()
    };
  }
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
      brApp.map.infoWindow.clearFeatures();
      LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer, 5);
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
      return <option key={`option-${index}`} style={index === 0 ? {display: 'none'} : {}} value={fireOption.value}>{fireOption.label}</option>;
    });
  };

  updateActiveFires = (evt, fireOptions) => {
    brApp.map.infoWindow.clearFeatures();
    LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer, evt.target.value);
    layerActions.updateCustomRange(false);
    layerActions.updateActiveFireOption(parseInt(evt.target.value));
    layerActions.updateActiveFireOptionLabel(fireOptions[parseInt(evt.target.value)].label);
  };

  render () {
    const { startDate, endDate } = this.props;
    const {language} = this.context;
    const {customRange, activeFireOption, activeFireOptionLabel} = this.state;
    const { customColorTheme } = this.context.settings;
    return (
      <div>
        <div className="active-fires-controls-container">
          <div className="active-fires-time-range timeline-container imazon-controls flex">
            <div className='relative'>
              <select
                className='pointer'
                value={activeFireOption}
                onChange={evt => this.updateActiveFires(evt, this.fireOptions)}
              >
              {this.renderActiveFireOptions(this.fireOptions)}
              </select>
              <div
                style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
                className='fa-button sml white pointer'>{activeFireOptionLabel}
              </div>
            </div>
          </div>
          <div
            style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className="fa-button sml white pointer"
            onClick={() => {
                layerActions.updateCustomRange(!customRange);
                layerActions.updateActiveFireOptionLabel('Defined Range');
                layerActions.updateActiveFireOption(0);
              }
            }
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
                    customInput={<StartButton customColorTheme={customColorTheme} />}
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
                    customInput={<EndButton customColorTheme={customColorTheme} />}
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

const StartButton = ({ onClick, value, customColorTheme }) => {
  return (
    <button
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
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
      style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
      className='fa-button sml white pointer'
      onClick={onClick}
    >
      {value}
    </button>
  );
};
