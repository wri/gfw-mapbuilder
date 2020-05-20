import * as webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
import { arcgisToGeoJSON } from 'js/helpers/spatialDataTransformation';

export async function fetchGFWWidgetConfig(url: string): Promise<any> {
  //GET request to grab the vega spec from the API
  return await fetch(url)
    .then((response: any) => response.json())
    .then((analysisMod: any) => {
      return analysisMod.data.attributes.widgetConfig;
    })
    .catch((e: Error) => console.error(e));
}

type DownloadResponse = {
  chartTitle: string | undefined;
  downloadUrl: string | undefined;
};
export async function fetchDownloadInfo(url: string): Promise<any> {
  return await fetch(url)
    .then((response: any) => response.json())
    .then((data: any) => {
      const response: DownloadResponse = {
        chartTitle: undefined,
        downloadUrl: undefined
      };
      response.chartTitle =
        data.data && data.data.type
          ? data.data.type + '-analysis.png'
          : 'analysis.png';
      //unclear why are we matching 'month' here but that's how it was done in 3x
      if (data.data.attributes.downloadUrls?.csv?.includes('month')) {
        response.downloadUrl =
          'https://production-api.globalforestwatch.org' +
          data.data.attributes.downloadUrls.csv;
      }
      return response;
    })
    .catch((e: Error) => console.error(e));
}

export async function fetchWCSAnalysis(
  analysisSettings: any,
  url: string,
  activeFeature: any,
  yearRange: number[],
  selectedLanguage: string
): Promise<any> {
  if (activeFeature.geometry.spatialReference.isWebMercator) {
    activeFeature.geometry = webMercatorUtils.webMercatorToGeographic(
      activeFeature.geometry
    );
  }
  const geojson = arcgisToGeoJSON(activeFeature.geometry);
  const content = {
    polygon: geojson.coordinates
  };
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
    .then(response => response.json())
    .then(data => {
      let startYear;
      let endYear;
      if (analysisSettings.uiParams !== 'none') {
        startYear = yearRange[0];
        endYear = yearRange[1];
        analysisSettings.startYear = Number(startYear);
        analysisSettings.endYear = Number(endYear);
      }
      let totalResult = 0;
      Object.keys(data).forEach(year => {
        if (year === 'constant') {
          totalResult = data[year];
        }
        if (
          parseInt(year) >= analysisSettings.startYear &&
          parseInt(year) <= analysisSettings.endYear
        ) {
          totalResult += data[year];
        }
      });
      data.totalResult = totalResult;
      data.startYear = yearRange[0];
      data.endYear = yearRange[1];
      data.title = analysisSettings.label[selectedLanguage];
      return {
        data: data
      };
    })
    .catch((e: Error) => console.error(e));
}
