import React, {Component, PropTypes} from 'react';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import layerActions from 'actions/LayerActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/**
* Same function that is in the layer, but the layer is not always loaded when the data is back from the server
*/
const getJulianDateFromGridCode = function getJulianDateFromGridCode (gridCode) {
  const {year, day} = utils.getDateFromGridCode(gridCode);
  return ((year % 2000) * 1000) + day;
};

export default class TerraIControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.initialized = false;
    this.state = {};
  }

  componentWillUpdate () {
    const {map} = this.context;
    const {layer} = this.props;

    if (map.loaded && !this.initialized) {
      //- Fetch the max date for these requests
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        const mapLayer = map.getLayer(layer.id);
        const data = JSON.parse(xhr.response);
        const maxDateValue = getJulianDateFromGridCode(data.maxValues[0]);
        //- Update the layer if ready, if not it will get updated on first set
        if (mapLayer) {
          mapLayer.setDateRange(layer.minDateValue, maxDateValue);
        }
        //- Get date in normal JS Date format
        const min = moment(new Date(((layer.minDateValue / 1000) + 2000).toString(), 0, 1));
        const max = moment(new Date(((maxDateValue / 1000) + 2000).toString(), 0, maxDateValue % 1000));
        layerActions.updateTerraIStartDate(min);
        layerActions.updateTerraIEndDate(max);
        this.initialized = true;
        this.setState({
          min,
          max,
          startDate: min,
          endDate: max
        });
      });
      xhr.open('GET', `${layer.imageServer}?f=json`, true);
      xhr.send();
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.initialized) {
      if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
      this.updateDateRange(this.state.startDate, this.state.endDate);
      }
    }
  }

  handleStartChange = (startDate) => {
    layerActions.updateTerraIStartDate(startDate);
    this.setState({ startDate });
  }

  handleEndChange = (endDate) => {
    layerActions.updateTerraIEndDate(endDate);
    this.setState({ endDate });
  }

  updateDateRange = (startDate, endDate) => {
    const {layer} = this.props;
    const {map} = this.context;
    const julianFrom = utils.getJulianDate(startDate);
    const julianTo = utils.getJulianDate(endDate);
    if (map.getLayer && map.getLayer(layer.id)) {
      map.getLayer(layer.id).setDateRange(julianFrom, julianTo);
    }
  };



  render () {
    const { startDate, endDate, min, max } = this.state;
    const {language} = this.context;

    return (
      <div className='terra-i-controls'>
        <div className='terra-i-controls__calendars'>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <DatePicker
              customInput={<StartButton />}
              popperPlacement="top-end"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '30px'
                }
              }}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={min}
              maxDate={endDate}
              selected={startDate}
              onChange={this.handleStartChange}
            />
          </div>
          <div className='terra-i-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <DatePicker
              customInput={<EndButton />}
              popperPlacement="top-end"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '30px'
                }
              }}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={startDate}
              maxDate={max}
              selected={endDate}
              onChange={this.handleEndChange}
            />
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
