import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SadAlertsChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false, isError: false };
  }

  componentDidMount () {
    const {categories, series} = charts.formatSadAlerts(this.props);

    if (typeof this.props.results === 'object' && this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
      if (categories.length === 0) {
        this.setState({ isEmpty: true });
      } else {
        //- Tell the second series to use the second axis
        series[0].yAxis = 1;
        const { chart } = this.refs;
        // charts.makeStackedBarChart(chart, categories, series); // Old version
        charts.makeDualAxisTimeSeriesChart(chart, { series, categories });
        this.setState({ isEmpty: false });
      }
    }
  }

  render () {
    const { isError } = this.state;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{this.props.results.message}</h5>
        </div>
      );
    } else {
      return (
        <div>
          <div ref='chart' />
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}

SadAlertsChart.propTypes = {
  alerts: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  names: PropTypes.object.isRequired
};
