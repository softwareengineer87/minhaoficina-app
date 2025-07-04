
export interface Business {
  businessId: string;
  name: string;
  email: string;
  password: string;
  logo: string;
}

export interface BusinessPayload {
  token: string;
  message: string;
  payload: {
    businessId: string;
    name: string;
    email: string;
    city: string;
    district: string;
    addressNumber: number;
    logo: string;
  }
}


