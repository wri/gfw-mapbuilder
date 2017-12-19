import TimeSlider from 'esri/dijit/TimeSlider';
import mapActions from 'actions/MapActions';
import TimeExtent from 'esri/TimeExtent';
import React, {Component} from 'react';

/**
* Make a date object for time extent using a year, date should be Dec 31 for the given year
*/
const makeDate = (year) => {
  return new Date(new Date(0).setYear(year));
};

/**
* @param {string|number|Date} startTime - something that can synthesize a valid date
* @param {string|number|Date} endTime - something that can synthesize a valid date
*/
const createTimeExtent = (startTime, endTime) => {
  return new TimeExtent(
    new Date(startTime),
    new Date(endTime)
  );
};

const getYear = (timestamp) => {
  return new Date(timestamp).getFullYear();
};

export default class TimeWidget extends Component {

  componentDidMount () {
    const {timeInfo, sliderProps} = this.props;
    // Create a default time extent based on the layers time info
    const timeExtent = createTimeExtent(timeInfo.timeExtent[0], timeInfo.timeExtent[1]);
    mapActions.updateTimeExtent({
      start: timeExtent.startTime.getFullYear(),
      end: timeExtent.startTime.getFullYear()
    });
    // Create the slider and set some defaults
    this.slider = new TimeSlider({ style: 'width: 100%;'}, this.refs.timeSlider);
    this.slider.setThumbCount(sliderProps.thumbCount);
    this.slider.createTimeStopsByTimeInterval(timeExtent, sliderProps.timeStopInterval.interval, sliderProps.timeStopInterval.units);
    const labels = this.slider.timeStops.map(time => time.getFullYear());
    this.slider.setLabels(labels);
    this.slider.setThumbIndexes([labels.indexOf(getYear(timeExtent.startTime)), labels.indexOf(getYear(timeExtent.endTime))]);
    this.slider.setLoop(true);
    this.slider.setThumbMovingRate(2000);
    //- Remove Next and Previous Buttons
    this.slider.nextBtn.domNode.style.display = 'none';
    this.slider.previousBtn.domNode.style.display = 'none';
    this.slider.startup();
    //- Wire up any events necessary
    this.slider.on('time-extent-change', (extent) => {
      // Time Extent is just year values, this makes it much easier to manipulate on mobile
      // so only this module needs to use the TimeExtent constructor
      mapActions.updateTimeExtent({
        start: extent.startTime.getFullYear(),
        end: extent.endTime.getFullYear()
      });
    });
    //- Change the align attribute of the playbutton
    var tableNode = document.querySelector('.esriTimeSlider td:first-child');
    if (tableNode && tableNode.setAttribute) {
      tableNode.setAttribute('align', 'middle');
    }
    // const node = $(this.refs.timeSlider);
    // const startYear = getYear(timeInfo.timeExtent[0]);
    // const endYear = getYear(timeInfo.timeExtent[1]);
    // const values = [];
    //
    // // Create a list of explicit values, which is a range from startYear to endYear
    // for (let i = startYear; i <= endYear; i++) {
    //   values.push(i);
    // }
    //
    // node.ionRangeSlider({
    //   type: 'double',
    //   hide_min_max: true,
    //   values: values,
    //   grid: true,
    //   onFinish: this.sliderChanged
    // });
  }

  componentDidUpdate (prevProps) {
    const {currentTimeExtent, map} = this.props;
    const prevExtent = prevProps.currentTimeExtent;
    const {start, end} = currentTimeExtent;
    // Check if start or end time changed
    if (
      start !== prevExtent.start ||
      end !== prevExtent.end
    ) {
      // If the slider does not have the same extent as currentTimeExtent
      // This update was triggered by the mobile time widget, update the thumbIndexes so they are in sync
      const sliderExtent = this.slider.getCurrentTimeExtent();
      const sliderStart = sliderExtent.startTime.getFullYear();
      const sliderEnd = sliderExtent.endTime.getFullYear();
      if (sliderStart !== start || sliderEnd !== end) {
        const {labels} = this.slider;
        this.slider.setThumbIndexes([labels.indexOf(start), labels.indexOf(end)]);
      }
      //- Current Time Extent is a Year Value Only, we want to force it to be on Dec.31st
      //- makeDate will turn 2000 into a Date object set to Dec 31, 2000
      const timeExtent = createTimeExtent(makeDate(start), makeDate(end));
      map.setTimeExtent(timeExtent);
    }
  }

  render () {
    return (
      <div className='time-widget map-component shadow mobile-hide'>
        <div ref='timeSlider'></div>
      </div>
    );
  }
}
