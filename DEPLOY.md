# GFW Map Builder ArcGIS Online Template
> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Deploying a build
> If you need to configure the build or update the process for how it works, read this section

NOTE: Current deployment goes to the `gh-pages` branch which updates the [production site](https://wri.github.io/gfw-mapbuilder/).

#### Standard deployment
Just run the following command and copy the contents of the `webpackBuild` directory to your webserver.
```shell
npm run build
```

### Advanced deployment
There are configurations that allow for greater flexibility and customization. If you want to version the application, host the majority of the code on a different server, or use one set of javascript/css assets to deploy several different projects with their own `resources.js` file, you can. The current dist output looks something like this:

```
|- index.html
|- report.html
|- resources.js
|- 'css'
|  |- app.css
|  |- critical.css
|  |- report.css
|- 'js'
|  |- main.js
|  |- report.js
```
The `index.html` and `report.html` have an option to change where they load the base version folder from. This way you can put the `index.html`, `report.html`, and `resources.js` on a completely different server than the folders of code, and even point several different html and resource files to the same version. This also makes it easier to update the application and not have to worry about breaking changes as much, since in most cases, you can just change the pointer in the html files to a different version of your hosted application files. Sometimes the html files themselves will have updates due to how the app pre-renders content and injects css so in those cases, you will need to update the html files as well.

This is a little difficult since the html files are minified, but the two steps below will show you how to configure them.

1. In `index.html` and `report.html`, search for `_app` and you should see something like this:
```javascript
var _app={cache:"0.1.26",esri:"3.16",base:"0.1.26"},
```
Change base here to your remote path, something like this for example: 'http://s3.amazonaws.com/gfw-mapbuilder/0.1.26'.  This would make that code look like this:
```javascript
var _app={cache:"0.1.26",esri:"3.16",base:"http://s3.amazonaws.com/gfw-mapbuilder/0.1.26"},
```
Make sure the number in cache is the same number at the end of the base path you configured.

2. Next you need to set the base variable, which different from `_app.base`, and set it to `''`.  This appears immediately after the above line. Below are examples of the two different configurations.
  * **Standard Configuration**
  ```javascript
  var _app={cache:"0.1.26",esri:"3.16",base:"0.1.26"},base=location.href.replace(/\/[^\/]+$/,"");
  ```
  * **Advanced Configuration**
  ```javascript
  var _app={cache:"0.1.26",esri:"3.16",base:"http://s3.amazonaws.com/gfw-mapbuilder/0.1.26"},base='';
  ```
