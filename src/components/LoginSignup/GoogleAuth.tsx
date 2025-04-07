import React from 'react';
import styles from '../../styles/LoginSignup/Login.module.css';
import googleIcon from '../../assets/LoginSignUp/google.svg';

interface GoogleAuthButtonProps {
  text: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ text }) => {
  const handleGoogleAuth = () => {
    // // Redirect to the backend Google auth endpoint
    // window.location.href = 'http://localhost:8000/auth/google';
    
    // Use this for production:
    window.location.href = 'https://www.backend.wavezgoa.com/auth/google';
  };

  return (
    <button 
      type="button" 
      className={styles.googleButton}
      onClick={handleGoogleAuth}
    >
      <img src={googleIcon} alt="Google" />
      {text}
    </button>
  );
};

export default GoogleAuthButton;