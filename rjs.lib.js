/*eslint-disable*/
({
	baseUrl: 'build',
	paths: {
		// Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
    'resources': 'resources',
    'alt': 'vendor/alt/dist/alt.min',
    'react': 'vendor/react/react.min',
    'react-dom': 'vendor/react/react-dom.min',
    'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill',
    'jquery': 'vendor/jquery/dist/jquery.min',
    'picker': 'vendor/pickadate/lib/compressed/picker',
    'pickadate': 'vendor/pickadate/lib/compressed/picker.date',
		// My configured packages
    'js': 'js',
    'vendor': 'vendor',
    'utils': 'js/utils',
    'stores': 'js/stores',
    'actions': 'js/actions',
    'constants': 'js/constants',
    'components': 'js/components',
    'helpers': 'js/helpers'
	},
	name: 'js/libraryMain',
	out: 'dist/js/libraryMain.js',
	exclude: ['resources']
});
