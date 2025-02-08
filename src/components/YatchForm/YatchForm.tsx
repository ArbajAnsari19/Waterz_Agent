import { useState, FormEvent } from 'react';
import styles from './YachtForm.module.css';

interface YachtFormData {
  name: string;
  capacity: string;
  manufacturerYear: string;
  dimensions: string;
  location: string;
  category: string;
  crewCount: string;
  uniqueFeatures: string;
  amenities: string;
  availabilityFrom: string;
  availabilityTo: string;
  sailingPrice: string;
  stillPrice: string;
  description: string;
  photos: FileList | null;
}

const YachtForm = () => {
  const [formData, setFormData] = useState<YachtFormData>({
    name: '',
    capacity: '',
    manufacturerYear: '',
    dimensions: '',
    location: '',
    category: '',
    crewCount: '',
    uniqueFeatures: '',
    amenities: '',
    availabilityFrom: '',
    availabilityTo: '',
    sailingPrice: '',
    stillPrice: '',
    description: '',
    photos: null
  });

  const [errors, setErrors] = useState<Partial<Record<keyof YachtFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof YachtFormData, string>> = {};
    const currentYear = new Date().getFullYear();

    if (!formData.name) newErrors.name = 'Yacht name is required';
    if (!formData.capacity) {
      newErrors.capacity = 'Capacity is required';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Please enter a valid capacity';
    }

    if (!formData.manufacturerYear) {
      newErrors.manufacturerYear = 'Manufacturer year is required';
    } else {
      const year = Number(formData.manufacturerYear);
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors.manufacturerYear = 'Please enter a valid year';
      }
    }

    if (!formData.dimensions) newErrors.dimensions = 'Dimensions are required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.crewCount) newErrors.crewCount = 'Number of crew is required';
    
    if (!formData.sailingPrice) {
      newErrors.sailingPrice = 'Sailing price is required';
    } else if (isNaN(Number(formData.sailingPrice)) || Number(formData.sailingPrice) <= 0) {
      newErrors.sailingPrice = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, photos: e.target.files }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name of the Yacht*</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={errors.name ? styles.error : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="photos">Add Photos or Videos*</label>
          <input
            type="file"
            id="photos"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Similar pattern for other form fields... */}
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Write a Brief about your Yacht*</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={errors.description ? styles.error : ''}
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Confirm & Continue
      </button>
    </form>
  );
};

export default YachtForm;