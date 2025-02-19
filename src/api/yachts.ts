import {apiClient} from "./apiClient";
import paths from "./paths";
import { Yacht } from "../types/yachts";
import { Idealyacht } from "../types/yachts";
import { bookYacht } from "../types/yachts";

export interface CouponCode {
  promoCode: string;
  grandTotal: number;
  bookingId: string;
}

export interface CodeResponse{
  discount: number;
  discountType: string;
  orderId: string;
}

export const yachtAPI = {
    getAllYachts: async (): Promise<Yacht[]> => {
      const response = await apiClient.get(paths.getYachtList);
      return response.data;
    },

    getTopYachts: async (): Promise<Yacht[]> => {
      const response = await apiClient.get(paths.getTopYachts);
      return response.data;
    },

    getIdealYatchs: async (filters: Idealyacht): Promise<Idealyacht> => {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(paths.locationFilter, filters, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },

    bookYacht: async (booking: bookYacht): Promise<bookYacht> => {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(`${paths.bookYacht}/${booking.yacht}`, booking, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },
    getYachtById: async (id : string): Promise<Yacht[]> => {
      const response = await apiClient.get(`${paths.getYachtById}/${id}`);
      return response.data;
    },
    couponCode: async (coupon : CouponCode): Promise<CodeResponse> => {
      const response = await apiClient.post(paths.couponCode, {coupon});
      return response.data;
    },
  };
