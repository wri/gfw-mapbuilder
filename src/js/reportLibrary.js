var MapBuilderReport = function(args){

  this.init = function(constructorParams) {
    var scripts = document.getElementsByTagName('script');
    var newBase;
    for (var j = 0; j < scripts.length; j++) {
      if (scripts[j].id === 'report-load') {
        newBase = scripts[j].src;
      }
    }

    newBase = newBase.split('reportLib')[0] + constructorParams.version;

    window._app = {
      cache: constructorParams.version,
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
        require(['js/ReportLibraryMain'], function(reportLibraryMain) {
          reportLibraryMain.default.lazyloadAssets(constructorParams);
          reportLibraryMain.default.startup();

        });
      }
    };

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

  };

  window.customApp = {
    ...args
  };

  this.constructorArgs = args;
  this.init(args);
};

window.MapBuilder = MapBuilderReport;
