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
        latitude.seconds / 3600 + latitude.minutes / 60 + latitude.degree;
    } else {
      convertedLatitude =
        (longitude.seconds / 3600 - longitude.minutes / 60 + longitude.degree) *
        -1;
    }

    if (longitude.cardinalPoint === 'E') {
      convertedLongitude =
        longitude.seconds / 3600 + longitude.minutes / 60 + longitude.degree;
    } else {
      convertedLongitude =
        longitude.seconds / 3600 +
        longitude.minutes / 60 +
        longitude.degree * -1;
    }

    return new Point({
      latitude: convertedLatitude,
      longitude: convertedLongitude
    });
  });
};
