import React, { Component } from 'react';


export default class RedirectChart extends Component {

  componentDidMount() {
    const openWindow = window.open(this.props.redirectUrl);
    console.log('openWindow', openWindow);

    if (!openWindow || typeof openWindow === 'undefined') {
      alert('Turn off your pop-up blocker!');
    }
  }

  render() {
    return (
      <div className='analysis__carbon-container flex'>
        <div className='chart-error'>View results in new tab</div>
      </div>
    );
  }
}
