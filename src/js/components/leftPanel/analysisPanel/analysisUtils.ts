import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import { ENV_VARIABLES } from '../../../../../configs/envVariables';
import { arcgisToGeoJSON } from '../../../helpers/spatialDataTransformation';
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
      response.chartTitle = data.data && data.data?.type ? data.data?.type + '-analysis.png' : 'analysis.png';
      //unclear why are we matching 'month' here but that's how it was done in 3x
      if (data.data.attributes?.downloadUrls?.csv?.includes('month')) {
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

  //3. Add SQL Query if it is defined in the configuration
  if (analysisId === 'VIIRS_FIRES' || analysisId === 'GLAD_ALERTS' || analysisId === 'GFW_INTEGRATED_ALERTS') {
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
    baseURL = baseURL.concat(`&sql=${sqlString}`);
  }
  const key = ENV_VARIABLES.GFW_DATA_API_KEY;
  return `${baseURL}&x-api-key=${key}`;
}
