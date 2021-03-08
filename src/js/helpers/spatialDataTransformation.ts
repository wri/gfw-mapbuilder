interface SpatialReference {
  wkid: number;
}

interface GenericProperties {
  AFFGEOID?: string;
  GEOID?: string;
  NAME?: string;
}

interface FeatureResult {
  geometry?: __esri.Geometry;
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
  const output: any[] = [];
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
  const output: any[] = [];
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

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L504-L519
function vertexIntersectsVertex(a1: any, a2: any, b1: any, b2: any): boolean {
  const uaT =
    (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
  const ubT =
    (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
  const uB =
    (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

  if (uB !== 0) {
    const ua = uaT / uB;
    const ub = ubT / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return true;
    }
  }
  return false;
}

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L521-L531
function arrayIntersectsArray(a: any, b: any): boolean {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < b.length - 1; j++) {
      if (vertexIntersectsVertex(a[i], a[i + 1], b[j], b[j + 1])) {
        return true;
      }
    }
  }
  return false;
}

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L470-L480
function coordinatesContainPoint(coordinates: any, point: any): boolean {
  let contains = false;
  for (let i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
    if (
      ((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
        (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
      point[0] <
        ((coordinates[j][0] - coordinates[i][0]) *
          (point[1] - coordinates[i][1])) /
          (coordinates[j][1] - coordinates[i][1]) +
          coordinates[i][0]
    ) {
      contains = !contains;
    }
  }
  return contains;
}

// ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L106-L113
function coordinatesContainCoordinates(outer: any, inner: any): boolean {
  const intersects = arrayIntersectsArray(outer, inner);
  const contains = coordinatesContainPoint(outer, inner[0]);
  if (!intersects && contains) {
    return true;
  }
  return false;
}

// do any polygons in this array contain any other polygons in this array?
// used for checking for holes in arcgis rings
// ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L117-L172
function convertRingsToGeoJSON(rings: any) {
  const outerRings: any[] = [];
  const holes: any[] = [];
  let x: any; // iterator
  let outerRing: any; // current outer ring being evaluated
  let hole: any; // current hole being evaluated

  // for each ring
  for (let r = 0; r < rings.length; r++) {
    const ring = closeRing(rings[r].slice(0));
    if (ring.length < 4) {
      continue;
    }
    // is this ring an outer ring? is it clockwise?
    if (ringIsClockwise(ring)) {
      const polygon = [ring];
      outerRings.push(polygon); // push to outer rings
    } else {
      holes.push(ring); // counterclockwise push to holes
    }
  }

  const uncontainedHoles: any[] = [];

  // while there are holes left...
  while (holes.length) {
    // pop a hole off out stack
    hole = holes.pop();

    // loop over all outer rings and see if they contain our hole.
    let contained = false;
    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];
      if (coordinatesContainCoordinates(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        contained = true;
        break;
      }
    }

    // ring is not contained in any outer ring
    // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320
    if (!contained) {
      uncontainedHoles.push(hole);
    }
  }

  // if we couldn't match any holes using contains we can try intersects...
  while (uncontainedHoles.length) {
    // pop a hole off out stack
    hole = uncontainedHoles.pop();

    // loop over all outer rings and see if any intersect our hole.
    let intersects = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];
      if (arrayIntersectsArray(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      outerRings.push([hole.reverse()]);
    }
  }

  if (outerRings.length === 1) {
    return {
      type: 'Polygon',
      coordinates: outerRings[0]
    };
  } else {
    return {
      type: 'MultiPolygon',
      coordinates: outerRings
    };
  }
}

// shallow object clone for feature properties and attributes
// from http://jsperf.com/cloning-an-object/2
function shallowClone(obj) {
  const target = {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}

export function arcgisToGeoJSON(arcgis: any, idAttribute?: any) {
  let geojson = {} as any;

  if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
    geojson.type = 'Point';
    geojson.coordinates = [arcgis.x, arcgis.y];
  }

  if (arcgis.points) {
    geojson.type = 'MultiPoint';
    geojson.coordinates = arcgis.points.slice(0);
  }

  if (arcgis.paths) {
    if (arcgis.paths.length === 1) {
      geojson.type = 'LineString';
      geojson.coordinates = arcgis.paths[0].slice(0);
    } else {
      geojson.type = 'MultiLineString';
      geojson.coordinates = arcgis.paths.slice(0);
    }
  }

  if (arcgis.rings) {
    geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
  }

  if (arcgis.geometry || arcgis.attributes) {
    geojson.type = 'Feature';
    geojson.geometry = arcgis.geometry
      ? arcgisToGeoJSON(arcgis.geometry)
      : null;
    geojson.properties = arcgis.attributes
      ? shallowClone(arcgis.attributes)
      : null;
    if (arcgis.attributes) {
      geojson.id =
        arcgis.attributes[idAttribute] ||
        arcgis.attributes.OBJECTID ||
        arcgis.attributes.FID;
    }
  }

  return geojson;
}
