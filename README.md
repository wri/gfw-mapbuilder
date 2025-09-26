[![Build Status](https://github.com/wri/gfw-mapbuilder/workflows/build-and-deploy/badge.svg)](https://github.com/wri/gfw-mapbuilder/actions)

# GFW Mapbuilder Project Overview

This document provides a comprehensive overview of the GFW Mapbuilder application, including its architecture, project structure, and primary functionalities.

## 1. High-Level Summary

The GFW Mapbuilder is a web application designed to display and interact with geospatial data through a configurable map interface. It is built as a template for ArcGIS Online, allowing for easy deployment and customization. The application leverages the Esri ArcGIS API for JavaScript to handle map rendering and data visualization, with a frontend built on React and TypeScript.

The core philosophy of the Mapbuilder is to be highly configurable. Most of the application's features, including the layers displayed on the map, the layout of the UI, and even language translations, are controlled by external configuration files. This allows for the creation of different map applications for various regions or purposes without modifying the core source code.

# GFW Map Builder ArcGIS Online Template

> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Getting Started

Before you can begin, make sure you have [node.js](https://nodejs.org/en/).

### Env variables

Create .env file at the root of the project and add `REACT_APP_PLANET_API_KEY` checkout `.env.examples` file.
Reach out to point of contact for Mapbuilder and ask for api key

Make sure you are using Node version 16x or greater

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

#### Adding or updating core layers for MapBuilder

Layer configuration is located at`configs/layers/*`

To Update layer config:

- To update layer configuration navigate to the `configs/layers/`, open the index.ts file
- If you were to update ** Glad Alerts ** layer label for example, navigate to `configs/layers/glad-alerts/index.ts`

To Add a new layer config:

- For consistency folder name is the same as layer name, `glad-alerts`
- Navigate to `configs/`, create a folder inside layers folder, make sure folder name matches the layer name for consistency.
- Once folder created, create an `index.ts` file and add your new layer configuration.
- If you are not sure about the expected config schema, you can also reference any of the other layers OR
  there is also a a schema example of what is expected in `configs/layers/types/index.ts` that you can also reference.

- Once new config layer is created, you need to import your new layer configuration to `configs/layers/layers-content-config.ts`.
- import your new layer configuration from here, for example:
  `import newLayerConfig from './new-layer-config'`
- Lastly, add your imported layer configuration to `layersContentConfig` list

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

### Core Technologies

The application is built with a modern web stack:

- **Frontend Framework:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) for building a component-based, type-safe user interface.
- **State Management:** [Redux](https://redux.js.org/) for centralized and predictable application state management.
- **Mapping Library:** [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) for all geospatial functionality, including map rendering, layer management, and spatial analysis.
- **Build System:** [Webpack](https://webpack.js.org/) is used to bundle the application for development and production, with configurations for code splitting, optimization, and asset management.
- **Styling:** SCSS and [Styled Components](https://styled-components.com/) for styling the application.
- **End-to-End Testing:** [Cypress](https://www.cypress.io/) for automated end-to-end testing of the application.

### Project Structure

The project is organized into several key directories:

- **`/src`**: This is the main directory for the application's source code.

  - **`/src/js`**: Contains the core TypeScript and React code.
    - **`/components`**: This directory holds the React components that make up the UI. It is further subdivided by feature, such as `header`, `leftPanel`, `mapview`, and `report`.
    - **`/store`**: The Redux store is defined here, with subdirectories for `actions`, `reducers`, and `types`. This manages the global state of the application.
    - **`/layers`**: Contains definitions and logic for the various types of map layers the application can display (e.g., `GladLayer`, `TreeCoverLossLayer`).
    - **`/helpers`**: A collection of utility functions and helper classes used throughout the application. Key helpers include `LayerFactory.ts` for creating layer instances and `mapController.ts` for managing the map.
    - **`/controllers`**: Contains the main application logic, such as the `mapController.ts` which orchestrates map interactions.
    - **`index.tsx`**: The main entry point of the application, where the React application is rendered and the Redux store is initialized.
  - **`/src/css`**: Contains the SCSS stylesheets for the application.
  - **`/src/assets`** and **`/src/images`**: Static assets like icons, images, and fonts.
  - **`index.html`**: The main HTML file that serves as the entry point for the web application.

- **`/configs`**: This directory is central to the application's configurability.

  - **`resources.js`**: The main configuration file for the application. It defines the web map ID, layers, UI elements, themes, and other application-level settings.
  - **`/layers`**: Contains detailed configurations for individual data layers.
  - **`/translations`**: Holds the language files for internationalization.
  - **`/countryConfigs`**: Provides specific configurations for different countries or regions.

- **`/webpack.*.js`**: Webpack configuration files for different environments (`common`, `development`, `production`).

- **`/cypress`**: Contains the end-to-end tests for the application.

- **`package.json`**: Defines the project's dependencies, scripts, and metadata.

- **`tsconfig.json`**: The configuration file for the TypeScript compiler.

#### Architecture and Data Flow

The application follows a modern, component-based architecture with a centralized state management pattern.

1.  **Application Initialization**: The application starts with `src/js/index.tsx`. This file renders the main `App` component and injects the Redux store, making the application state available to all components.

2.  **Configuration Loading**: On startup, the application loads its configuration from `configs/resources.js` and other files in the `/configs` directory. This configuration object dictates which layers are available, how the UI is structured, and what tools are enabled.

3.  **State Management (Redux)**: The Redux store serves as the single source of truth for the application state. This includes the current language, the visibility of layers, user information, and the state of various UI components. Actions are dispatched to update the state, and reducers specify how the state changes in response to these actions.

4.  **Component-Based UI (React)**: The user interface is built as a tree of React components. These components are organized by feature in the `/src/js/components` directory. Components can subscribe to the Redux store to access and display application state, and they can dispatch actions to trigger state changes.

5.  **Map Interaction (ArcGIS API)**: The `mapController.ts` is a key component that manages the ArcGIS map. It is responsible for:

    - Initializing the map with the configured basemaps and extent.
    - Using the `LayerFactory.ts` to create instances of map layers based on the configuration in `resources.js`.
    - Handling user interactions with the map, such as clicks, zooms, and pans.
    - Toggling the visibility of layers based on user input from the UI.

6.  **Dynamic Layer Generation**: One of the primary capabilities of the Mapbuilder is its ability to dynamically generate and manage map layers. The `LayerFactory.ts` reads the layer configurations from `resources.js` and creates the appropriate layer objects using the ArcGIS API. This allows for a flexible and easily customizable map experience.

### Deployment

see [deployment.md](/DEPLOY.md)
