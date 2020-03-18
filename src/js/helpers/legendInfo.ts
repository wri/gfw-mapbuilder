//Helper that fetches legend information from mapserver
export async function fetchLegendInfo(layerUrl: string): Promise<any> {
  const legendRes = await fetch(`${layerUrl}/legend?f=pjson`)
    .then(result => result.json())
    .then(data => data)
    .catch(e => console.log(e));
  return legendRes;
}
