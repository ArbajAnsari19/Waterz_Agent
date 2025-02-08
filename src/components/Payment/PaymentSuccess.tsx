// src/components/Payment/PaymentSuccess.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your booking has been confirmed.</p>
      <button onClick={() => navigate('/bookings')}>View My Bookings</button>
    </div>
  );
};

export default PaymentSuccess;