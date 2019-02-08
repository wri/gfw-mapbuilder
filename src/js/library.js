var MapBuilder = function(args){

  this.init = function(constructorParams) {
    // Dynamically add meta tags if they don't already exist
    const currentMetaTags = document.getElementsByTagName('meta');
    let currentCharsetTag, currentMobileTag;

    for (var i = 0; i < currentMetaTags.length; i++) {
      const content = currentMetaTags[i].getAttribute('content');
      if (content === 'text/html; charset=utf-8') {
        currentCharsetTag = true;
      } else if (content === 'width=device-width, initial-scale=1.0') {
        currentMobileTag = true;
      }
    }
    if (!currentCharsetTag) {
      const metaCharset = document.createElement('meta');
      metaCharset.httpEquiv = 'Content-Type';
      metaCharset.content = 'text/html; charset=utf-8';
      document.getElementsByTagName('body')[0].appendChild(metaCharset);
    }

    if (!currentMobileTag) {
      const metaMobileDevice = document.createElement('meta');
      metaMobileDevice.name = 'viewport';
      metaMobileDevice.content = 'width=device-width, initial-scale=1.0';
      document.getElementsByTagName('body')[0].appendChild(metaMobileDevice);
    }

    var scripts = document.getElementsByTagName('script');
    var version;
    var newBase;
    for (var j = 0; j < scripts.length; j++) {
      if (scripts[j].id === 'library-load') {
        newBase = scripts[j].src;
        version = scripts[j].getAttribute('version') || constructorParams.version;
      }
    }
    newBase = newBase.split(version)[0] + version;
    window._app = {
      cache: version,
      esri: '#{esriVersion}',
      base: newBase
    };

    function makePath (base, path) {
      var position = base.length - 1;
      return !path ?
        (base.indexOf('/', position) !== position ? base + '/' : base) :
        (base.indexOf('/', position) !== position ?
          base + '/' + path :
          base + path
        );
    }
    constructorParams.cssPath = makePath(newBase, 'css');

    var base = makePath(newBase);

    window.dojoConfig = {
      parseOnLoad: false,
      async: true,
      packages: [
        { name: 'js', location: makePath(base, 'js') }
      ],
      deps: ['dojo/ready'],
      callback: function () {
        require(['js/libraryMain'], function(libraryMain) {
          libraryMain.default.startup();
          libraryMain.default.configureApp(constructorParams);
          libraryMain.default.lazyloadAssets(constructorParams);
          libraryMain.default.initializeApp(constructorParams);
        });
      }
    };

    function loadRequiredCSS() {
      const css = `
        @font-face {
          font-family: 'Fira Sans';
          src: url('https://my.gfw-mapbuilder.org/fonts/firasans-regular-webfont.woff2') format('woff2'),
              url('https://my.gfw-mapbuilder.org/fonts/firasans-regular-webfont.ttf') format('ttf'),
              url('https://my.gfw-mapbuilder.org/fonts/firasans-regular-webfont.woff') format('woff'),
              url('https://my.gfw-mapbuilder.org/fonts/firasans-bold-webfont.woff2') format('woff2'),
              url('https://my.gfw-mapbuilder.org/fonts/firasans-bold-webfont.ttf') format('ttf'),
              url('https://my.gfw-mapbuilder.org/fonts/firasans-bold-webfont.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }

        .layer-transparency input[type=range]::-webkit-slider-thumb {
          background: #fff url('https://my.gfw-mapbuilder.org/img/dot.svg') no-repeat 50% 50%;
        }

        .layer-transparency input[type=range]::-moz-range-thumb {
          background: #fff url('https://my.gfw-mapbuilder.org/img/dot.svg') no-repeat 50% 50%;
        }

        .layer-transparency input[type=range]::-ms-thumb {
          background: #fff url('https://my.gfw-mapbuilder.org/img/dot.svg') no-repeat 50% 50%;
        }

        .tree-icon {
          background: url('https://my.gfw-mapbuilder.org/img/tree.png') no-repeat center;
        }

        .forest-icon {
          background: url('https://my.gfw-mapbuilder.org/img/forest.png') no-repeat center;
        }

        .chart-icon {
          background: url('https://my.gfw-mapbuilder.org/img/chart-icon.svg') no-repeat center;
        }

        .print-icon {
          background: url('https://my.gfw-mapbuilder.org/img/print-icon.svg') no-repeat center;
        }

        .subscribe-icon {
          background: url('https://my.gfw-mapbuilder.org/img/subscribe-icon.svg') no-repeat center;
        }
      `;

      const styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(styleTag);
    }

    function loadjsfile(filename, options) {
      const script = document.createElement('script');
      script.src = filename;
      if (options) {
        Object.entries(options).forEach((item) => {
          const [ attribute, attributeValue ] = item;
          script[attribute] = attributeValue;
        });
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadjsfile('https://my.gfw-mapbuilder.org/js/arcgis-api-mapbuilder-1.2/dojo/dojo.js');
    loadjsfile('https://cdnjs.cloudflare.com/ajax/libs/vega/4.2.0/vega.min.js', { charset: 'UTF-8' });
    loadRequiredCSS();

    /*eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    /*eslint-enable */
  };

  window.customApp = {
    ...args
  };

  this.constructorArgs = args;
  this.init(args);
};

window.MapBuilder = MapBuilder;
