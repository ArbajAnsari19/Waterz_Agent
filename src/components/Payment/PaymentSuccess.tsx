import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/Payment/Success.module.css"
const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <h1 className={styles.head}>Payment Successful!</h1>
      <p>Your booking has been confirmed.</p>
      <button onClick={() => navigate('/bookings')}>View My Bookings</button>
    </div>
  );
};

export default PaymentSuccess;