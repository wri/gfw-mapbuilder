import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import GraphicLayer from 'esri/layers/GraphicsLayer';

export function miniMapInit(
  webmapID: string,
  htmlRef: React.RefObject<HTMLDivElement | null>,
  graphicLayer: GraphicLayer,
  geometry: __esri.Geometry
): void {
  if (!htmlRef.current) return;

  const mapRef = new WebMap({
    portalItem: {
      id: webmapID
    }
  });

  const miniMapView = new MapView({
    map: mapRef,
    container: htmlRef.current
  });

  miniMapView.when(() => {
    //Clean up mapview from UI elements and interactions
    miniMapView.ui.remove('zoom');
    miniMapView.ui.remove('attribution');
    miniMapView.on('mouse-wheel', function(event: any) {
      event.stopPropagation();
    });
    miniMapView.on('double-click', function(event: any) {
      event.stopPropagation();
    });
    miniMapView.on('drag', function(event: any) {
      event.stopPropagation();
    });

    //Remove All layers that are not needed
    mapRef.removeAll();

    //@ts-ignore
    mapRef.add(graphicLayer);
    miniMapView.goTo(geometry);
  });
}
