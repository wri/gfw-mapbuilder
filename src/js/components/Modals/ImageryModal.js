import DraggableModalWrapper from 'components/Modals/DraggableModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import ImageryModalSlider from 'components/SatelliteImagery/ImageryModalSlider';
import ImageryDatePicker from 'components/SatelliteImagery/ImageryDatePicker';
import ScreenPoint from 'esri/geometry/ScreenPoint';
import moment from 'moment';
import Loader from 'components/Loader';

import { modalText } from 'js/config';

export default class ImageryModal extends Component {

  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      monthsVal: modalText.imagery.monthsOptions[1].label,
      imageStyleVal: modalText.imagery.imageStyleOptions[0].label,
      cloudScore: [0, 100]
    };
  }

  selectThumbnail (tileObj, i) {
    // console.log('HERE', tileObj)
    this.setState({ selectedThumb: i });
  }

  hoverThumbnail (tileObj) {
    this.setState({ hoveredThumb: tileObj });
  }

  renderDropdownOptions = (option, index) => {
    return <option key={index} value={option.label}>{option.label}</option>;
  }

  renderThumbnails = (tileObj, i) => {
    return (
      <div
        onClick={() => this.selectThumbnail(tileObj, i)}
        onMouseOver={() => this.hoverThumbnail(tileObj)}
        className={`thumbnail ${this.state.selectedThumb === i ? 'selected' : ''}`}
        key={`thumb-${i}`}>
          <img src={tileObj.thumbUrl} />
      </div>
    );
  }

  renderThumbText = () => {
    const { hoveredThumb } = this.state;
    return (
      <div>
        <p>{moment(hoveredThumb.attributes.date_time).format('DD MMM YYYY')}</p>
        <p>{`${hoveredThumb.attributes.cloud_score.toFixed(1)}% cloud coverage`}</p>
        <p>{hoveredThumb.attributes.instrument.replace('_', ' ')}</p>
      </div>
    );
  };

  close = () => {
    this.setState({
      monthsVal: modalText.imagery.monthsOptions[1].label,
      imageStyleVal: modalText.imagery.imageStyleOptions[0].label,
      cloudScore: [0, 100],
      start: null,
      end: null,
      selectedThumb: null
    });
    mapActions.toggleImageryVisible(false);
  };

  onChangeStart = (event) => {
    const value = parseInt(event.target.value.split(' ')[0]);
    const type = value === 4 ? 'weeks' : 'months';

    const end = this.state.end ? moment(this.state.end) : moment();
    const start = end.subtract(value, type).format('YYYY-MM-DD');

    this.setState({ start, monthsVal: event.target.value, selectedThumb: null }, this.updateImagery);
  }

  onChangeEnd = (end) => {
    this.setState({ end, selectedThumb: null }, this.updateImagery);
  }

  onChangeImageStyle = (event) => {
    const value = event.target.value;
    this.setState({ imageStyleVal: value, selectedThumb: null }, this.updateImagery);
  }

  rangeSliderCallback = (range) => {
    this.setState({ cloudScore: range, selectedThumb: null });
  }


  onDragEnd = (event) => {
    event.target.style.top = event.clientY;
    event.target.style.left = event.clientX;
  };

  updateImagery = () => {
    const { map } = this.context;
    const { start, end, imageStyleVal } = this.state;

    const xVal = window.innerWidth / 2;
    const yVal = window.innerHeight / 2;

    // Create new screen point at center;
    const screenPt = new ScreenPoint(xVal, yVal);

    // Convert screen point to map point and zoom to point;
    const mapPt = map.toMap(screenPt);
    const lat = mapPt.getLatitude();
    const lon = mapPt.getLongitude();

    const params = { lat, lon, start, end };

    if (imageStyleVal === 'Vegetation Health') {
      params.bands = '[B8,B11,B2]';
    }
    mapActions.getSatelliteImagery(params);

    //Reset state
    this.setState({
      selectedThumb: null,
      hoveredThumb: null
    });
  };

  render () {
    const { monthsVal, imageStyleVal, cloudScore, hoveredThumb } = this.state;
    const { imageryData, loadingImagery} = this.props;
    const filteredImageryData = imageryData.filter((data) => {
      return data.attributes.cloud_score >= cloudScore[0] && data.attributes.cloud_score <= cloudScore[1];
    });

    return (
      <DraggableModalWrapper onClose={this.close} onDragEnd={this.onDragEnd}>
        <div className='imagery-modal__wrapper'>
          <div className='imagery-modal__title'>Recent Hi-Res Satellite Imagery</div>

          <div className='imagery-modal__section filters flex'>

            <div>
              <div className='imagery-modal_section-title'>Aquisition Date</div>
              <div className='flex'>

                <div className='relative'>
                  <select
                    value={monthsVal}
                    onChange={this.onChangeStart}>
                    {modalText.imagery.monthsOptions.map(this.renderDropdownOptions)}
                  </select>
                  <div className='fa-button sml white'>{monthsVal}</div>
                </div>

                <div className='imagery-modal_section-text'>before</div>

                <ImageryDatePicker
                  minDate={'2012-01-01'}
                  calendarCallback={this.onChangeEnd} />
              </div>
            </div>

            <div>
              <div className='imagery-modal_section-title'>Maximum Cloud Cover Percentage</div>

              <ImageryModalSlider
                rangeSliderCallback={this.rangeSliderCallback}
                bounds={[0, 100]}
                step={25} />
            </div>
          </div>
          <hr />

          <div className='imagery-modal__section flex secondary-filters'>

            <div className='thumbnail-text'>
              { hoveredThumb ? this.renderThumbText() : null }
            </div>

            <div className='relative'>
              <select
                value={imageStyleVal}
                onChange={this.onChangeImageStyle}>
                {modalText.imagery.imageStyleOptions.map(this.renderDropdownOptions)}
              </select>
              <div className='fa-button sml white'>{imageStyleVal}</div>
            </div>

          </div>

          <div className='imagery-modal__section thumbnail_container flex'>
            <Loader active={loadingImagery} type={'imagery'}/>
            {filteredImageryData.map(this.renderThumbnails.bind(this))}
          </div>
        </div>


      </DraggableModalWrapper>
    );
  }

}
