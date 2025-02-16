export interface Prices {
  peakTime: number;
  nonPeakTime: number;
}

  
export interface YachtPrice {
  sailing: Prices;
  anchoring: Prices;
}
  
  export interface Yacht {
    _id: string;
    name: string;
    description: string;
    location: string;
    capacity: number;
    price: YachtPrice;
    owner: string;
    availability: boolean;
    amenities: string[];
    mnfyear: number;
    dimension: string;
    crews: number;
    images: string[];
}

export interface Idealyacht{
  startDate: string;
  startTime: string;
  duration: string;
  location: string;
  YachtType: string;
  capacity: string;
  priceRange: string;
  tripType: string;
  additionalServices: string[];
  specialRequest: string;
  PeopleNo: string;
  specialEvent: string;
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
}