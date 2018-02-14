import React, { Component } from 'react';

import Slider from 'rc-slider';
import MapActions from '../../../actions/MapActions';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class AnalysisRangeSlider extends Component {
  constructor(props) {
    super(props);

    const { initialStartValue, initialEndValue, bounds } = props;

    this.rangeArray = [...Array(bounds[1] + 1 - bounds[0]).keys()].map((i, idx) => idx + bounds[0]);

    this.state = {
      rangeSliderValue: [
        initialStartValue || bounds[0],
        initialEndValue || bounds[1],
      ],
    };
  }

  componentDidMount() {
    const {
      rangeSliderCallback,
      analysisId,
      startParamName,
      endParamName,
      valueType,
      combineParams,
      valueSeparator,
    } = this.props;
    const { rangeSliderValue } = this.state;

    // Set the default params to to pass in the request
    rangeSliderCallback(
      rangeSliderValue,
      analysisId,
      combineParams,
      startParamName,
      endParamName,
      valueSeparator,
      valueType,
    );

    MapActions.updateAnalysisSliderIndices({
      id: analysisId,
      indices: [this.rangeArray.indexOf(rangeSliderValue[0]), this.rangeArray.indexOf(rangeSliderValue[1])]
    });
  }

  handleChange = rangeSliderValue => {
    this.setState({ rangeSliderValue });
  }

  handleAfterChange = rangeSliderValue => {
    const {
      rangeSliderCallback,
      analysisId,
      startParamName,
      endParamName,
      valueType,
      combineParams,
      valueSeparator,
    } = this.props;

    rangeSliderCallback(
      rangeSliderValue,
      analysisId,
      combineParams,
      startParamName,
      endParamName,
      valueSeparator,
      valueType,
    );

    MapActions.updateAnalysisSliderIndices({
      id: analysisId,
      indices: [this.rangeArray.indexOf(rangeSliderValue[0]), this.rangeArray.indexOf(rangeSliderValue[1])]
    });
  }

  render() {
    const { bounds, step, label } = this.props;
    const { rangeSliderValue } = this.state;
    return (
      <div className='analysis-results__select-form-item-container'>
        <div className='select-form-item-label'>{label}</div>
        <Range
          className='select-form-item'
          min={bounds[0]}
          max={bounds[1]}
          value={rangeSliderValue}
          allowCross={false}
          onChange={this.handleChange}
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
