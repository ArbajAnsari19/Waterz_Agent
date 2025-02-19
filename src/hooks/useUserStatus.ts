// hooks/useUserStatus.ts

import { useAppSelector } from '../redux/store/hook';
import { UserDetails } from '../types/user';

export const useUserStatus = () => {
  const userDetails: UserDetails = useAppSelector(state => state.user.userDetails);
  const isLoggedIn = !!userDetails.id;

  // Define profile completeness based on required fields
  const isProfileComplete =
    userDetails.age !== undefined &&
    userDetails.address !== undefined &&
    userDetails.experience !== undefined &&
    userDetails.accountHolderName &&
    userDetails.accountNumber &&
    userDetails.bankName &&
    userDetails.ifscCode;

  // Check verified status either through the boolean flag or admin acceptance.
  const isVerified = userDetails.isVerifiedByAdmin === 'accepted';

  return { isLoggedIn, isProfileComplete, isVerified, userDetails };
};
