// src/components/Payment/PaymentSuccess.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Payment Unsuccessful!</h1>
      <p>Your booking has not been confirmed, Please restart the booking.</p>
      <button onClick={() => navigate('/bookings')}>View My Bookings</button>
    </div>
  );
};

export default PaymentSuccess;