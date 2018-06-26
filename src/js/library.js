var MapBuilder = function(args){

  this.init = function(constructorParams) {
    var scripts = document.getElementsByTagName('script');
    var newBase, resourcesBase;
    for (var j = 0; j < scripts.length; j++) {
      if (scripts[j].id === 'library-load') {
        newBase = scripts[j].src;
      }
    }

//     if (newBase) {
//       resourcesBase = newBase.split(constructorParams.version)[0];
//       newBase = resourcesBase + constructorParams.version + '/';
//     }
    newBase = newBase.split(constructorParams.version)[0] + constructorParams.version;

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
//     function getResourcePath (path) {
//       var position = path.length - 1;
//       return path.indexOf('/', position) === position ? path.slice(0, -1) : path;
//     }
//     // Change this to '' if _app.base is a remote url
//     var base = location.href.replace(/\/[^/]+$/, '');

//     // Add _app.base if it is present
//     // if (window._app.base) { base = makePath(base, window._app.base); }
//     if (newBase) {
//       base = newBase;
      constructorParams.cssPath = makePath(newBase, 'css');
      constructorParams.basePath = newBase;
//     }
    var base = makePath(newBase);

    window.dojoConfig = {
      parseOnLoad: false,
      async: true,
      packages: [
//         // { name: 'root', location: getResourcePath(resourcesBase.replace(/\/[^/]+$/, ''))},
        { name: 'js', location: makePath(base, 'js') }
//         // { name: 'vendor', location: makePath(base, 'vendor')},
//         // { name: 'utils', location: makePath(base, 'js/utils')},
//         // { name: 'stores', location: makePath(base, 'js/stores')},
//         // { name: 'actions', location: makePath(base, 'js/actions')},
//         // { name: 'constants', location: makePath(base, 'js/constants')},
//         // { name: 'components', location: makePath(base, 'js/components')},
//         // { name: 'helpers', location: makePath(base, 'js/helpers')}
      ],
//       // aliases: [
//         // ['resources', 'root/resources'],
//         // ['alt', 'vendor/alt/dist/alt.min'],
//         // ['react', 'vendor/react/react'],
//         // ['react-dom', 'vendor/react/react-dom'],
//         // ['babel-polyfill', 'vendor/babel-polyfill/browser-polyfill'],
//       // ],
      deps: ['dojo/ready'],
      callback: function () {
        require(['js/libraryMain'], function(libraryMain) { //TODO: Don't resort to module.default !!
        console.log('libraryMain', libraryMain);
          libraryMain.default.startup();
          libraryMain.default.configureApp(constructorParams);
          libraryMain.default.lazyloadAssets(constructorParams);
          libraryMain.default.initializeApp(constructorParams);
        });
      }
    };

    function loadjsfile(filename) {
      // const dojoInit = basePath + filename;

      const script = document.createElement('script');
      script.src = filename;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadjsfile('https://my.gfw-mapbuilder.org/js/arcgis-api-mapbuilder-1.2/dojo/dojo.js');
//     // loadjsfile('https://alpha.blueraster.io/gfw-mapbuilder/library-webpack/1.1.14/js/dojo.js');

    /*eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    /*eslint-enable */
  };

  this.init(args);
};

window.MapBuilder = MapBuilder;
