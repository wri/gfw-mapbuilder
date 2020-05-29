//@ts-ignore
//@ts-nocheck

// In "CMS lib we already have a root div" <div id="root"></div> to which we need to mount the application

// whatever is in 1.5.0.js is being evaluated

//1. make sure library-bundle.js loads up first
//2. initialize mapbuilder instance

let aa;
const mb = function(cb) {
  const script = document.createElement('script');
  script.src =
    'https://wri-sites.s3.amazonaws.com/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/library-bundle.js';
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function() {
    cb();
  };
};

mb(function cb() {
  console.log('script loaded');
  // console.log(aa)
  console.log(window.gon.page.content.settings);
  new MapBuilderLoader({
    el: 'root',
    config: window.gon.page.content.settings
  });
});

window._app = {
  cache: '1.5.0',
  esri: '#{esriVersion}',
  base:
    'https://wri-sites.s3.amazonaws.com/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0.js'
};

const Loader = function(args) {
  // console.log(args);
  aa = args;
};
window.MapBuilder = Loader;
