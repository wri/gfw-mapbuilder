export interface AOIDataResponse {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  application: string;
  geostore: string;
  wdpaid: null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  datasets: any[];
  use: any;
  iso: any;
  admin: any;
  tags: any[];
  status: string;
  public: boolean;
  fireAlerts: boolean;
  deforestationAlerts: boolean;
  webhookUrl: string;
  monthlySummary: boolean;
  subscriptionId: string;
  email: string;
  language: string;
  confirmed: boolean;
}
