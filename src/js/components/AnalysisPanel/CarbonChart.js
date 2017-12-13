import React, { Component } from 'react';
import charts from 'utils/charts';

export default class CarbonChart extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      isEmpty: false,
      isError: false
    };
  }

  componentDidMount() {
    if (typeof this.props.results === 'object' && this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      const abovegroundCarbon = this.props.abovegroundCarbon;
      const belowgroundCarbon = this.props.belowgroundCarbon;
      const averageAboveground = this.props.averageAboveground;
      const averageBelowground = this.props.averageBelowground;
      const total = this.props.total;

      if (abovegroundCarbon === 0 && belowgroundCarbon === 0 && averageAboveground === 0 && averageBelowground === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        total > 0 && charts.makeCarbonInTreesChart(this.totalChart, this.props);
      }
    }
  }

  render() {
    const { results } = this.props;
    const { isError, isEmpty } = this.state;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      );
    } else {
      return (
        <div className='analysis__carbon-container flex'>
          <div ref={(chart) => {this.totalChart = chart;}} className='analysis__carbon-chart-container' />
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
