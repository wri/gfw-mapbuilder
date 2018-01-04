import React, { Component } from 'react';

import utils from 'utils/AppUtils';
import charts from 'utils/charts';

export default class CommoditiesChart extends Component {
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
      const oilPalm = this.props.results.oilPalm;
      const mining = this.props.results.mining;
      const managedForests = this.props.results.managedForests;

      if ((oilPalm === 0 && mining === 0 && managedForests === 0) || (!oilPalm && !mining && !managedForests)) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        charts.makeCommoditiesPieChart(this.commChart, this.props.results);
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
          <div ref={(chart) => {this.commChart = chart;}} className='analysis__carbon-chart-container' />
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
