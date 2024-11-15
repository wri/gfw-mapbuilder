import * as query from '@arcgis/core/rest/query';

//Generic ESRI query helper
export async function esriQuery(url: string, queryParams: any): Promise<__esri.FeatureSet | any> {
  try {
    const queryResult = (await query.executeQueryJSON(url, queryParams)) as __esri.FeatureSet;
    return queryResult.features.map((feature) => feature.attributes);
  } catch (error) {
    return;
  }
}
