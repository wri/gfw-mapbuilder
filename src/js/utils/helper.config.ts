import Point from 'esri/geometry/Point';

import { SpecificDMSSection } from 'js/components/mapWidgets/widgetContent/coordinatesForm';

export const convertDMSToXY = (
  setDMSForm: Array<SpecificDMSSection>
): Array<Point> => {
  return setDMSForm.map(point => {
    const { latitude, longitude } = point;
    let convertedLatitude;
    let convertedLongitude;
    if (latitude.cardinalPoint === 'N') {
      convertedLatitude =
        Number(latitude.seconds) / 3600 +
        Number(latitude.minutes) / 60 +
        Number(latitude.degree);
    } else {
      convertedLatitude =
        (Number(longitude.seconds) / 3600 -
          Number(longitude.minutes) / 60 +
          Number(longitude.degree)) *
        -1;
    }

    if (longitude.cardinalPoint === 'E') {
      convertedLongitude =
        Number(longitude.seconds) / 3600 +
        Number(longitude.minutes) / 60 +
        Number(longitude.degree);
    } else {
      convertedLongitude =
        Number(longitude.seconds) / 3600 +
        Number(longitude.minutes) / 60 +
        Number(longitude.degree) * -1;
    }

    return new Point({
      latitude: convertedLatitude,
      longitude: convertedLongitude
    });
  });
};
