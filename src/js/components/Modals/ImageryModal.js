import DraggableModalWrapper from 'components/Modals/DraggableModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';
import ImageryModalSlider from 'components/SatelliteImagery/ImageryModalSlider';
import ImageryDatePicker from 'components/SatelliteImagery/ImageryDatePicker';

import { modalText } from 'js/config';

export default class ImageryModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      monthsVal: modalText.imagery.monthsBefore,
      imageStyleVal: modalText.imagery.imageStyle,
      cloudCoverageVal: modalText.imagery.cloudCoverage,

    };
  }

  renderDropdownOptions (option, index) {
    return <option key={index} value={option}>{option}</option>;
  }

  close = () => {
    mapActions.toggleImageryVisible(false);
  };

  onChangeMonths = (event) => {
    this.setState({ monthsVal: event.target.value });
  }

  onChangeImageStyle = (event) => {
    this.setState({ imageStyleVal: event.target.value });
  }

  onChangeCalendarVal = (obj) => {
    console.log(obj)
  }


  onDragEnd = (event) => {
    event.target.style.top = event.clientY;
    event.target.style.left = event.clientX;
  };

  render () {
    const { monthsVal, monthsVisible, imageStyleVal, imageStyleVisible } = this.state;

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
                    onChange={this.onChangeMonths}>
                    {modalText.imagery.monthsOptions.map(this.renderDropdownOptions)}
                  </select>
                  <div className='fa-button sml white'>{monthsVal}</div>
                </div>

                <div className='imagery-modal_section-text'>before</div>

                <ImageryDatePicker
                  minDate={'2012-01-01'}
                  calendarCallback={this.onChangeCalendarVal}
                />
              </div>
            </div>

            <div>
              <div className='imagery-modal_section-title'>Maximum Cloud Cover Percentage</div>
            </div>
          </div>
          <hr />

          <div className='imagery-modal__section flex'>

            <div className='relative'>
              <select
                value={imageStyleVal}
                onChange={this.onChangeImageStyle}>
                {modalText.imagery.imageStyleOptions.map(this.renderDropdownOptions)}
              </select>
              <div className='fa-button sml white'>{imageStyleVal}</div>
            </div>

          </div>

          <div className='imagery-modal__section scroll flex'>

          </div>

        </div>


      </DraggableModalWrapper>
    );
  }

}
