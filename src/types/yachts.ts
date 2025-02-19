export interface PriceDetail {
  peakTime: number;
  nonPeakTime: number;
}

export interface Price {
  sailing: PriceDetail;
  anchoring: PriceDetail;
}

export interface AddonService {
  service: string;
  pricePerHour: number;
  _id: string;
}

export interface Yacht {
  _id: string;
  owner: string;
  name: string;
  isVerifiedByAdmin: string;
  location: string;
  pickupat: string;
  YachtType: string;
  description: string;
  price: Price;
  addonServices: AddonService[];
  availability: boolean;
  amenities: string[];
  capacity: number;
  mnfyear: number;
  packageTypes: string[];
  dimension: string;
  crewCount: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  bookings: any[];
  averageRating: number | null;
  bookingCount: number;
}


export interface BookingServices {
  service: string;
  hours: number;
}

export interface Idealyacht{
  startDate: string;
  startTime: string;
  location: string;
  YachtType: string;
  capacity: number;
  PeopleNo: number;
  addonServices: BookingServices[];
  packages: string[];
}

export interface bookYacht{
  startDate: string;
  startTime: string;
  duration: string;
  location: string;
  specialRequest: string;
  PeopleNo: string;
  specialEvent: string;
  sailingTime: string;
  stillTime: string;
  user: string;
  yacht: string;
  packages: string[];
}