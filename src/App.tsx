// App.tsx

import './App.css';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from './components/Layouts/MainLayout';
import Home from './components/Home/Home';
import Discover from './components/Discover/Discover';
import Booking from './components/Booking/Booking';
import Location from './components/Location/Location';
import Choose from './components/Choose/Choose';
import Details from './components/YachtDetails/YachtDetails';
import BookingDetails from './components/Booking/BookingDetails';
import Total from './components/Total/Total';
import SignUp from './components/LoginSignup/SignUp';
import Login from './components/LoginSignup/Login';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFailed from './components/Payment/PaymentFailed'; 
import Account from './components/Account/Account';
import BookingData from './components/Booking/BookingData';
import { useAppSelector, useAppDispatch } from './redux/store/hook';
import { setUserDetails } from './redux/slices/userSlice';
import { authAPI } from './api/auth';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  console.log("user id", userDetails.id )

  // On app load, if token exists but user details are not loaded, fetch the profile.
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check using userDetails.id so that the effect is not re-triggered unnecessarily.
    if (token && userDetails.id) {
      const fetchUserProfile = async () => {
        try {
          const response = await authAPI.getUserProfile();
          // @ts-ignore
          const profile = response.user;
          console.log("profile", profile)
          // Map API response to our store's userDetails structure.
          dispatch(setUserDetails({
            id: profile._id,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            role: profile.role,
            age: profile.age,
            address: profile.address,
            experience: profile.experience,
            accountHolderName: profile.accountHolderName,
            accountNumber: profile.accountNumber,
            bankName: profile.bankName,
            ifscCode: profile.ifscCode,
            imgUrl: profile.imgUrl,
            isVerified: profile.isVerified,
            isVerifiedByAdmin: profile.isVerifiedByAdmin,
          }));
        } catch (error) {
          console.error('Error fetching user profile', error);
        }
      };

      fetchUserProfile();
    }
  }, [dispatch, userDetails.id]); // Now we only depend on userDetails.id

  return (
    <>
      <Routes>
        <Route path="/signup/:referralCode?" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/discover" element={<MainLayout><Discover /></MainLayout>} />
        <Route path="/bookings" element={<MainLayout><Booking /></MainLayout>} />
        <Route path="/booking/:id" element={<MainLayout><BookingData /></MainLayout>} />
        <Route path="/location" element={<MainLayout><Location /></MainLayout>} />
        <Route path="/choose" element={<MainLayout><Choose /></MainLayout>} />
        <Route path="/yacht/:id" element={<MainLayout><Details /></MainLayout>} />
        <Route path="/booking-details" element={<MainLayout><BookingDetails /></MainLayout>} />

        {/* Protected routes */}
        <Route 
          path="/to-pay" 
          element={
            userDetails.id ? (
              <MainLayout><Total /></MainLayout>
            ) : (
              <Navigate to="/not-found" replace />
            )
          } 
        />
        <Route 
          path="/payment-success" 
          element={
            userDetails.id ? (
              <PaymentSuccess />
            ) : (
              <Navigate to="/not-found" replace />
            )
          } 
        />
        <Route 
          path="/payment-failed" 
          element={
            userDetails.id ? (
              <PaymentFailed />
            ) : (
              <Navigate to="/not-found" replace />
            )
          } 
        />
        <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
        <Route path="/not-found" element={<div>Not Found</div>} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
