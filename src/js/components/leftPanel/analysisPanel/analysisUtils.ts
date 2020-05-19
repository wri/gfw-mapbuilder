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
// export function wcsWidget() {}
