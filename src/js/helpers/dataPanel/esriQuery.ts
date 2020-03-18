import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';

//Generic ESRI query helper
export function esriQuery(
  url: string,
  queryParams: any
): Promise<__esri.FeatureSet> {
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}
