import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';

export function miniMapInit(
  webmapID: string,
  htmlRef: React.RefObject<HTMLDivElement | null>,
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

    const aoiGraphic = new Graphic({
      geometry: geometry,
      symbol: new SimpleFillSymbol({
        style: 'solid',
        color: [210, 210, 210, 0.0],
        outline: {
          color: [3, 188, 255],
          width: 3
        }
      })
    });

    const gLayer = new GraphicsLayer({
      graphics: [aoiGraphic]
    });

    mapRef.add(gLayer);
    miniMapView.goTo(geometry);
  });
}
