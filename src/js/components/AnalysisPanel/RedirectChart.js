import React, { Component } from 'react';
import mapActions from 'actions/MapActions';

export default class RedirectChart extends Component {

  constructor(props){
    super(props);

    this.state = {
      isEmpty: false,
      isError: false
    };
  }

  componentDidMount() {

    if (this.props.payload.features && this.props.payload.features.length === 0) {
      this.setState({
        isEmpty: true
      });
    } else if (!this.props.payload || !this.props.payload.features) {
      this.setState({
        isError: true
      });
    } else {
      const openWindow = window.open(this.props.redirectUrl);
      console.log('openWindow', openWindow);
      console.log('this.props.payload', this.props.payload);

      if (!openWindow || typeof openWindow === 'undefined') {
        mapActions.setAnalysisType('default');
        alert("Please turn off your browser's popup blocker and run the analysis again");
      } else {
        openWindow.payload = this.props.payload;
      }
    }
  }

  render() {
    const { isError, isEmpty } = this.state;
    if (isError) {
      return (
        <div className='data-error'>
          <h5>Error fetching the data</h5>
        </div>
      );
    } else {
      return (
        <div className='analysis__carbon-container flex'>
          <div className={`chart-error ${isEmpty ? 'hidden' : ' '}`}>View results in new tab</div>
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
