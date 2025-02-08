import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store/hook';
import { clearUserDetails } from '../../redux/slices/userSlice';
import { authAPI } from '../../api/auth';
import styles from '../../styles/Account/Account.module.css';
import { PencilIcon, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.user);
  
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    username: '',
    age: '',
    address: '',
    experience: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    imgUrl: ''
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!profileData.username || !profileData.age || !profileData.address || 
        !profileData.experience || !profileData.accountHolderName || 
        !profileData.accountNumber || !profileData.bankName || !profileData.ifscCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Convert string values to numbers where needed
      const formattedData = {
        ...profileData,
        age: parseInt(profileData.age),
        experience: parseInt(profileData.experience)
      };

      const response = await authAPI.registerAgent(formattedData);
      toast.success('Profile updated successfully!');
      setIsProfileOpen(false);
      
      // Optionally update user details in Redux if needed
      // dispatch(updateUserDetails(response.data));
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch(clearUserDetails());
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account</h1>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>
          <PencilIcon className={styles.editIcon} size={20} />
        </div>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>{userDetails.name}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Phone Number:</span>
            <span className={styles.value}>{userDetails.phone || '9876543210'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Email Id:</span>
            <span className={styles.value}>{userDetails.email}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.dropdownHeader} onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <h2 className={styles.sectionTitle}>Complete Your Profile</h2>
          <span className={`${styles.arrow} ${isProfileOpen ? styles.open : ''}`}>▼</span>
        </div>
        {isProfileOpen && (
          <div className={styles.dropdownContent}>
            <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username*</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age*</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profileData.age}
                    onChange={handleProfileChange}
                    placeholder="Enter age"
                    required
                    min="18"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="experience">Experience (years)*</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleProfileChange}
                    placeholder="Years of experience"
                    required
                    min="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address*</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    placeholder="Enter address"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="accountHolderName">Account Holder Name*</label>
                  <input
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    value={profileData.accountHolderName}
                    onChange={handleProfileChange}
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="accountNumber">Account Number*</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={profileData.accountNumber}
                    onChange={handleProfileChange}
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="bankName">Bank Name*</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={profileData.bankName}
                    onChange={handleProfileChange}
                    placeholder="Enter bank name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="ifscCode">IFSC Code*</label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={profileData.ifscCode}
                    onChange={handleProfileChange}
                    placeholder="Enter IFSC code"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                <Save size={16} className={styles.saveIcon} />
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.dropdownHeader} onClick={() => setIsAccountTypeOpen(!isAccountTypeOpen)}>
          <h2 className={styles.sectionTitle}>Account Type</h2>
          <span className={`${styles.arrow} ${isAccountTypeOpen ? styles.open : ''}`}>▼</span>
        </div>
        {isAccountTypeOpen && (
          <div className={styles.dropdownContent}>
            <p>{userDetails.role || 'Customer'}</p>
          </div>
        )}
      </section>

      {/* Rest of the sections remain the same */}
      <section className={styles.section}>
        <div className={styles.dropdownHeader} onClick={() => setIsTermsOpen(!isTermsOpen)}>
          <h2 className={styles.sectionTitle}>Terms & Conditions</h2>
          <span className={`${styles.arrow} ${isTermsOpen ? styles.open : ''}`}>▼</span>
        </div>
        {isTermsOpen && (
          <div className={styles.dropdownContent}>
            <p>Our terms and conditions...</p>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.dropdownHeader} onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
          <h2 className={styles.sectionTitle}>Security & Privacy Policy</h2>
          <span className={`${styles.arrow} ${isPrivacyOpen ? styles.open : ''}`}>▼</span>
        </div>
        {isPrivacyOpen && (
          <div className={styles.dropdownContent}>
            <p>Our privacy policy...</p>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.dropdownHeader} onClick={() => setIsHelpOpen(!isHelpOpen)}>
          <h2 className={styles.sectionTitle}>Help & Contact Us</h2>
          <span className={`${styles.arrow} ${isHelpOpen ? styles.open : ''}`}>▼</span>
        </div>
        {isHelpOpen && (
          <div className={styles.dropdownContent}>
            <p>Contact support at support@example.com</p>
          </div>
        )}
      </section>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Account;