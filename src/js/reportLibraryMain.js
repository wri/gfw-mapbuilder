/* eslint no-unused-vars: 0 */
// import App from 'components/App';
// import ShareModal from 'components/Modals/ShareModal';
import {corsServers, assetUrls} from 'js/config';
import {loadJS, loadCSS } from 'utils/loaders';
// import generateCSV from 'utils/csvUtils';
import esriConfig from 'esri/config';
// import mapActions from 'actions/MapActions';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import 'babel-polyfill';
import Report from './report/report';

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


    loadCSS(window._app.base + '/css/report.css');
    loadCSS('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,300');
    loadCSS('https://js.arcgis.com/3.17/dijit/themes/tundra/tundra.css');
    loadCSS('https://js.arcgis.com/3.17/esri/css/esri.css');

  export default class ReportLibraryMain extends Component {
    constructor(props) {
      super(props);
      }
  
    render() {
      return (
        <Report />
      );
    }
  }
  
  ReactDOM.render(<ReportLibraryMain />, document.getElementById('report'));


