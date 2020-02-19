export interface SpecificDMSSection {
  rowNum: number;
  latitude: {
    degree: string;
    minutes: string;
    seconds: string;
    cardinalPoint: string;
  };
  longitude: {
    degree: string;
    minutes: string;
    seconds: string;
    cardinalPoint: string;
  };
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
