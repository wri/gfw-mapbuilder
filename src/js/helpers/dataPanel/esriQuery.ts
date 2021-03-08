import { loadModules } from 'esri-loader';
//Generic ESRI query helper
export async function esriQuery(
  url: string,
  queryParams: any
): Promise<__esri.FeatureSet> {
  const [QueryTask, Query] = await loadModules([
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query'
  ]);
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}
