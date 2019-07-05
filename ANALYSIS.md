# GFW Map Builder ArcGIS Online Template
> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Analysis
This section has moved. Please see the [Analysis Module Configuration](https://github.com/wri/gfw-mapbuilder/wiki/Analysis-Module-Configuration) section of the [GFW Map Builder Wiki](https://github.com/wri/gfw-mapbuilder/wiki) to learn how to configure your own analysis module.

### WCS-Specific Analysis
The Wildlife Conservation Society branch adheres to the examples above, but includes a small update for hitting External API's from Vega Widgets - see [this issue](https://github.com/wri/gfw-mapbuilder/issues/291) for details. Essentially, the `analysisId` parameter is now being appended onto the API call: [this clause](https://github.com/wri/gfw-mapbuilder/pull/408/files#diff-7ccf8f8e98600aa478433e875b80e53dR395) represents how the `queryParams` are updated.
