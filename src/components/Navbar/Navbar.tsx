
import React, { useEffect } from "react";
import styles from "../../styles/Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hook";
import { setUserDetails, clearUserDetails } from "../../redux/slices/userSlice";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        // Check for token in localStorage when component mounts
        const token = localStorage.getItem('token');
        // console.log("token", token)
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                dispatch(setUserDetails(parsedUserData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                // Clear invalid data from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                dispatch(clearUserDetails());
            }
        }
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        dispatch(clearUserDetails());
    };

    return (
        <div className={styles.comp_body}>
            <div className={styles.content}>
                <Link to="/">
                    <div className={styles.item}>Home</div>
                </Link>
                <Link to="/discover">
                    <div className={styles.item}>Discover</div>
                </Link>
                <Link to="/bookings">
                    <div className={styles.item}>My Bookings</div>
                </Link>
                <Link to="/location">
                    <div className={styles.item}>Location</div>
                </Link>
                {isAuthenticated ? (
                    <div className={styles.account_section}>
                        <Link to="/account">
                            <div className={styles.item}>Account</div>
                        </Link>
                        {/* <div 
                            className={styles.item} 
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            Logout
                        </div> */}
                    </div>
                ) : (
                    <Link to="/signup">
                        <div className={styles.item}>SignUp</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;


// import React from "react";
// import styles from "../../styles/Navbar/Navbar.module.css"
// import { Link } from "react-router-dom";

// const Navbar: React.FC = () => {
//     return(
//         <div className={styles.comp_body}>
//             <div className={styles.content}>
//                 <Link to="/">
//                     <div className={styles.item}>Home</div>
//                 </Link>
//                 <Link to="/discover">
//                     <div className={styles.item}>Discover</div>
//                 </Link>
//                 <Link to="/bookings">
//                     <div className={styles.item}>My Bookings</div>
//                 </Link>
//                 <Link to="/location">
//                 <div className={styles.item}>Location</div>
//                 </Link>
//                 <Link to="/signup">
//                 <div className={styles.item}>SignUp</div>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Navbar;