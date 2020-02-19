interface CoordinateObject {
  degree: string;
  minutes: string;
  seconds: string;
  cardinalPoint: string;
}

export interface SpecificDMSSection {
  rowNum: number;
  latitude: CoordinateObject;
  longitude: CoordinateObject;
}

export interface DMSFormValues {
  coordinateValue: string;
  rowNum: number;
  coordinateType: string;
  degreeType: string;
  cardinalPoint?: string;
}

export interface CoordinateProps {
  degree: string;
  minutes: string;
  seconds: string;
  cardinalPoint: string;
}

export interface DMSCardinalPoint {
  specificPoint?: string;
  rowNum?: number;
  coordinateType?: string;
}
