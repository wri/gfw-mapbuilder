import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {corsServers} from 'js/config';
import esriConfig from 'esri/config';
import Report from './report/report';
import ShareModal from './components/Modals/ShareModal';
import 'babel-polyfill';

class ReportMain extends Component {
  constructor(props) {
    super(props);
    if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

    window.brApp = {
      debug: location.search.slice(1).search('debug=true') > -1
    };
    corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
  }

  render() {
    return (
      <Report />
    );
  }
}

ReactDOM.render(<ReportMain />, document.getElementById('report'));
ReactDOM.render(<ShareModal url={window.location.href} />, document.getElementById('share-modal'));