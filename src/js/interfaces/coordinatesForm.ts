export interface SpecificDDSection {
  rowNum: number;
  latitude: number;
  longitude: number;
}

export interface DDFormValues {
  userInput: string;
  rowNum: number;
  coordinateType: string;
}

export interface DDSectionProps {
  key: number;
  ddSection: SpecificDDSection;
  degreeSymbol: string;
  renderRemoveButton: boolean;
  setDDFormValues: (formValues: DDFormValues) => void;
  setSection: (addSection: boolean) => void;
}
