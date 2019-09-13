import {corsServers} from 'js/config';
import {loadJS, loadCSS } from 'utils/loaders';
import esriConfig from 'esri/config';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import 'babel-polyfill';
import Report from './report/report';
import ShareModal from './components/Modals/ShareModal';

// if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

// window.brApp = {
//   debugEnabled: true,
//   debug: function (message) {
//     if (this.debugEnabled) {
//       var print = typeof message === 'string' ? console.log : console.dir;
//       print.apply(console, [message]);
//     }
//   }
// };
// corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });


    loadCSS(window._app.base + '/css/report.css');
    loadCSS('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,300');
    loadCSS('https://js.arcgis.com/3.17/dijit/themes/tundra/tundra.css');
    loadCSS('https://js.arcgis.com/3.17/esri/css/esri.css');

  export default class ReportLibraryMain extends Component {
    constructor(props) {
      super(props);
      if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }
      window.brApp = {
        debugEnabled: true,
        debug: function (message) {
          if (this.debugEnabled) {
            var print = typeof message === 'string' ? console.log : console.dir;
            print.apply(console, [message]);
          }
        }
      };
      corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
    }

    render() {
      return (
        <Report />
      );
    }
  }

  let reportNode = document.getElementById('report');
  if (!reportNode) {
    const reportNodes = document.getElementsByClassName('report');
    reportNode = reportNodes.item(0);
  }

  const shareNode = document.getElementById('share-modal');

  ReactDOM.render(<ReportLibraryMain />, reportNode);

  if (shareNode) {
    ReactDOM.render(<ShareModal url={window.location.href} />, shareNode);
  }
