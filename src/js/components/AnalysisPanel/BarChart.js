//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';
import text from '../../languages';

export default class BarChart extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isEmpty: false, isError: false };
  }

  componentDidMount() {
    const { labels, colors, counts, name, results, encoder } = this.props;
    if (typeof results === 'object' && results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {

      if (!counts.some(item => item !== 0)) {
        this.setState({ isEmpty: true });
      } else {
        let series = [];
        const parsedCounts = counts.map(count => parseInt(count));

        if (encoder) {
          const chartInfo = charts.formatSeriesWithEncoder({
            isSimple: true,
            encoder: encoder,
            counts: parsedCounts,
            labels: labels,
            colors: colors,
            Xs: encoder.A, // Loss Bounds
            Ys: encoder.B // Raster were crossing with
          });
          series = chartInfo.series;
        } else {
          series = [{
            name: name,
            data: parsedCounts
          }];
        }

        this.setState({ isEmpty: false });
        charts.makeTotalLossBarChart(this.refs.chart, labels, colors, series);
      }
    }
  }

  render () {
    const { isError } = this.state;
    const { results } = this.props;
    const {language} = this.context;

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
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>{text[language].ANALYSIS_NO_DATA}</div>
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
