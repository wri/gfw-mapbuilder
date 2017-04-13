//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SlopeBarChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false };
  }

  componentDidMount() {
    const {labels, colors, counts, tooltips} = this.props;
    if(counts.length === 0) {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
      const element = this.refs.chart;
      const series = [{ data: counts }];
      charts.makeSlopeBarChart(element, labels, colors, tooltips, series);
    }
  }

  render () {
    return (
      <div>
        <div ref='chart' id='slope-breakdown' className='analysis__chart-container'></div>
        <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
      </div>
    );
  }
}

SlopeBarChart.propTypes = {
  counts: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  tooltips: PropTypes.array.isRequired
};
