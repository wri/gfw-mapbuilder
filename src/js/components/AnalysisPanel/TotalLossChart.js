//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class TotalLossChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false, isError: false };
  }

  componentDidMount() {
    const { labels, colors, counts, encoder, options, lossLabels, results } = this.props;

    if (typeof results === 'object' && results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
      if (counts.length === 0 || !counts.some(value => value !== 0)) {
        this.setState({ isEmpty: true });
      } else {
        this.setState({ isEmpty: false });

        const element = this.refs.chart;
        const chartInfo = charts.formatSeriesWithEncoder({
          isSimple: options.simple,
          encoder: encoder,
          counts: counts,
          labels: labels,
          colors: colors,
          Xs: encoder.A, // Loss Bounds
          Ys: encoder.B // Raster were crossing with
        });

        charts.makeTotalLossBarChart(element, lossLabels, chartInfo.colors, chartInfo.series);
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
          <div ref='chart'></div>
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}

TotalLossChart.propTypes = {
  counts: PropTypes.array.isRequired,
  encoder: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  lossLabels: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
};
