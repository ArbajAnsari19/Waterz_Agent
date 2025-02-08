import React, { useState } from 'react';
import styles from '../../styles/Contact/Contact.module.css';
import { userQueryAPI } from '../../api/userQuery';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.name || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await userQueryAPI.userQuery(formData);
      
      // Store the token if your API returns one
      if (response) {
        console.log('Query sent successfully');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
        setFormData({ name: '', email: '', message: '' });
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send query. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.heading}>Contact Us for Bookings & Queries</h1>
        <p className={styles.subHeading}>
          Reach out to Waterz in India for all your yacht booking needs.
        </p>
      </div>
      <div className={styles.rightSection}>
        {showSuccessMessage ? (
          <div className={styles.successMessage}>Your query added successfully!</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.inputField}>
                <div className={styles.label}>Name</div>
                <input
                  type="text"
                  placeholder="Name"
                  className={styles.input}
                  aria-label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.inputField}>
                <div className={styles.label}>Email</div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    aria-label="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
            </div>
            <div className={styles.inputField2}>
              <div className={styles.label}>Message</div>
              <textarea
                placeholder="Message"
                className={styles.textarea}
                aria-label="Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// export default ContactForm;