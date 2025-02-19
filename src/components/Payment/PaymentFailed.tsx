// src/components/Payment/PaymentSuccess.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/Payment/Failed.module.css"
const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <h1 className={styles.head}>Payment Failed!</h1>
      <p>Your booking has not been confirmed, Please restart the booking.</p>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default PaymentFailed;