export function prepareStateForShare (options) {
  const {map, settings, language, basemap, activeLayers, activeTab, gladStartDate, gladEndDate, canopyDensity} = options;
  const shareState = {};
  //- Application info
  if (settings.appid) { shareState.appid = settings.appid; }
  //- Map Related Info
  const center = map.extent.getCenter();
  shareState.x = center.getLongitude().toFixed(2);
  shareState.y = center.getLatitude().toFixed(2);
  shareState.z = map.getLevel();
  shareState.l = language;
  shareState.b = basemap;
  shareState.a = activeLayers;
  shareState.t = activeTab;
  shareState.c = canopyDensity;
  shareState.gs = gladStartDate;
  shareState.ge = gladEndDate;
  console.log(shareState);
  return shareState;
}
