import { apiClient, nonAuthApiClient } from './apiClient';
import paths from './paths';
import { UserDetails } from '../types/user';

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: string;
}

interface AgentProfileData {
  age: number;
  address: string;
  experience: number;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  imgUrl?: string[];
}

interface OTPData {
  otp: number;
}

interface EmailData {
  otp: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await nonAuthApiClient.post(paths.login, credentials);
    return response.data;
  },

  signup: async (userData: SignupData, referralCode?: string) => {
    const url = referralCode 
      ? `${paths.signupAgent}/${referralCode}`
      : paths.signupAgent;
    const response = await nonAuthApiClient.post(url, userData);
    return response.data;
  },

  registerAgent: async (profileData: AgentProfileData) => {
    console.log('profileData', profileData);
    const response = await apiClient.post(paths.updateProfile, profileData);
    console.log('response', response);
    return response.data;
  },

  generateOTP: async (email: EmailData) => {
    const response = await nonAuthApiClient.post(paths.generateOtp, email);
    return response.data;
  },

  verifyOTP: async (otp: OTPData) => {
    const response = await nonAuthApiClient.post(paths.verifyOtp, otp);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post(paths.logout);
    return response.data;
  },

  getUserProfile: async (): Promise<UserDetails> => {
    const token = localStorage.getItem('token');
    const response = await apiClient.get(paths.getUserProfile,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  updateUserProfile: async (userData: Partial<UserDetails>) => {
    const response = await apiClient.put(paths.updateUserProfile, userData);
    return response.data;
  },
};