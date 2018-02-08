import React, { Component } from 'react';

import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class AnalysisRangeSlider extends Component {

  handleAfterChange = rangeSliderValue => {
    this.props.handleRangeSliderChange(rangeSliderValue, this.props.analysisId);
  }

  render() {
    const { bounds, step, label } = this.props;
    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <Range
          className='select-form-item'
          min={bounds[0]}
          max={bounds[1]}
          defaultValue={bounds}
          allowCross={false}
          onAfterChange={this.handleAfterChange}
          step={step}
          dots={bounds[1] - bounds[0] <= 20}
          trackStyle={[{backgroundColor: '#F0AB00'}]}
          handleStyle={[{borderColor: '#F0AB00'}]}
          dotStyle={{border: '1px solid #e9e9e9'}}
          activeDotStyle={{border: '1px solid #F0AB00'}}
        />
      </div>
    );
  }
}
