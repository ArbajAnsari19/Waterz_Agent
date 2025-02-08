import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Location/Location.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { yachtAPI } from "../../api/yachts";

// Interface for select option type
interface SelectOption {
  value: string;
  label: string;
}

// Interface for form data with proper types
export interface FormData {
  startDate: Date | null;
  startTime: Date | null;
  duration: string;
  location: string;
  YachtType: string;
  capacity: string;
  priceRange: string;
  tripType: string;
  additionalServices: string[];
  specialRequest: string;
  PeopleNo: string;
  specialEvent: string;
}

// Options for dropdowns (keep the same)
const yachtTypes: SelectOption[] = [
  { value: "Luxury", label: "Luxury" },
  { value: "motor", label: "Motor Yacht" },
  { value: "sailing", label: "Sailing Yacht" },
  { value: "superyacht", label: "Super Yacht" },
];

const capacityOptions: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "8", label: "8" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
];

const priceRanges: SelectOption[] = [
  { value: "0-1000", label: "$0 - $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
];

const pickupPoints: SelectOption[] = [
  { value: "Miami", label: "Dubai Marina" },
  { value: "marina2", label: "Palm Jumeirah" },
  { value: "marina3", label: "Dubai Harbour" },
  { value: "marina4", label: "Port Rashid" },
];

const tripTypes: SelectOption[] = [
  { value: "4", label: "Hourly Charter" },
  { value: "6", label: "Half Day" },
  { value: "8", label: "Full Day" },
  { value: "12", label: "Overnight" },
];

const additionalServices: SelectOption[] = [
  { value: "catering", label: "Catering" },
  { value: "watersports", label: "Water Sports" },
  { value: "crew", label: "Additional Crew" },
  { value: "decoration", label: "Decoration" },
];

const Location: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    startDate: new Date(),
    startTime: new Date(),
    duration: "",
    location: "",
    YachtType: "",
    capacity: "",
    priceRange: "",
    tripType: "",
    additionalServices: [],
    specialRequest: "",
    PeopleNo: "",
    specialEvent: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date for minimum date restriction
  const today = new Date();

  // Custom styles for react-select
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "40px",
      backgroundColor: "#f5f5f5",
      border: "none",
      borderRadius: "8px",
      boxShadow: "none",
      padding: "7px",
      fontSize: "18px"
    }),
  };

  // Modified handlers to store only the value
  const handleSingleSelect = (
    selectedOption: SelectOption | null,
    field: keyof FormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMultiSelect = (
    selectedOptions: readonly SelectOption[],
    field: keyof FormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions.map(option => option.value),
    }));
  };

  // Helper function to find SelectOption by value
  const findOptionByValue = (options: SelectOption[], value: string): SelectOption | null => {
    return options.find(option => option.value === value) || null;
  };

  const handleSubmit = async () => {
    setError('');

    // Validate required fields
    if (!formData.startDate || 
        !formData.startTime || 
        !formData.duration || 
        !formData.location || 
        !formData.YachtType || 
        !formData.capacity || 
        !formData.priceRange || 
        !formData.tripType || 
        !formData.PeopleNo) {
      setError('Please fill in all required fields');
      console.log('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      //@ts-ignore
      const response = await yachtAPI.getIdealYatchs(formData);
      
      if (response) {
        // Navigate to choose page with yachts data
        console.log('Ideal yachts:', response);
        navigate('/choose', { 
          state: { 
            yachts: response
          } 
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send query. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.comp_body}>
      <div className={styles.image_box}>
        <img src={Y2} className={styles.Y2} alt="Yacht" />
      </div>
      <div className={styles.yatchBox}>
        <div className={styles.section_head}>Find Your Ideal Yacht</div>
        <div className={styles.section_head2}>
          Customize your journey by selecting the perfect yacht and preferences for
          your trip.
        </div>
      </div>
      <div className={styles.location_filt_box}>
        <div className={styles.form_grid}>
          {/* Date Picker */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Start Date*</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
              minDate={today}
              className={styles.date_picker}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          {/* Time Picker */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Start Time*</label>
            <DatePicker
              selected={formData.startTime}
              onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className={styles.date_picker}
            />
          </div>

          {/* Trip Duration */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Trip Duration*</label>
            <Select
              options={tripTypes}
              styles={selectStyles}
              value={findOptionByValue(tripTypes, formData.duration)}
              onChange={(value) => handleSingleSelect(value, 'duration')}
            />
          </div>

          {/* Pickup Point */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Pickup Point*</label>
            <Select
              options={pickupPoints}
              styles={selectStyles}
              value={findOptionByValue(pickupPoints, formData.location)}
              onChange={(value) => handleSingleSelect(value, 'location')}
            />
          </div>

          {/* Yacht Type */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Yacht Type*</label>
            <Select
              options={yachtTypes}
              styles={selectStyles}
              value={findOptionByValue(yachtTypes, formData.YachtType)}
              onChange={(value) => handleSingleSelect(value, 'YachtType')}
            />
          </div>

          {/* Yacht Capacity */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Yacht Capacity*</label>
            <Select
              options={capacityOptions}
              styles={selectStyles}
              value={findOptionByValue(capacityOptions, formData.capacity)}
              onChange={(value) => handleSingleSelect(value, 'capacity')}
            />
          </div>

          {/* Number of People Input */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Number of People*</label>
            <input
              type="number"
              min="1"
              className={styles.form_input}
              placeholder="Enter number of people"
              value={formData.PeopleNo}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                PeopleNo: e.target.value
              }))}
            />
          </div>

          {/* Price Range */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Price Range*</label>
            <Select
              options={priceRanges}
              styles={selectStyles}
              value={findOptionByValue(priceRanges, formData.priceRange)}
              onChange={(value) => handleSingleSelect(value, 'priceRange')}
            />
          </div>

          {/* Trip Type */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Trip Type*</label>
            <Select
              options={tripTypes}
              styles={selectStyles}
              value={findOptionByValue(tripTypes, formData.tripType)}
              onChange={(value) => handleSingleSelect(value, 'tripType')}
            />
          </div>

          {/* Additional Services */}
          <div className={`${styles.form_group}`}>
            <label className={styles.form_label}>Additional Services</label>
            <Select
              options={additionalServices}
              styles={selectStyles}
              isMulti
              value={formData.additionalServices.map(value => 
                findOptionByValue(additionalServices, value)
              ).filter((option): option is SelectOption => option !== null)}
              onChange={(value) => handleMultiSelect(value, 'additionalServices')}
            />
          </div>

          {/* Special Requests */}
          <div className={`${styles.form_group} ${styles.special_requests}`}>
            <label className={styles.form_label}>Special Requests</label>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="Enter any special requests or requirements"
              value={formData.specialRequest}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  specialRequest: e.target.value
                }))
              }
            />
          </div>
        </div>
        
        <button 
          onClick={handleSubmit} 
          className={styles.submit_button}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
        
        {error && <div className={styles.error_message}>{error}</div>}
      </div>
    </div>
  );
};

export default Location;

// import React, { useState } from "react";
// import Select, { SingleValue, MultiValue } from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "../../styles/Location/Location.module.css";
// import Y2 from "../../assets/Yatch/Y2.svg";
// import { Link } from "react-router-dom";

// // Interface for select option type
// interface SelectOption {
//   value: string;
//   label: string;
// }

// // Interface for form data
// export interface FormData{
//   startDate: string;
//   startTime: string;
//   duration: string;
//   location: string;
//   YachtType: string;
//   capacity: string;
//   priceRange: string;
//   tripType: string;
//   additionalServices: string[];
//   specialRequest: string;
//   PeopleNo: string;
//   specialEvent: string;
// }

// // Options for dropdowns
// const yachtTypes: SelectOption[] = [
//   { value: "motor", label: "Motor Yacht" },
//   { value: "sailing", label: "Sailing Yacht" },
//   { value: "catamaran", label: "Catamaran" },
//   { value: "superyacht", label: "Super Yacht" },
// ];

// const capacityOptions: SelectOption[] = [
//   { value: "2-4", label: "2-4 People" },
//   { value: "5-8", label: "5-8 People" },
//   { value: "9-12", label: "9-12 People" },
//   { value: "13+", label: "13+ People" },
// ];

// const priceRanges: SelectOption[] = [
//   { value: "0-1000", label: "$0 - $1,000" },
//   { value: "1000-2000", label: "$1,000 - $2,000" },
//   { value: "2000-5000", label: "$2,000 - $5,000" },
//   { value: "5000+", label: "$5,000+" },
// ];

// const pickupPoints: SelectOption[] = [
//   { value: "marina1", label: "Dubai Marina" },
//   { value: "marina2", label: "Palm Jumeirah" },
//   { value: "marina3", label: "Dubai Harbour" },
//   { value: "marina4", label: "Port Rashid" },
// ];

// const tripTypes: SelectOption[] = [
//   { value: "hourly", label: "Hourly Charter" },
//   { value: "halfday", label: "Half Day" },
//   { value: "fullday", label: "Full Day" },
//   { value: "overnight", label: "Overnight" },
// ];
// const TripDuration: SelectOption[] = [
//     { value: "hourly", label: "Hourly Charter" },
//     { value: "halfday", label: "Half Day" },
//     { value: "fullday", label: "Full Day" },
//     { value: "overnight", label: "Overnight" },
//   ];

// const additionalServices: SelectOption[] = [
//   { value: "catering", label: "Catering" },
//   { value: "watersports", label: "Water Sports" },
//   { value: "crew", label: "Additional Crew" },
//   { value: "decoration", label: "Decoration" },
// ];

// const Location: React.FC = () => {
//   const [startDate, setStartDate] = useState<Date | null>(new Date());
//   const [startTime, setStartTime] = useState<Date | null>(new Date());
//   const [formData, setFormData] = useState<FormData>({
//     startDate: '',
//     startTime: '',
//     duration: '',
//     location: '',
//     YachtType: '',
//     capacity: '',
//     priceRange: '',
//     tripType: '',
//     additionalServices: [],
//     specialRequest: "",
//     PeopleNo: '',
//     specialEvent: "",
//   });

//   // Get today's date for minimum date restriction
//   const today = new Date();

//   // Custom styles for react-select
//   const selectStyles = {
//     control: (base: any) => ({
//       ...base,
//       minHeight: "40px",
//       backgroundColor: "#f5f5f5",
//       border: "none",
//       borderRadius: "8px",
//       boxShadow: "none",
//       padding: "7px",
//       fontSize: "18px"
//     }),
//   };

//   // Handlers with proper typing
//   const handleSingleSelect = (
//     value: SingleValue<SelectOption>,
//     field: keyof FormData
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleMultiSelect = (
//     value: MultiValue<SelectOption>,
//     field: keyof FormData
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value as SelectOption[],
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("Form submitted:", {
//       ...formData,
//       startDate,
//       startTime,
//     });
//   };

//   return (
//     <div className={styles.comp_body}>
//       <div className={styles.image_box}>
//         <img src={Y2} className={styles.Y2} alt="Yacht" />
//       </div>
//       <div className={styles.yatchBox}>
//         <div className={styles.section_head}>Find Your Ideal Yacht</div>
//         <div className={styles.section_head2}>
//           Customize your journey by selecting the perfect yacht and preferences for
//           your trip.
//         </div>
//       </div>
//       <div className={styles.location_filt_box}>
//         <div className={styles.form_grid}>
//           {/* Date Picker */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Start Date*</label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               minDate={today}
//               className={styles.date_picker}
//               dateFormat="MM/dd/yyyy"
//             />
//           </div>

//           {/* Time Picker */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Start Time*</label>
//             <DatePicker
//               selected={startTime}
//               onChange={(time) => setStartTime(time)}
//               showTimeSelect
//               showTimeSelectOnly
//               timeIntervals={30}
//               timeCaption="Time"
//               dateFormat="h:mm aa"
//               className={styles.date_picker}
//             />
//           </div>

//           {/* Trip Duration */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Trip Duration*</label>
//             <Select
//               options={TripDuration}
//               styles={selectStyles}
//               value={formData.tripType}
//               onChange={(value) => handleSingleSelect(value, 'tripType')}
//             />
//           </div>

//           {/* Pickup Point */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Pickup Point*</label>
//             <Select
//               options={pickupPoints}
//               styles={selectStyles}
//               value={formData.location}
//               onChange={(value) => handleSingleSelect(value, 'location')}
//             />
//           </div>

//           {/* Yacht Type */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Yacht Type</label>
//             <Select
//               options={yachtTypes}
//               styles={selectStyles}
//               value={formData.YachtType}
//               onChange={(value) => handleSingleSelect(value, 'YachtType')}
//             />
//           </div>

//           {/* Yacht Capacity */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Yacht Capacity</label>
//             <Select
//               options={capacityOptions}
//               styles={selectStyles}
//               value={formData.capacity}
//               onChange={(value) => handleSingleSelect(value, 'capacity')}
//             />
//           </div>

//           {/* Number of People Input */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Number of People*</label>
//             <input
//               type="number"
//               min="1"
//               className={styles.form_input}
//               placeholder="Enter number of people"
//               value={formData.PeopleNo}
//               onChange={(e) => setFormData(prev => ({
//                 ...prev,
//                 PeopleNo: e.target.value
//               }))}
//             />
//           </div>

//           {/* Price Range */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Price Range</label>
//             <Select
//               options={priceRanges}
//               styles={selectStyles}
//               value={formData.priceRange}
//               onChange={(value) => handleSingleSelect(value, 'priceRange')}
//             />
//           </div>

//           {/* Trip Duration */}
//           <div className={styles.form_group}>
//             <label className={styles.form_label}>Trip Type*</label>
//             <Select
//               options={tripTypes}
//               styles={selectStyles}
//               value={formData.tripType}
//               onChange={(value) => handleSingleSelect(value, 'tripType')}
//             />
//           </div>

//           {/* Additional Services */}
//           <div className={`${styles.form_group}`}>
//             <label className={styles.form_label}>Additional Services</label>
//             <Select
//               options={additionalServices}
//               styles={selectStyles}
//               isMulti
//               value={formData.additionalServices}
//               onChange={(value) => handleMultiSelect(value, 'additionalServices')}
//             />
//           </div>

//           {/* Special Requests */}
//           <div className={`${styles.form_group} ${styles.special_requests}`}>
//             <label className={styles.form_label}>Special Requests</label>
//             <textarea
//               className={styles.textarea}
//               rows={3}
//               placeholder="Enter any special requests or requirements"
//               value={formData.specialRequest}
//               onChange={(e) =>
//                 setFormData(prev => ({
//                   ...prev,
//                   specialRequest: e.target.value
//                 }))
//               }
//             />
//           </div>
//         </div>
//         <Link to="/choose" style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}} >
//             <button onClick={handleSubmit} className={styles.submit_button}>
//               Continue
//             </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Location;