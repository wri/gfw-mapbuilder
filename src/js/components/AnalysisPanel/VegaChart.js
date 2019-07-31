import React, { Component } from 'react';
import charts from 'utils/charts';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false, errorMsg: null };
  }

  handleError = (errorMsg) => {
    this.setState({ isError: true, errorMsg });
    this.props.setLoading();
  }

  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.handleError();
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      const selectedFeature = this.props.selectedFeature;
      const attributes = selectedFeature && selectedFeature.attributes ? selectedFeature.attributes : null; //Only WCS-specific widgets need this property
      charts.makeVegaChart(this.chart, config, this.props.setLoading, attributes, this.props.results.data.id, this.handleError);
    }
  }

  render() {
    const { isError, errorMsg } = this.state;
    const { results } = this.props;
    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message || errorMsg}</h5>
        </div>
      );
    } else {
      return <div className='vega-chart' ref={(chart) => { this.chart = chart; }}></div>;
    }
  }
}
