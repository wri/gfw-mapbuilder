import { Geometry } from 'esri/geometry';

interface SpatialReference {
  wkid: number;
}

interface GenericProperties {
  AFFGEOID?: string;
  GEOID?: string;
  NAME?: string;
}

interface FeatureResult {
  geometry?: Geometry;
  attributes: GenericProperties;
  id?: number | string; // ? What's the type? Haven't been able to determine this
}

interface GenericPolygonResult {
  rings?: Array<Array<number>>;
  spatialReference?: SpatialReference;
}

interface PointResult {
  x: number;
  y: number;
  spatialReference?: SpatialReference;
}

interface MultiPointResult {
  points: any;
  // ? What's the type? Haven't been able to determine this
  // TODO typesafe paths
  spatialReference?: SpatialReference;
}

interface GenericStringResult {
  paths: Array<any>;
  // ? What's the type? Haven't been able to determine this
  // TODO typesafe paths
  spatialReference?: SpatialReference;
}

// checks if 2 x,y points are equal
const pointsEqual = (a: Array<number>, b: Array<number>): boolean => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

// checks if the first and last points of a ring are equal and closes the ring
const closeRing = (coordinates: Array<Array<number>>): Array<Array<number>> => {
  if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
    coordinates.push(coordinates[0]);
  }
  return coordinates;
};

// determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
// or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
// points-are-in-clockwise-order
const ringIsClockwise = (ringToTest: Array<Array<number>>): boolean => {
  let total = 0;
  let i = 0;
  let pt1 = ringToTest[i];
  let pt2;
  for (i; i < ringToTest.length - 1; i++) {
    pt2 = ringToTest[i + 1];
    total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
    pt1 = pt2;
  }
  return total >= 0;
};

const orientRings = (poly: any): any => {
  // * NOTE: haven't been able to typesafe param/return
  // * without TS Errors
  // TODO [ ] - typesafe param & return
  const output = [];
  const polygon = poly.slice(0);
  const outerRing = closeRing(polygon.shift().slice(0));
  if (outerRing.length >= 4) {
    if (!ringIsClockwise(outerRing)) {
      outerRing.reverse();
    }

    output.push(outerRing);

    for (let i = 0; i < polygon.length; i++) {
      const hole = closeRing(polygon[i].slice(0));
      if (hole.length >= 4) {
        if (ringIsClockwise(hole)) {
          hole.reverse();
        }
        output.push(hole);
      }
    }
  }
  return output;
};

// This function flattens holes in multipolygons to one array of polygons
// used for converting GeoJSON Polygons to ArcGIS Polygons
const flattenMultiPolygonRings = (
  rings: Array<Array<number>>
): Array<Array<number>> => {
  const output = [];
  for (let i = 0; i < rings.length; i++) {
    const polygon = orientRings(rings[i]);
    for (let x = polygon.length - 1; x >= 0; x--) {
      const ring = polygon[x].slice(0);
      output.push(ring);
    }
  }
  return output;
};

export const geojsonToArcGIS = (
  geojson: any,
  // * NOTE: cannot typesafe param geojson without TS errors
  // TODO [ ] - typesafe geojson
  idAttribute = 'OBJECTID'
): any => {
  const spatialReference = { wkid: 4326 };
  let result;
  let i;

  switch (geojson.type) {
    case 'FeatureCollection':
      result = [];
      for (i = 0; i < geojson.features.length; i++) {
        result.push(geojsonToArcGIS(geojson.features[i], idAttribute));
      }
      break;
    case 'Feature':
      result = {} as FeatureResult;
      if (geojson.geometry) {
        result.geometry = geojsonToArcGIS(geojson.geometry, idAttribute);
      }
      result.attributes = geojson.properties
        ? { ...geojson.properties } // shallowClone(geojson.properties)
        : {};

      if (geojson.id) {
        result.attributes[idAttribute] = geojson.id;
      }
      break;
    case 'MultiPolygon':
      result = {} as GenericPolygonResult;
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'Point':
      result = {} as PointResult;
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];
      result.spatialReference = spatialReference;
      break;
    case 'MultiPoint':
      result = {} as MultiPointResult;
      result.points = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'LineString':
      result = {} as GenericStringResult;
      result.paths = [geojson.coordinates.slice(0)];
      result.spatialReference = spatialReference;
      break;
    case 'MultiLineString':
      result = {} as GenericStringResult;
      result.paths = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'Polygon':
      if (geojson.coordinates.length > 0) {
        result = {} as GenericPolygonResult;
        result.rings = orientRings(geojson.coordinates.slice(0));
        result.spatialReference = spatialReference;
      }
      break;
    case 'GeometryCollection':
      result = [];
      for (i = 0; i < geojson.geometries.length; i++) {
        result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }
      break;
  }

  return result;
};
