import DraggableModalWrapper from 'components/Modals/DraggableModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';
import ImageryModalSlider from 'components/SatelliteImagery/ImageryModalSlider';
import ImageryDatePicker from 'components/SatelliteImagery/ImageryDatePicker';
import CustomDropdown from 'components/shared/CustomDropdown';

import { modalText } from 'js/config';

export default class ImageryModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      monthsVal: modalText.imagery.monthsBefore,
      monthsVisible: false,
      imageStyleVal: modalText.imagery.imageStyle,
      imageStyleVisible: false,
      cloudCoverageVal: modalText.imagery.cloudCoverage,

    };
  }

  close = () => {
    mapActions.toggleImageryVisible(false);
  };

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
                <CustomDropdown
                value={monthsVal}
                options={modalText.imagery.monthsOptions}
                onClick={() => this.setState({ monthsVisible: !monthsVisible})}
                open={monthsVisible}
                />
                <div>before</div>
              </div>
            </div>

            <div>
              <div className='imagery-modal_section-title'>Maximum Cloud Cover Percentage</div>
            </div>
          </div>

          <div className='imagery-modal__section scroll flex'>

          </div>

        </div>


      </DraggableModalWrapper>
    );
  }

}
