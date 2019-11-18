import React, {Component, PropTypes} from 'react';
import charts from 'utils/charts';
import text from '../../languages';

export default class TimeSeriesChart extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = { isEmpty: false, isError: false };
  }

  componentDidMount() {
    const { chart } = this.refs;
    const { data } = this.props;

    if (typeof data === 'object' && data.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });

      let emptyValues = 0;
      data.forEach(dateArray => {
        if (dateArray[1] === 0) {
          emptyValues++;
        }
      });
      if (data.length === emptyValues) {
        this.setState({ isEmpty: true });
      } else {
        charts.makeTimeSeriesCharts(chart, this.props);
        this.setState({ isEmpty: false });
      }
    }
  }

  render () {
    const { isError } = this.state;
    const { data } = this.props;
    const {language} = this.context;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{data.message}</h5>
        </div>
      );
    } else {

      return (
        <div>
          <div ref='chart' />
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>{text[language].ANALYSIS_NO_DATA}</div>
        </div>
      );
    }
  }
}

TimeSeriesChart.propTypes = {
  data: PropTypes.array.isRequired
};
