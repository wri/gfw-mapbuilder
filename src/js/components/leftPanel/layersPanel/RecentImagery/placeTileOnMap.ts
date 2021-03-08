import { mapController } from '../../../../../js/controllers/mapController';
import { LayerFactory } from '../../../../../js/helpers/LayerFactory';

export default function placeTileOnMap(tile: any): void {
  //Grab Imagery Layer
  const tileURL = tile.tileUrl;
  let imageryLayer = mapController._map?.findLayerById('RECENT_IMAGERY');
  if (imageryLayer && mapController._map) {
    mapController._map.remove(imageryLayer);
  }
  //@ts-ignore
  imageryLayer = LayerFactory(mapController._mapview, {
    id: 'RECENT_IMAGERY',
    title: 'Recent Imagery',
    visible: true,
    url: tileURL,
    type: 'imagery'
  });
  if (!imageryLayer) return;
  mapController._map?.add(imageryLayer);
  //Sync opacity from previous tile
  imageryLayer.opacity = mapController._imageryOpacity;
  //imagery layer is always on the bottom
  mapController._map?.reorder(imageryLayer, 1);
}
/*
//TODO: Logic below creates a Poly from imagery data in order to display hover info, we may need this logic if user requirements change
  if (imageryLayer) {
    //Remove all graphics from the layer
    imageryLayer.removeAll();

    const tileURL = tile.tileUrl;

    //new esri polygon that will be our imagery
    const polygon = new Polygon({
      rings: tile.attributes.bbox.geometry.coordinates
    });
    // const graphic = new Graphic({
    //   geometry: polygon,
    //   symbol
    // })
    const spatialRef = new SpatialReference({
      wkid: 102100
    });
    const projectionParameters = new ProjectParameters({
      geometries: [polygon],
      outSpatialReference: spatialRef
    });
    // projectionParameters.geometries = [polygon];
    projectionParameters.outSpatialReference.isWebMercator;

    console.log(
      'defaultfunctionplaceTileOnMap -> projectionParameters',
      projectionParameters
    );
    // projectionParameters.outSpatialReference = {
    //   imageCoordinateSystem: 102100
    // };
    // outSpatialReference: '',
    // geometries: polygon
    // const geometryService = new GeometryService({
    //   url:
    //     'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'
    // });
    // geometryService
    //   .project(projectionParameters)
    //   .then(results => {
    //     console.log(results);
    //   })
    //   .catch(e => console.log(e));

    //yayayay
    //@ts-ignore
    const tt = LayerFactory(mapController._mapview, {
      id: 'some',
      title: 'my',
      visible: true,
      url: tileURL,
      type: 'gain'
    });
    mapController._map?.add(tt);
    mapController._map?.reorder(tt, 1);
    console.log('defaultfunctionplaceTileOnMap -> tt', tt);
  }
}
*/
