import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hook";
import { setUserDetails } from "../../redux/slices/userSlice";
import styles from "../../styles/LoginSignup/Login.module.css";
import loginPic from "../../assets/LoginSignUp/signup.webp";
import googleIcon from "../../assets/LoginSignUp/google.svg";
import { authAPI } from "../../api/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'agent',
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await authAPI.login(formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        dispatch(setUserDetails({
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role
        }));
      }
      
      navigate('/discover');
      
    } catch (err: any) {
      const errorMessage = err.type === 'AUTH_ERROR' 
        ? 'Invalid email or password'
        : err.message || 'Failed to login. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container_body}>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <div className={styles.formHeader}>
            <span className={styles.userType}>Agent</span>
            <h1 className={styles.formTitle}>Welcome Back!</h1>
            <p className={styles.formSubtitle}>Enter your Credentials to get access to your account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button 
              type="button" 
              className={styles.googleButton}
              disabled={isLoading}
            >
              <img src={googleIcon} alt="Google" />
              Sign In with Google
            </button>

            <p className={styles.loginPrompt}>
              Don't have an account? <a href="/signup" className={styles.link}>Sign Up</a>
            </p>
          </form>
        </div>

        <div className={styles.imageSection}>
          <img 
            src={loginPic}
            alt="People enjoying on yacht"
            className={styles.SyachtImage}
          />
        </div>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  return <LoginForm />;
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../redux/store/hook";
// import { setUserDetails } from "../../redux/slices/userSlice";
// import styles from "../../styles/LoginSignup/Login.module.css";
// import loginPic from "../../assets/LoginSignUp/signup.webp";
// import googleIcon from "../../assets/LoginSignUp/google.svg";
// import Welcome from "./Welcome";
// import { authAPI } from "../../api/auth";

// interface LoginFormProps {
//   type: string;
// }

// const LoginForm = ({ type }: LoginFormProps) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: type,
//   });

//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.email || !formData.password) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await authAPI.login(formData);
      
//       // Store token and user data in localStorage
//       if (response.token) {
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('userData', JSON.stringify(response.user));
        
//         // Update Redux state with user details
//         dispatch(setUserDetails({
//           id: response.user.id,
//           email: response.user.email,
//           name: response.user.name,
//           role: response.user.role
//         }));
//       }
      
//       // Navigate to discover page
//       navigate('/discover');
      
//     } catch (err: any) {
//       const errorMessage = err.type === 'AUTH_ERROR' 
//         ? 'Invalid email or password'
//         : err.message || 'Failed to login. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container_body}>
//       <div className={styles.container}>
//         <div className={styles.contentSection}>
//           {error && (
//             <p className={styles.error}>{error}</p>
//           )}

//           <div className={styles.formHeader}>
//             <span className={styles.userType}>{type}</span>
//             <h1 className={styles.formTitle}>Welcome Back!</h1>
//             <p className={styles.formSubtitle}>Enter your Credentials to get access to your account</p>
//           </div>

//           <form onSubmit={handleSubmit} className={styles.form}>
//             <div className={styles.formGroup}>
//               <label>Email Address</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 disabled={isLoading}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 disabled={isLoading}
//               />
//             </div>

//             <button 
//               type="submit" 
//               className={styles.submitButton}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Logging in...' : 'Log In'}
//             </button>

//             <div className={styles.divider}>
//               <span>or</span>
//             </div>

//             <button 
//               type="button" 
//               className={styles.googleButton}
//               disabled={isLoading}
//             >
//               <img src={googleIcon} alt="Google" />
//               Sign In with Google
//             </button>

//             <p className={styles.loginPrompt}>
//               Don't have an account? <a href="/signup" className={styles.link}>Sign Up</a>
//             </p>
//           </form>
//         </div>

//         <div className={styles.imageSection}>
//           <img 
//             src={loginPic}
//             alt="People enjoying on yacht"
//             className={styles.SyachtImage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Login: React.FC = () => {
//   const [type, setType] = useState<string | null>(null);
  
//   return (
//     <>
//       {type === null ? (
//         <Welcome setType={setType} />
//       ) : (
//         <LoginForm type={type} />
//       )}
//     </>
//   );
// };

// export default Login;
