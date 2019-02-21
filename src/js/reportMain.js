/* eslint no-unused-vars: 0 */
import IdentityManager from 'esri/IdentityManager';
import {corsServers, assetUrls} from 'js/config';
import {loadJS, loadCSS } from 'utils/loaders';
import esriConfig from 'esri/config';
import report from 'report/report';
import 'babel-polyfill';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

window.brApp = {
  debug: location.search.slice(1).search('debug=true') > -1
};

const configureApp = () => {
  corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
};

configureApp();
report.run();
