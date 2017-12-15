import LayersHelper from 'helpers/LayersHelper';
import React, {PropTypes} from 'react';
import text from 'js/languages';
import 'pickadate';

let startCount = 0;

let endCount = 0;
export default class FiresControls extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.min = props.layer.id === 'VIIRS_ACTIVE_FIRES' ? new Date('2016', 0, 8) : new Date('2012', 0, 1);
    this.max = new Date();
  }

  componentDidMount() {

    //- Create the date pickers
    const { fromCalendar, toCalendar } = this.refs;
    const { startDate, endDate } = this.props;

    //- Starting date
    this.fromPicker = $(fromCalendar).pickadate({
      // from: this.props.lossFromSelectIndex,
      // to: this.props.lossToSelectIndex,
      today: 'Jump to today',
      min: this.min,
      max: this.max,
      selectYears: true,
      selectMonths: true,
      closeOnSelect: true,
      klass: { picker: 'picker__top' },
      onSet: this.didSetStartDate,
      onStart: function () { this.set('select', startDate); }
    }).pickadate('picker');
    //- Ending date
    this.toPicker = $(toCalendar).pickadate({
      today: 'Jump to today',
      min: this.min,
      max: this.max,
      selectYears: true,
      selectMonths: true,
      closeOnSelect: true,
      klass: { picker: 'picker__top' },
      onSet: this.didSetEndDate,
      onStart: function () { this.set('select', endDate); }
    }).pickadate('picker');
  }

  componentDidUpdate(prevProps, prevState, prevContext) {

    const { startDate, endDate } = this.props;

    // if ((Date.parse(prevProps.startDate) !== Date.parse(this.props.startDate)) || (Date.parse(prevProps.endDate) !== Date.parse(this.props.endDate))) {
    if (prevProps.startDate.getTime() !== startDate.getTime() || prevProps.endDate.getTime() !== endDate.getTime()) {
      if (prevProps.startDate.getTime() !== startDate.getTime()) {
        this.fromPicker.set('select', this.props.startDate);

        // startCount++;
        //
        // console.log('start');
        // console.log(this.props.startDate);
        // console.log(this.props.endDate);
        // console.log('');
      }

      if (prevProps.endDate.getTime() !== endDate.getTime()) {
        this.toPicker.set('select', this.props.endDate);

        // console.log('end');
        // console.log(this.props.startDate);
        // console.log(this.props.endDate);
        // console.log('');
        // // console.log(prevProps.endDate);
        // // console.log(this.props.endDate);
        // endCount++;
      }
      // console.log(this.props.startDate);
      // console.log(prevProps.startDate);
      // setTimeout(function () {
      //   console.log(startCount);
      //   console.log(endCount);
      //   debugger
      // }, 3000);
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

  didSetStartDate = ({ select }) => {
    if (select) {
      const startDate = new Date(select);
      // console.log('didSetStartDate', startDate);
      this.props.updateStartDate.defer(startDate);
      if (this.fromPicker && this.toPicker) {
        this.toPicker.set('min', this.fromPicker.get('select'));
      }
    }
  };

  didSetEndDate = ({ select }) => {
    if (select) {
      const endDate = new Date(select);
      // console.log('didSetEndDate', endDate);
      this.props.updateEndDate.defer(endDate);
      if (this.fromPicker && this.toPicker) {
        this.fromPicker.set('max', this.toPicker.get('select'));
      }
    }
  };

  optionsMap(item, index) {
    return <option key={index} value={item.value}>{item.label}</option>;
  }

  render () {
    const {language} = this.context;

    return (
      <div className='relative fires'>
        <div className='glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <input className='fa-button sml white pointer' type='text' ref='fromCalendar' />
          </div>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <input className='fa-button sml white pointer' type='text' ref='toCalendar' />
          </div>
        </div>
      </div>
    );
  }
}
