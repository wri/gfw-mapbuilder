import Point from 'esri/geometry/Point';

export function convertDecimalToDMS(coordinateResults: any): object {
  const { latitude, longitude } = coordinateResults;

  const latitudeInteger = Math.floor(latitude);
  const latitudeMinutes = Math.floor((latitude % 1) * 60);
  const latitudeSeconds = Math.floor((latitudeMinutes % 1) * 60);

  const longitudeInteger = Math.floor(longitude);
  const longitudeMinutes = Math.floor((longitude % 1) * 60);
  const longitudeSeconds = Math.floor((longitudeMinutes % 1) * 60);

  const latitudeInDMS = `${latitudeInteger}°${latitudeMinutes}'${latitudeSeconds}"`;
  const longitudeInDMS = `${longitudeInteger}°${longitudeMinutes}'${longitudeSeconds}"`;

  return {
    latitude: latitudeInDMS,
    longitude: longitudeInDMS
  };
}

interface CoordinateResults {
  latitude: string;
  longitude: string;
}

// TODO - pair program on 'any' type
export function convertDMSToDecimal(coordinateResults: any): any {
  const { latitude, longitude } = coordinateResults;

  const [latDegree, latMinute, latSecond] = latitude // ? Is there a faster/better way of doing this
    .match(/\d+|\D+/g)
    .filter((coordinate: string) => Number(coordinate) >= 0)
    .map((coordinate: string) => Number(coordinate));

  const [longDegree, longMinute, longSecond] = longitude // ? Is there a faster/better way of doing this
    .match(/\d+|\D+/g)
    .filter((coordinate: string) => Number(coordinate) >= 0)
    .map((coordinate: string) => Number(coordinate));

  const latitudeInDecimal = latDegree + latMinute / 60 + latSecond / 3600;
  const longitudeInDecimal = longDegree + longMinute / 60 + longSecond / 3600;
  return {
    latitude: latitudeInDecimal,
    longitude: longitudeInDecimal
  };
}

// TODO - pair program on 'any' type
export function convertCoordinates(
  coordinateType: string,
  coordinateResults: any
): object {
  const { latitude, longitude } = coordinateResults;
  let convertedCoordinates = coordinateResults;

  const isString =
    typeof latitude && typeof longitude === 'string' ? true : false;
  const isNumber =
    typeof latitude && typeof longitude === 'number' ? true : false;

  // ? is there a better way to check isString or isNumber?
  // ! HEADS UP - is there a better way to check isString or isNumber?

  if (coordinateType === 'dms' && isNumber) {
    convertedCoordinates = convertDecimalToDMS(coordinateResults);
  }

  if (coordinateType === 'degree' && isString) {
    convertedCoordinates = convertDMSToDecimal(coordinateResults);
  }

  return convertedCoordinates;
}

export function convertMetersToSpecificUnit(
  distance: number | undefined,
  distanceUnit: string
): number | undefined {
  let convertedValue = distance;

  if (distance) {
    switch (distanceUnit) {
      case 'kilometers':
        convertedValue = distance / 1000;
        break;
      case 'feet':
      case 'us-feet':
        convertedValue = distance * 3.281;
        break;
      case 'yards':
        convertedValue = distance * 1.094;
        break;
      case 'nautical-miles':
        convertedValue = distance / 1852;
        break;
      case 'meters':
        convertedValue = distance;
        break;
      case 'miles':
      default:
        convertedValue = distance / 1609;
        break;
    }
  }

  return convertedValue;
}

export function convertSquareMetersToSpecificUnit(
  distance: number | undefined,
  distanceUnit: string
): number | undefined {
  let convertedValue = distance;

  if (distance) {
    switch (distanceUnit) {
      case 'acres':
        convertedValue = distance / 4047;
        break;
      case 'square-miles':
        convertedValue = distance / 2.59e6;
        break;
      case 'square-kilometers':
        convertedValue = distance / 1e6;
        break;
      case 'hectares':
        convertedValue = distance / 10000;
        break;
      case 'square-yards':
        convertedValue = distance * 1.196;
        break;
      case 'square-us-feet':
        convertedValue = distance * 10.764;
        break;
      case 'square-meters':
        convertedValue = distance;
        break;
      default:
        break;
    }
  }

  return convertedValue;
}
