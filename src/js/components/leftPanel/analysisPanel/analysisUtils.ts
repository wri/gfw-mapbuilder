import { loadModules } from 'esri-loader';
import { arcgisToGeoJSON } from '../../../../js/helpers/spatialDataTransformation';
import { markValueMap } from '../../mapWidgets/widgetContent/CanopyDensityContent';

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
        downloadUrl: undefined,
      };
      response.chartTitle = data.data && data.data.type ? data.data.type + '-analysis.png' : 'analysis.png';
      //unclear why are we matching 'month' here but that's how it was done in 3x
      if (data.data.attributes.downloadUrls?.csv?.includes('month')) {
        response.downloadUrl = 'https://production-api.globalforestwatch.org' + data.data.attributes.downloadUrls.csv;
      }
      return response;
    })
    .catch((e: Error) => console.error(e));
}

export async function fetchWCSAnalysis(
  analysisSettings: any,
  url: string,
  activeFeature: any,
  yearRange: number[] | null,
  selectedLanguage: string
): Promise<any> {
  const [webMercatorUtils] = await loadModules(['esri/geometry/support/webMercatorUtils']);
  if (activeFeature.geometry.spatialReference.isWebMercator) {
    activeFeature.geometry = webMercatorUtils.webMercatorToGeographic(activeFeature.geometry);
  }
  const geojson = arcgisToGeoJSON(activeFeature.geometry);
  const content = {
    polygon: geojson.coordinates,
  };
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      let startYear;
      let endYear;
      if (analysisSettings.uiParams !== 'none' && yearRange) {
        startYear = yearRange[0];
        endYear = yearRange[1];
        analysisSettings.startYear = Number(startYear);
        analysisSettings.endYear = Number(endYear);
      }
      let totalResult = 0;
      Object.keys(data).forEach((year) => {
        if (year === 'constant') {
          totalResult = data[year];
        }
        if (parseInt(year) >= analysisSettings.startYear && parseInt(year) <= analysisSettings.endYear) {
          totalResult += data[year];
        }
      });
      data.totalResult = totalResult;
      data.startYear = yearRange ? yearRange[0] : null;
      data.endYear = yearRange ? yearRange[1] : null;
      data.title = analysisSettings.label[selectedLanguage];
      return {
        data: data,
      };
    })
    .catch((e: Error) => console.error(e));
}

interface WidgetGenerateProps {
  analysisId: string;
  widgetId: string;
  geostoreId: string;
  sqlString: string;
  startDate?: string;
  endDate?: string;
  density?: number;
}
export function generateWidgetURL({
  analysisId,
  widgetId,
  geostoreId,
  sqlString,
  startDate,
  endDate,
  density,
}: WidgetGenerateProps): string {
  let baseURL = 'https://api.resourcewatch.org/v1/widget/';
  //1. Add Widget ID
  baseURL = baseURL.concat(`${widgetId}?`);

  //2. Add Geostore ID
  baseURL = baseURL.concat(`&geostore_id=${geostoreId}&geostore_origin=rw`);

  console.log(analysisId);
  //3. Add SQL Query if it is defined in the configuration
  if (analysisId === 'VIIRS_FIRES' || analysisId === 'GLAD_ALERTS') {
    let sqlQuery = sqlString;
    sqlQuery = sqlQuery.replace('{startDate}', `'${startDate}'`);
    sqlQuery = sqlQuery.replace('{endDate}', `'${endDate}'`);
    baseURL = baseURL.concat(`&sql=${sqlQuery}`);
  }
  if ((analysisId === 'TC_LOSS' || analysisId === 'IFL' || analysisId === 'TC_LOSS_TOTAL') && density !== undefined) {
    let sqlQuery = sqlString;
    sqlQuery = sqlQuery.replace('{density}', `${markValueMap[density]}`);
    baseURL = baseURL.concat(`&sql=${sqlQuery}`);
  }
  if (analysisId === 'LCC' || analysisId === 'TC_GAIN_TOTAL') {
    const sqlQuery = sqlString;
    baseURL = baseURL.concat(`&sql=${sqlQuery}`);
  }

  console.log(baseURL);
  return baseURL;
}
