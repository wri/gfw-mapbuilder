import React, {Component, PropTypes} from 'react';
import charts from 'utils/charts';

export default class TimeSeriesChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false };
  }

  componentDidMount () {
    const {chart} = this.refs;
    const {data} = this.props;

    let emptyValues = 0;
    data.forEach(dateArray => {
      if(dateArray[1] === 0) {
        emptyValues++;
      }
    });
    if(data.length === emptyValues) {
      this.setState({isEmpty: true});
    } else {
      charts.makeTimeSeriesCharts(chart, this.props);
      this.setState({isEmpty: false});
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

TimeSeriesChart.propTypes = {
  data: PropTypes.array.isRequired
};
