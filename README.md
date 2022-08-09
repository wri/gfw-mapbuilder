[![Build Status](https://github.com/wri/gfw-mapbuilder/workflows/build-and-deploy/badge.svg)](https://github.com/wri/gfw-mapbuilder/actions)

# GFW Map Builder ArcGIS Online Template

> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Getting Started

Before you can begin, make sure you have [node.js](https://nodejs.org/en/).

### Env variables

Create .env file at the root of the project and add `REACT_APP_PLANET_API_KEY` checkout `.env.examples` file.
Reach out to point of contact for Mapbuilder and ask for api key

Install all the javascript dependencies.

```shell
npm install
```

Start the server and then the app will be served at [http://localhost:3000](http://localhost:3000).

```shell
npm start
```

### Generating a build

> You will need node.js installed for these steps

Run the following command to generate a build to the `webpackBuild` directory.

```shell
npm run build
```

### Configuring

This application has a general ([`resources.js`](https://github.com/wri/gfw-mapbuilder/blob/develop/configs/resources.js)). file that contains things controlled by the developers. Also, the Resources file contains configurations that are controlled via ArcGIS Online or whomever may be deploying the application. You can control things like the layers in the accordion, their source urls, their order on the map and in the UI, service urls (print, geometry, map, etc.), which layers to include in the analysis, and even the configurations for slope analysis and other aspects of the analysis. Anything that needs to be controlled from ArcGIS Online or the person deploying it, should be placed in `resources.js`.

To ensure that your `resources.js` has a valid configuration run the following command

```shell
npm run test
```

These [Jest](https://jestjs.io/) unit tests will ensure that you have correctly configured any properties that are required in the `layerPanel` and `analysisModules` sections.

#### Configuring Layers and Accordions

The layers and the accordion are now more easily configurable via the `resources.js` file. Layers that you want to appear on the map but not in the accordion should be placed under `extraLayers`. The configuration structure is as follows:

```javascript
GROUP_LCD: {
  order: 1,
  label: {
    en: 'Land Cover Dynamics',
    fr: 'Evolution de l\'occupation des sols',
    es: 'Dinámica de la Cobertura del Suelo',
    pt: 'Land Cover Dynamics',
    id: 'Land Cover Dynamics',
    zh: '土地覆盖动态数据'
  },
  layers: [{
    order: 1,
    id: 'TREE_COVER_LOSS',
    type: 'image',
    url: 'https://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
    technicalName: 'tree_cover_loss',
    legendLayer: 0,
    colormap: [[1, 219, 101, 152]],
    inputRange: [1, 15],
    outputRange: [1],
    label: {
      en: 'Tree cover loss',
      fr: 'Perte en couvert arboré',
      es: 'Pérdida de la cobertura arbórea',
      pt: 'Tree cover loss',
      id: 'Tree cover loss',
      zh: '森林覆盖损失'
    },
    sublabel: {
      en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      pt: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))'
    }
  }]
}
```

Properties for the groups and layers are described in detail in the resources file, but here is a brief description of what you see above as well:

- `GROUP_LCD` - Unique key to contain all the properties for the group, this is an accordion section in the layer panel
  - `order` - Order that the group will appear in the UI and the order in which it's layers will appear on the map. An `order` of 1 will be above an `order` of 2 in the UI and the map. **MINIMUM** is 1, value of 0 may result in layers being placed under the basemap.
  - `label` - Object containing keys for various languages, this is the label in the UI for the accordion section.
  - `layers` - an array of layers that will appear in this accordion. Some layers have custom configurations and some support different options for different types of layers.
    - `order` - order of the layer in the accordion and on the the map. This order is relative to this section. Layers more or less will be stacked similar to how they appear in the UI with the exception of feature/graphics layers as they always go on top. In the below example, layer A will be on top even though it has a higher order because the group it belongs to has a lower order, meaning the group and the layer will appear first:
      - Group 1 - order 1
        - Layer A - order 5
      - Group 2 - order 2
        - Layer B - order 1
    - `id` - Unique ID for the layer, this must be unique across the whole app, not just the group
    - `type` - Type of layer. Currently `tiled`, `webtiled`, `image`, `dynamic`, `feature`, `graphic`, `glad`, and `terra` are supported types.
    - `visible` - default layer visibility. Default value if not supplied is false.
    - `url` - required for all layers except graphics layers.
    - `technicalName` - key for this layer to retrieve metadata about it from the GFW metadata API
    - `legendLayer` - If this layer has no legend or a bad legend, and has an alternative one available here, `http://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer`, you can provide the layer id of it's legend here so the app can pull that legend in.
    - `layerIds` - An array of layer ids for dynamic layers, should look like this: `[0, 1, 2, 3]` or `[1]`.
    - `label` - An object of keys representing various languages, this is the label that shows in the UI
    - `sublabel` - An object of keys representing various languages, this is the sublabel that shows in the UI
    - `popup` - See below for more explanation and an example of how to use this

#### Adding Additional Groups

We are now supporting the ability to add additional group accordions to the layer panel. To add a new group, simply add another entry into the layerPanel object (described above in the ['Configuring' section](#configuring)). Below is an example group that you can copy and paste into the layerPanel object and edit to the configuration that you need. Follow any instructions/suggestions in the commented lines (preceded by `//`), then be sure to delete any commented lines before you save. Any properties that are commented out are optional, you may safely delete those if they are not needed for your group (exceptions will be noted below).

```javascript
// Change the group name to something descriptive and unique. It should be all caps with words separated by underscores.
GROUP_NAME: {
  // Properties must not be duplicated. One groupType is required. Choose one and uncomment it, then delete the others.
  // groupType: 'checkbox',
  // groupType: 'radio',
  // groupType: 'nested',

  // Edit the order of this group and the other groups. This determines the order they appear in the layer panel.
  order: 1,
  label: {
    // Edit the group label, this can be anything you want it to be
    en: 'Group Label',
    // Optionally add labels for additional languages (see the section on Strings and Translations below).
    // fr: 'Label for French Language'
  },
  layers: [
    // Uncomment the layer item under the corresponding groupType that you selected earlier, then duplicate for any additional layers in this group.

    // CHECKBOX
    // {
    //   Required - the layer id generated from your AGOL webmap
    //   id: 'layer_id_1234',

    //   Required - the order that you would like this layer to appear within the group accordion section (1 will appear ABOVE 2)
    //   order: 1,

    //   Optional - sublabel for the layer
    //   sublabel: {
    //     en: 'Layer sublabel',
    //     fr: 'Sublabel for French Language'
    //   }
    // }

    // RADIO
    // {
    //   Required - the layer id generated from your AGOL webmap
    //   id: 'layer_id_1234',

    //   Required - the order that you would like this layer to appear within the group accordion section
    //   order: 1,

    //   If this is a MapServiceLayer you must include the following property. This lets the application know which sublayers you would like included in this group.
    //   includedSublayers: [0, 1, 2, 3],

    //   Optional - the sublabel for the layer.
    //   sublabel: {
    //     en: 'Layer Sublabel',
    //     fr: 'Sublabel for French Language'
    //   }
    //   Note: If this is a MapServiceLayer, the sublayer that the sublabel belongs to must be specified.
    //   sublabel: {
    //     0: {
    //       en: 'Sublayer 0 Sublabel',
    //       fr: 'Sublayer 0 Sublabel for French Language'
    //     },
    //     1: {
    //       en: 'Sublayer 1 Sublabel',
    //       fr: 'Sublayer 1 Sublabel for French Language'
    //     }
    //   }
    // }

    // NESTED
    // {
    //   Required - the order that you would like this layer grouping to appear within the group accordion section
    //   order: 1,

    //   Required - the label of the nested layer grouping
    //   label: {
    //     en: 'Nested grouping label',
    //     fr: 'Nested grouping label for French Language'
    //   },

    //   Required - the layers that will appear in this grouping
    //   nestedLayers: [
    //     {
    //       Required - the layer id generated from your AGOL webmap
    //       id: 'layer_id_1234',

    //       Required - the order that you would like this layer to appear within the nested grouping
    //       order: 1,

    //       Optional - sublabel for the layer
    //       sublabel: {
    //         en: 'Layer sublabel',
    //         fr: 'Sublabel for French Language'
    //       }
    //     }
    //   ]
    // }
  ]
},
```

#### Configuring Popups for layers not in Webmaps

This is currently only supported for dynamic layers and feature layers. A popup configuration has some elements it must contain to keep the styling looking appropriate and they are outlined below. Here is an example layer configuration that contains a popup configuration (NOTE the addition of `popup` at the bottom):

```javascript
order: 6,
id: 'ACTIVE_FIRES',
type: 'dynamic',
url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
technicalName: 'noaa18_fires',
layerIds: [0, 1, 2, 3],
label: {
  ...
},
sublabel: {
  ...
},
popup: {
  title: {
    en: 'Active Fires'
  },
  content: {
    en: [
      {'label': 'Brightness', 'fieldExpression': 'BRIGHTNESS'},
      {'label': 'Confidence', 'fieldExpression': 'CONFIDENCE'},
      {'label': 'Latitude', 'fieldExpression': 'LATITUDE'},
      {'label': 'Longitude', 'fieldExpression': 'LONGITUDE'},
      {'label': 'Acquisition Date', 'fieldExpression': 'ACQ_DATE:DateString(hideTime:true)'},
      {'label': 'Acquisition Time', 'fieldExpression': 'ACQ_TIME'}
    ]
  }
}
```

This way you can add more languages and also use modifiers on fields. `fieldExpression` get's used in the same manner the JSAPI uses fields for popup content, in a string like so: '\${BRIGHTNESS}'. This is why we can use modifiers like `ACQ_DATE:DateString(hideTime:true)`. You can see a list of available modifiers here: [Format info window content](https://developers.arcgis.com/javascript/3/jshelp/intro_formatinfowindow.html)

### Strings

This portion refers to how a developer could add some new strings, if you are looking at adding translations, see [Translations](#translations) below. The convention to add new strings to the application is to add them in each language, in `src/js/languages.js`. The name should be all uppercase separated by an underscore. For example, a link in the navigation bar for the word about would be added four times, once for each supported language in their appropriate section, like so:

```javascript
strings.en.NAV_ABOUT = 'About';
...
strings.fr.NAV_ABOUT = 'About';
...
strings.es.NAV_ABOUT = 'About';
...
strings.pt.NAV_ABOUT = 'About';
```

Then in your components, or any other part of the code, simply import the languages module, get the current language from React's context(or pass it out from a component if needs be).

```javascript
import text from 'js/languages';

export default class MyComponent extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    const { language } = this.context;

    return <div>{text[language].NAV_ABOUT}</div>;
  }
}
```

### Translations

If you are adding or fixing translations. The strings used in the application can be found in two locations. The majority of them will be in the `src/js/languages.js` file. They are prefixed by the two digit country code. Add the appropriate translation in the correct language section. You may see something like this:

```javascript
strings.en.DATA = 'Data'; //English
...
strings.fr.DATA = 'Data'; // French
...
strings.es.DATA = 'Data'; // Spanish
...
strings.pt.DATA = 'Data'; // Portuguese
```

The other location is the `src/js/resources.js` file. There are `layers` and `basemaps` each with subsections for each of the four languages. In each subsection is an array or objects containing the layer configuration. Be careful what you change in here, the only three things related to labels are `label`, `sublabel`, and `group`. The `group` refers to the name on the accordion, it needs to be the same as the other layers in the same group (they are linked by a `groupKey`).

### Deployment

Backup 1.5.0 folder

`aws s3 sync s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/ /Users/dstarr/Desktop/MapbuilderBackups/04212022/ --profile wri`

Copy dist folder into 1.5.0 aws folder

`aws s3 sync --content-type "text/html" /Users/dstarr/Documents/dev/gfw-mapbuilder/dist/ s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/ --profile wri`

Copy dist > 1.5.0.js file in dist folder into 1.5.0.js file in aws folder

`aws s3 cp --content-type "text/html" /Users/dstarr/Documents/dev/gfw-mapbuilder/dist/loader/1.5.0.js s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/1.5.0.js --profile wri`

Clear cache

`aws cloudfront create-invalidation --distribution-id E58RE0T7L0R9N --path "/" --profile wri`

`aws cloudfront create-invalidation --distribution-id E2B81LN86UDRTJ --path "/" --profile wri`
