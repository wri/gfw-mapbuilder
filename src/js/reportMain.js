import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {corsServers} from 'js/config';
import esriConfig from 'esri/config';
import Report from './report/report';
import 'babel-polyfill';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

window.brApp = {
  debug: location.search.slice(1).search('debug=true') > -1
};

class ReportMain extends Component {
  constructor(props) {
    super(props);
  }
  
  configureApp = () => {
    corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
  };
  
  render() {
    return (
      <Report />
    );
  }
}

ReactDOM.render(<ReportMain />, document.getElementById('report'));

