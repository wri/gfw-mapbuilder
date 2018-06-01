/* eslint no-unused-vars: 0 */
import App from 'components/App';
import ShareModal from 'components/Modals/ShareModal';
import {corsServers, assetUrls} from 'js/config';
import {loadJS, loadCSS } from 'utils/loaders';
import generateCSV from 'utils/csvUtils';
import esriConfig from 'esri/config';
import ReactDOM from 'react-dom';
import React from 'react';
import 'babel-polyfill';
import '../css/critical.styl';
import '../css/app.styl';

const libraryMain = {
  startup: () => {
    // TODO: load critical in our startup!

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

    // Shim for rAF with timeout for callback
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();

  },

  configureApp: (constructorParams) => {
    corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
    // esriConfig.defaults.io.corsEnabledServers.push(constructorParams.basePath);
  },

  /**
  * Assets need to be loaded from base (if it is present) + url, or just url if _app.base is not set
  * When deploying to specific versions, this must be used for all relative paths
  */
  lazyloadAssets: (constructorParams) => {
    let cssPath = 'css/';
    let basePath = '';
    if (constructorParams.cssPath) {
      cssPath = constructorParams.cssPath + '/';
    }
    if (constructorParams.basePath) {
      basePath = constructorParams.basePath;
    }

    loadCSS(cssPath + 'critical.css');
    loadCSS('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,300');
    loadCSS(cssPath + 'app.css');
    loadCSS('https://js.arcgis.com/3.17/dijit/themes/tundra/tundra.css');
    loadCSS('https://js.arcgis.com/3.17/esri/css/esri.css');
  },

  initializeApp: (constructorParams) => {
    ReactDOM.render(<App constructorParams={constructorParams} />, document.getElementById(constructorParams.el));
    ReactDOM.render(<ShareModal />, document.getElementById('share-modal'));
  }

};

export {libraryMain as default};
