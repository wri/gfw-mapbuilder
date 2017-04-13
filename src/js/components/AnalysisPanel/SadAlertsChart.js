import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SadAlertsChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false };
  }

  componentDidMount () {
    const {categories, series} = charts.formatSadAlerts(this.props);
    if(categories.length === 0) {
      this.setState({ isEmpty: true });
    } else {
      //- Tell the second series to use the second axis
      series[0].yAxis = 1;
      const {chart} = this.refs;
      // charts.makeStackedBarChart(chart, categories, series); // Old version
      charts.makeDualAxisTimeSeriesChart(chart, { series, categories });
      this.setState({ isEmpty: false });
    }
  }

  render () {
    return (
      <div>
        <div ref='chart' />
        <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
      </div>
    );
  }

}

SadAlertsChart.propTypes = {
  alerts: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  names: PropTypes.object.isRequired
};
