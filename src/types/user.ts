// types/user.ts

export interface UserDetails {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  role?: string;
  // Extended profile fields
  age?: number;
  address?: string;
  experience?: number;
  accountHolderName?: string;
  accountNumber?: string;
  bankName?: string;
  ifscCode?: string;
  imgUrl?: string[];
  // Verification flags
  isVerified?: boolean;
  isVerifiedByAdmin?: string; // e.g. "accepted"
}

export interface UserState {
  userDetails: UserDetails;
  isAuthenticated: boolean;
}



// export interface UserDetails {
//     id?: string;
//     name?: string;
//     email?: string;
//     phone?: string;
//     type?: string;
//     role?: string;
//   }
  
// export interface UserState {
//   userDetails: UserDetails;
//   isAuthenticated: boolean;
// }