import React, { Component } from 'react';
import charts from 'utils/charts';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false };
  }
  componentDidMount() {
    console.log('');
    console.log('this.props.results', this.props.results);
    if (this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      console.log('config', config);
      console.log('this.chart', this.chart);
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
