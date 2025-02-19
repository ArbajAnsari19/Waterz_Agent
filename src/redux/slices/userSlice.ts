// redux/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserDetails } from '../../types/user';

const initialState: UserState = {
  userDetails: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.isAuthenticated = !!action.payload.id;
    },
    clearUserDetails: (state) => {
      state.userDetails = {};
      state.isAuthenticated = false;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserState, UserDetails } from '../../types/user';

// const initialState: UserState = {
//   userDetails: {},
//   isAuthenticated: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserDetails: (state, action: PayloadAction<UserDetails>) => {
//       state.userDetails = action.payload;
//       state.isAuthenticated = true;
//     },
//     clearUserDetails: (state) => {
//       state.userDetails = {};
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setUserDetails, clearUserDetails } = userSlice.actions;
// export default userSlice.reducer;