import React, { Component } from 'react';
import charts from 'utils/charts';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false };
  }
  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      charts.makeVegaChart(this.chart, config);
    }
  }

  render() {
    const { isError } = this.state;
    const { results } = this.props;
    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      );
    } else {
      return <div className='vega-chart' ref={(chart) => { this.chart = chart; }}></div>;
    }
  }
}
