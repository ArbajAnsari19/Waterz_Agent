import { apiClient } from './apiClient';
import { paths } from './paths';

export interface Booking {
  id: string;
  name: string;
  capacity: number;
  startingPrice: string;
  imageUrl: string;
}

export interface OwnerBookingType {
  id: string;
  yachtId: string;
  bookingDate: string;
  status: string;
  yacht?: {
    name: string;
    capacity: number;
    startingPrice: string;
    images: string[];
  }
}

export interface EarningsAnalytics {
  sevenDaysEarnings: number;
  thirtyDaysEarnings: number;
  totalEarnings: number;
  sevenDaysBookings: OwnerBookingType[];
  thirtyDaysBookings: OwnerBookingType[];
  allBookings: OwnerBookingType[];
}

export const bookingAPI = {
  getCurrentBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get(paths.currentRides);
    return response.data;
  },
  
  getPreviousBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get(paths.prevRides);
    return response.data;
  },
  getEarnings:async (): Promise<EarningsAnalytics> => {
    const response = await apiClient.get(paths.agentEarnings);;
    return response.data;
  }
};