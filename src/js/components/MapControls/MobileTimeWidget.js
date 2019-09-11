import React, {Component, PropTypes} from 'react';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';
import resources from '../../../resources';

const START = 'START',
      END = 'END';

export default class MobileTimeWidget extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);

    const {timeInfo} = props;
    const start = new Date(timeInfo.timeExtent[0]).getFullYear();
    const end = new Date(timeInfo.timeExtent[1]).getFullYear();
    const values = [];
    // Create the array of options
    for (let i = start; i <= end; i++) { values.push(i); }
    this.state = { values };
  }

  optionMapper = (options) => {
    const {type, start, end} = options;
    // Label, Start, and End are all numeric year values, e.g. 2000, 2001, etc
    return (label, index) => {
      const disabled = type === START ? label >= end : label <= start;
      return <option key={index} value={label} disabled={disabled}>{label}</option>;
    };
  };

  updateTimeExtentStart = ({target}) => {
    const {currentTimeExtent} = this.props;
    mapActions.updateTimeExtent({
      start: +target.value,
      end: currentTimeExtent.end
    });
  };

  updateTimeExtentEnd = ({target}) => {
    const {currentTimeExtent} = this.props;
    mapActions.updateTimeExtent({
      start: currentTimeExtent.start,
      end: +target.value
    });
  };

  render () {
    const {language} = this.context;
    const {values} = this.state;
    const {
      visible,
      currentTimeExtent
    } = this.props;
    const { customColorTheme, defaultColorTheme } = resources;

    return (
      <div className={`mobile-time-widget map-component mobile-show ${visible ? '' : 'hidden'}`}>
        <div title='close' className='close-icon pointer' onClick={mapActions.toggleMobileTimeWidgetVisible}>
          <svg className='svg-icon'>
            <SVGIcon id={'shape-close'} />
          </svg>
        </div>
        <div className='timeline-container flex'>
          <div className='time-widget__select-label'>{text[language].TIMELINE_START}</div>
          <div className='relative'>
            <select onChange={this.updateTimeExtentStart} value={currentTimeExtent.start}>
              {values.map(this.optionMapper({ type: START, ...currentTimeExtent}))}
            </select>
            <div
              style={{border: `1px solid ${customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
              className='fa-button sml white'
            >
              {currentTimeExtent.start}
            </div>
          </div>
          <div className='time-widget__select-label'>{text[language].TIMELINE_END}</div>
          <div className='relative'>
            <select onChange={this.updateTimeExtentEnd} value={currentTimeExtent.end}>
              {values.map(this.optionMapper({ type: END, ...currentTimeExtent}))}
            </select>
            <div
              style={{border: `1px solid ${customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
              className='fa-button sml white'
            >
              {currentTimeExtent.end}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
