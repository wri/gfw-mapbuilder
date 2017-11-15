//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class BarChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false, isError: false };
  }

  componentDidMount() {
    const { labels, colors, counts, name, results } = this.props;
    if (typeof results === 'object' && results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {


      if (!counts.some(item => item !== 0)) {
        this.setState({ isEmpty: true });
      } else {
        const series = [{
          name: name,
          data: counts
        }];
        this.setState({ isEmpty: false });
        charts.makeSimpleBarChart(this.refs.chart, labels, colors, series);
      }
    }
  }

  render () {
    const { isError } = this.state;
    const { results } = this.props;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      );
    } else {
      return (
        <div>
          <div ref='chart' className='analysis__chart-container'></div>
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}

BarChart.propTypes = {
  counts: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
