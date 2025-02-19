import React from "react";
import styles from "../../styles/Booking/BookingData.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { useLocation } from "react-router-dom";

const BookingData: React.FC = () => {
    const location = useLocation();
    const { booking } = location.state || {};

    console.log("booking", booking)

    if (!booking) {
        return <div>No booking details available</div>;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const parsePackageDuration = (packageStr: string) => {
        // Handle cases where package string might be empty or undefined
        if (!packageStr) return { total: 0, sailing: 0, anchorage: 0 };

        // Convert package string to lowercase for consistent parsing
        const lowercaseStr = packageStr.toLowerCase();
        
        // Extract hours using regex
        const sailingMatch = lowercaseStr.match(/(\d+)_hours?_sailing/);
        const anchorageMatch = lowercaseStr.match(/(\d+)_hours?_anchorage/);
        
        const sailingHours = sailingMatch ? parseInt(sailingMatch[1]) : 0;
        const anchorageHours = anchorageMatch ? parseInt(anchorageMatch[1]) : 0;
        
        return {
            total: sailingHours + anchorageHours,
            sailing: sailingHours,
            anchorage: anchorageHours
        };
    };

    const duration = parsePackageDuration(booking.packages);

    return (
        <div className={styles.comp_body}>
            <div className={styles.yatchBox}>
                <div className={styles.section_head}>Booking #{booking._id}</div>
                <div className={styles.section_head2}>Yacht Booking Details</div>
            </div>
            <div className={styles.image_box}>
                <img src={booking.images?.[0] || Y2} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yacht_details_box}>
                <div className={styles.details}>
                    <div className={styles.about}>
                        <h3>Booking Status</h3>
                        <p><b>Payment Status:</b> {booking.paymentStatus}</p>
                        <p><b>Booking Status:</b> {booking.status}</p>
                        <p><b>Ride Status:</b> {booking.rideStatus}</p>
                    </div>
                    <div className={styles.about}>
                        <h3>Customer Details</h3>
                        <p><b>Customer Name:</b> {booking.customerName}</p>
                        <p><b>Customer Email:</b> {booking.customerEmail}</p>
                        <p><b>Customer Contact:</b> {booking.customerPhone}</p>
                    </div>
                    <div className={styles.summary}>
                        <h3>Booking Summary</h3>
                        <p><b>Total Amount:</b> ₹{booking.totalAmount}</p>
                        <p><b>Package:</b> {booking.packages}</p>
                        <p><b>Addon Service:</b> {booking.addonServices || "No Addon Services"}</p>
                        <p><b>Number of People:</b> {booking.PeopleNo}</p>
                        <p><b>Location:</b> {booking.location}</p>
                    </div>
                    <div className={styles.schedule}>
                        <h3>Time Schedule</h3>
                        <ul>
                            <li>
                                <b>Start Date & Time:</b> {formatDate(booking.startDate)}
                            </li>
                            <li>
                                <b>End Date & Time:</b> {formatDate(booking.endDate)}
                            </li>
                            <li>
                                <b>Total Duration:</b> {duration.total} hours (Sailing: {duration.sailing}h, Anchorage: {duration.anchorage}h)
                            </li>
                        </ul>
                    </div>
                    <div className={styles.specifications}>
                        <h3>Special Requests</h3>
                        <p>{booking.specialRequest || "No special requests"}</p>
                    </div>
                    <div className={styles.meetingPoint}>
                        <h3>Booking Information</h3>
                        <p><b>Booking ID:</b> {booking._id}</p>
                        <p><b>Created At:</b> {formatDate(booking.createdAt)}</p>
                        <p><b>Last Updated:</b> {formatDate(booking.updatedAt)}</p>
                    </div>
                    <div className={styles.guidelines}>
                        <h3>Important Guidelines</h3>
                        <ul>
                            <li><b>Swimming Not Required:</b> Life jackets are provided, so swimming skills are not mandatory.</li>
                            <li><b>Weather Preparedness:</b> Sailing depends on wind, tides, and clear conditions, which may cause slight schedule and route changes.</li>
                            <li><b>Advisory Cancellations:</b> Trips can be canceled by authorities; pre-payment is refundable or re-scheduled.</li>
                            <li><b>Stop Policy:</b> Wind-up time is included in your tour time.</li>
                            <li><b>Respect Policy:</b> Weather changes during the trip may need your cooperation.</li>
                        </ul>
                    </div>
                    <div className={styles.cancellation}>
                        <h3>Cancellation & Refund Policy</h3>
                        <p><b>Private Cancellations:</b> A refund is allowed if the booking is canceled due to unforeseeable weather, technical issues, or security protocols.</p>
                        <p><b>Customer Cancellations:</b> No refunds will be provided for cancellations made by the customer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingData;