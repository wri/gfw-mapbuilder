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

const lazyloadAssets = () => {

  // loadCSS(`${window._app.base ? window._app.base + '/' : ''}vendor/arcgis-api/dijit/themes/tundra/tundra.css`);
  // loadCSS(`${window._app.base ? window._app.base + '/' : ''}vendor/arcgis-api/esri/css/esri.css`);

  const base = window._app.base ? window._app.base + '/' : '';

  window.highchartsPromise = loadJS(base + assetUrls.highcharts);
  window.highchartsPromise.then(() => {
    Highcharts.setOptions({
      chart: { style: { fontFamily: '"Fira Sans", Georgia, sans-serif' }},
      lang: { thousandsSep: ',' }
    });
  });
  loadJS(base + assetUrls.highchartsMore);
};

configureApp();
lazyloadAssets();
report.run();
