export async function fetchLegendInfo(layerUrl: string): Promise<any> {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 2500, 'Legend info request time out');
  });

  const fetchLegendInfo = new Promise((resolve, reject) => {
    fetch(`${layerUrl}/legend?f=pjson`)
      .then(result => result.json())
      .then(data => resolve(data))
      .catch(reject);
  });

  return Promise.race([timeout, fetchLegendInfo])
    .then(legendInfoJSON => legendInfoJSON)
    .catch(e => console.error(e));
}
