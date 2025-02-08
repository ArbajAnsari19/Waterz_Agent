export interface YachtPrice {
    sailing: number;
    still: number;
  }
  
  export interface Crew {
    name: string;
    role: string;
    _id: string;
  }
  
  export interface Yacht {
    _id: string;
    name: string;
    description: string;
    location: string | { type: string; coordinates: number[] };
    capacity: number;
    price: YachtPrice;
    owner: string;
    availability: boolean;
    amenities: string[];
    mnfyear: number;
    dimension: string;
    crews: Crew[];
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