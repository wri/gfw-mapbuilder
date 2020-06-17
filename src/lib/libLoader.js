//@ts-ignore
//@ts-nocheck
const PACKAGE = require('../../package.json');

const mb = function(cb) {
  //Import vega chart library through a script tag
  const vegaScript = document.createElement('script');
  vegaScript.src = 'https://cdn.jsdelivr.net/npm/vega@5';
  document.getElementsByTagName('head')[0].appendChild(vegaScript);

  //Main library bundle loading happens here, this is executed which fires a callback which in turn instantiates
  //MapBuilder library with config and id for the root div passed. Root div already exists in CMS HTML File,
  //so we are attaching to it this way
  const script = document.createElement('script');
  script.src = `https://wri-sites.s3.amazonaws.com/gfw-mapbuilder.org/library.gfw-mapbuilder.org/${PACKAGE.version}/library-bundle.js`;
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function() {
    cb();
  };
};

mb(function cb() {
  if (window.gon && window.gon.page && window.gon.page.content) {
    new MapBuilderLoader({
      el: 'root',
      config: window.gon.page.content.settings
    });
  }
});

window._app = {
  cache: '1.5.0',
  esri: '#{esriVersion}',
  base:
    'https://wri-sites.s3.amazonaws.com/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0.js'
};

const Loader = function(args) {};
window.MapBuilder = Loader;
