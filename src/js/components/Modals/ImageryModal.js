import DraggableModalWrapper from 'components/Modals/DraggableModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import ImageryModalSlider from 'components/SatelliteImagery/ImageryModalSlider';
import ImageryDatePicker from 'components/SatelliteImagery/ImageryDatePicker';
import ScreenPoint from 'esri/geometry/ScreenPoint';
import moment from 'moment';
import Loader from 'components/Loader';
import GFWImageryLayer from 'js/layers/GFWImageryLayer';
import SVGIcon from 'utils/svgIcon';

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
      cloudScore: [0, 100],
      start: null,
      end: null,
      selectedThumb: null,
      hoveredThumb: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageryModalVisible && !this.props.imageryModalVisible) {
      console.log('modal visible')
      this.updateImagery();
    }
    if (nextProps.imageryData.length && nextProps.imageryData[0] && nextProps.imageryData !== this.props.imageryData) {
      // Always display first image on the map
      console.log('select first thumbnail')
      const filteredImageryData = nextProps.imageryData.filter((data) => {
        return data.attributes.cloud_score >= this.state.cloudScore[0] && data.attributes.cloud_score <= this.state.cloudScore[1];
      });

      this.selectThumbnail(filteredImageryData[0], 0);
    }
  }

  selectThumbnail (tileObj, i) {
    const { map } = this.context;
    let imageryLayer = map.getLayer('GFWImageryLayer');

    if (imageryLayer) {
      imageryLayer.show();
      imageryLayer.setUrl(tileObj.tileUrl);
    } else {
      const options = {
        id: 'GFWImageryLayer',
        url: tileObj.tileUrl,
        visible: true
      };

      imageryLayer = new GFWImageryLayer(options);
      map.addLayer(imageryLayer);
      map.reorderLayer('GFWImageryLayer', 1); // Should be underneath all other layers

    }

    this.setState({ selectedThumb: i });

    // Hack to make sure map refreshes.
    const zoom = map.getZoom();
    map.setZoom(zoom + 1);
    map.setZoom(zoom);

  }

  hoverThumbnail (tileObj) {
    this.setState({ hoveredThumb: tileObj });
  }

  renderDropdownOptions = (option, index) => {
    return <option key={index} value={option.label}>{option.label}</option>;
  }

  renderThumbnails = (tileObj, i) => {

      let reloadCount = 0;

      const handleError = (event) => {
        if (reloadCount < 5) {
          event.persist();
          event.target.src = '';
          reloadCount++
          setTimeout(() => {
            event.target.src = tileObj.thumbUrl;
          }, 1000);
        } else {
          event.target.classList.add('hidden');
        }
      };

      return (
        <div
          onClick={() => this.selectThumbnail(tileObj, i)}
          onMouseOver={() => this.hoverThumbnail(tileObj)}
          className={`thumbnail ${this.state.selectedThumb === i ? 'selected' : ''}`}
          key={`thumb-${i}`}>
            <img src={tileObj.thumbUrl} onError={handleError} />
        </div>
      );
  }

  renderThumbText = () => {
    const { hoveredThumb } = this.state;
    return (
      <div>
        <p>{moment(hoveredThumb.attributes.date_time).format('DD MMM YYYY')}</p>
        <p>{`${hoveredThumb.attributes.cloud_score.toFixed(0)}% cloud coverage`}</p>
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

    if (map.toMap === undefined) { return; }

    const { start, end, imageStyleVal } = this.state;

    const xVal = window.innerWidth / 2;
    const yVal = window.innerHeight / 2;

    // Create new screen point at center;
    const screenPt = new ScreenPoint(xVal, yVal);

    // Convert screen point to map point and zoom to point;
    const mapPt = map.toMap(screenPt);
    const lon = mapPt.getLatitude();
    const lat = mapPt.getLongitude();

    const params = { lat, lon, start, end };

    if (imageStyleVal === 'Vegetation Health') {
      params.bands = '[B8,B11,B2]';
    }
    if (map.getZoom() < 8) {
      map.setZoom(8);
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
    const { imageryData, loadingImagery, imageryError} = this.props;
    const filteredImageryData = imageryData.filter((data) => {
      return data.attributes.cloud_score >= cloudScore[0] && data.attributes.cloud_score <= cloudScore[1];
    });

    return (
      <DraggableModalWrapper onClose={this.close} onDragEnd={this.onDragEnd}>
        <div className='imagery-modal__wrapper'>
          <div className='imagery-modal__title'>Recent Hi-Res Satellite Imagery</div>

          <div className='imagery-modal__section filters flex'>

            <div className='imagery-modal__item'>
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

            <div className='imagery-modal__item'>
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
            { imageryError &&
              <div className='imagery-modal__error'>
                <SVGIcon id={'icon-alerts'} />
                <p>Error loading recent imagery.</p>
              </div>
            }
            {filteredImageryData.map(this.renderThumbnails.bind(this))}
          </div>
        </div>
      </DraggableModalWrapper>
    );
  }

}
