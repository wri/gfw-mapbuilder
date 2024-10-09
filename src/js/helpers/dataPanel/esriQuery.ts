import * as query from '@arcgis/core/rest/query';

//Generic ESRI query helper
// TEST: make sure this still works as expected
export async function esriQuery(url: string, queryParams: any): Promise<__esri.FeatureSet | any> {
  //const [QueryTask, Query] = await loadModules(['esri/tasks/QueryTask', 'esri/tasks/support/Query']);
  //const qt = new QueryTask({ url });
  //const query = new Query(queryParams);

  try {
    const queryResult = (await query.executeQueryJSON(url, queryParams)) as __esri.FeatureSet;
    return queryResult.features.map((feature) => feature.attributes);
  } catch (error) {
    return;
  }

  /* try {
    const result = await qt.execute(query);
    return result;
  } catch (error) {
    console.log('error', error);
    return [];
  } */
}
