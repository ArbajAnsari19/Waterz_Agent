import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Location/Location.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { yachtAPI } from "../../api/yachts";

// Updated FormData interface: packages is now a string (single select)
export interface FormData {
  startDate: Date;
  startTime: Date;
  location: string;
  YachtType: string;
  capacity: number;
  PeopleNo: string;
  addonServices: string[];
  packages: string;
}

// Options for Location
const locationOptions = [
  { value: "Old Goa", label: "Old Goa" },
  { value: "Panjim", label: "Panjim" },
  { value: "Britona", label: "Britona" },
];

// Options for YachtType
const yachtTypeOptions = [
  { value: "Economy", label: "Economy (under 20k)" },
  { value: "Premium", label: "Premium (under 30k)" },
  { value: "Luxury", label: "Luxury (Under 40k)" },
  { value: "Ultra luxury", label: "Ultra luxury (above 40k)" },
];

// Options for Addon Services (Multi-select)
const addonServicesOptions = [
  { value: "Photographer", label: "Photographer" },
  { value: "Photographer + Drone shot", label: "Photographer + Drone shot" },
  { value: "Birthday Cake", label: "Birthday Cake" },
  { value: "Anniversary Cake", label: "Anniversary Cake" },
  { value: "Dancers", label: "Dancers" },
  { value: "Decoration", label: "Decoration" },
];

// Options for Packages (Single-select)
const packagesOptions = [
  { value: "1_hour_sailing_1_hour_anchorage", label: "1 hour sailing + 1 hour anchorage" },
  { value: "1.5_hours_sailing_0.5_hour_anchorage", label: "1.5 hours sailing + 0.5 hour anchorage" },
  { value: "2_hours_sailing_0_hour_anchorage", label: "2 hours sailing + 0 hour anchorage" },
  { value: "2_hours_sailing_1_hour_anchorage", label: "2 hours sailing + 1 hour anchorage" },
  { value: "1.5_hours_sailing_1.5_hours_anchorage", label: "1.5 hours sailing + 1.5 hours anchorage" },
  { value: "2.5_hours_sailing_0.5_hour_anchorage", label: "2.5 hours sailing + 0.5 hour anchorage" },
  { value: "2_hours_sailing_2_hours_anchorage", label: "2 hours sailing + 2 hours anchorage" },
  { value: "3_hours_sailing_1_hour_anchorage", label: "3 hours sailing + 1 hour anchorage" },
  { value: "3.5_hours_sailing_0.5_hour_anchorage", label: "3.5 hours sailing + 0.5 hour anchorage" },
];

const Location: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    startDate: new Date(),
    startTime: new Date(),
    location: "",
    YachtType: "",
    capacity: 0,
    PeopleNo: "",
    addonServices: [],
    packages: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
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
      fontSize: "18px",
    }),
  };

  // Handler for single select fields
  const handleSingleSelect = (
    selectedOption: { value: string; label: string } | null,
    field: keyof FormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  // Handler for multi-select fields (addonServices)
  const handleMultiSelect = (
    selectedOptions: readonly { value: string; label: string }[],
    field: keyof FormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async () => {
    setError("");
    // Validate required fields
    if (
      !formData.startDate ||
      !formData.startTime ||
      !formData.location ||
      !formData.YachtType ||
      !formData.capacity ||
      !formData.PeopleNo ||
      !formData.packages
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      //@ts-ignore
      const response = await yachtAPI.getIdealYatchs(formData);
      if (response) {
        navigate("/choose", { state: { yachts: response } });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send query. Please try again.");
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
          Customize your journey by selecting the perfect yacht and preferences for your trip.
        </div>
      </div>
      <div className={styles.location_filt_box}>
        <div className={styles.form_grid}>
          {/* Start Date */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Start Date*</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, startDate: date! }))
              }
              minDate={today}
              className={styles.date_picker}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          {/* Start Time */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Start Time*</label>
            <DatePicker
              selected={formData.startTime}
              onChange={(time) =>
                setFormData((prev) => ({ ...prev, startTime: time! }))
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className={styles.date_picker}
            />
          </div>

          {/* Location */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Location*</label>
            <Select
              options={locationOptions}
              styles={selectStyles}
              value={
                locationOptions.find(
                  (option) => option.value === formData.location
                ) || null
              }
              onChange={(value) => handleSingleSelect(value, "location")}
            />
          </div>

          {/* Yacht Type */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Yacht Type*</label>
            <Select
              options={yachtTypeOptions}
              styles={selectStyles}
              value={
                yachtTypeOptions.find(
                  (option) => option.value === formData.YachtType
                ) || null
              }
              onChange={(value) => handleSingleSelect(value, "YachtType")}
            />
          </div>

          {/* Yacht Capacity */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Yacht Capacity*</label>
            <input
              type="number"
              min="1"
              className={styles.form_input}
              placeholder="Enter capacity"
              value={formData.capacity || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  capacity: Number(e.target.value),
                }))
              }
            />
          </div>

          {/* Number of People */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Number of People*</label>
            <input
              type="number"
              min="1"
              className={styles.form_input}
              placeholder="Enter number of people"
              value={formData.PeopleNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, PeopleNo: e.target.value }))
              }
            />
          </div>

          {/* Addon Services (Multi-select) */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Addon Services</label>
            <Select
              options={addonServicesOptions}
              styles={selectStyles}
              isMulti
              value={addonServicesOptions.filter((option) =>
                formData.addonServices.includes(option.value)
              )}
              onChange={(value) => handleMultiSelect(value, "addonServices")}
            />
          </div>

          {/* Packages (Single-select) */}
          <div className={styles.form_group}>
            <label className={styles.form_label}>Packages*</label>
            <Select
              options={packagesOptions}
              styles={selectStyles}
              value={
                packagesOptions.find(
                  (option) => option.value === formData.packages
                ) || null
              }
              onChange={(value) => handleSingleSelect(value, "packages")}
            />
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.submit_button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </button>
        {error && <div className={styles.error_message}>{error}</div>}
      </div>
    </div>
  );
};

export default Location;
