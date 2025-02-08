import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Total/Total.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Type definitions

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PERSON_RATE = 500; // Fixed rate per person
const GST_RATE = 0.10; // 10% GST rate

const Total: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { yacht, bookingDetails } = location.state || {};

    // console.log("booking", bookingDetails.razorpayOrderId);

    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Format time for display
    const formatTime = (dateString: string): string => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    // Calculate individual charges
    const peopleCharge = bookingDetails.PeopleNo * PERSON_RATE;
    const sailingCharge = bookingDetails.sailingTime * (yacht?.price?.sailing || 4000);
    const stillCharge = bookingDetails.stillTime * (yacht?.price?.still || 3000);
    const eventCharge = bookingDetails.specialEvent ? 5000 : 0;
    const addOnsCharge = bookingDetails.specialRequest ? 2000 : 0;

    // Calculate subtotal and taxes
    const subtotal = peopleCharge + sailingCharge + stillCharge + eventCharge + addOnsCharge;
    const cgst = subtotal * GST_RATE;
    const sgst = subtotal * GST_RATE;
    const grandTotal = subtotal + cgst + sgst;

    // Razorpay integration
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            document.body.appendChild(script);
        });
    };

    const handleProceedToPayment = async () => {
        try {
            // 1. Load the Razorpay SDK
            await loadRazorpayScript();

            // // 2. Make API call to create order
            // const response = await axios.post('http://localhost:3001/booking/create-order', {
            //     amount: grandTotal,
            //     currency: "INR",
            //     sailingTime: bookingDetails.sailingTime,
            //     stillTime: bookingDetails.stillTime,
            //     specialEvent: bookingDetails.specialEvent,
            //     specialRequest: bookingDetails.specialRequest,
            //     PeopleNo: bookingDetails.PeopleNo
            // });

            const orderId  = bookingDetails.razorpayOrderId;
            console.log("orderId", orderId);
            // 3. Initialize Razorpay payment
            const options = {
                key: "rzp_test_5Bm8QrZJpLzooF",
                amount: grandTotal * 100, // Amount in smallest currency unit
                currency: "INR",
                name: "Waterz Rentals",
                description: "Yacht Booking Payment",
                order_id: orderId,
                handler: async (response: any) => {
                  try {
                      // 4. Verify payment with backend
                      const token = localStorage.getItem('token');
                      await axios.post('http://localhost:3001/payment/verify', 
                          {
                              paymentDetails: {
                                  razorpay_order_id: response.razorpay_order_id,
                                  razorpay_payment_id: response.razorpay_payment_id,
                                  razorpay_signature: response.razorpay_signature
                              }
                          },
                          {
                              headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token}`
                              }
                          }
                      );
                      
                      // 5. On successful verification
                      navigate('/payment-success');
                  } catch (error) {
                      console.error('Payment verification failed:', error);
                      navigate('/payment-failed');
                  }
              },
                prefill: {
                    name: "Customer Name", // Get from user context
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div className={styles.comp_body}>
            <div className={styles.yatchBox}>
                <div className={styles.section_head}>Payment Gateway</div>
                <div className={styles.section_head2}>Ready to set sail? Secure Your Adventure with Easy Payments</div>
            </div>
            <div className={styles.image_box}>
                <img src={yacht?.images?.[0] || Y2} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yatchBox}>
                <div className={styles.section_head}>{yacht?.name || "Luxury Yacht"}</div>
                <div className={styles.section_head2}>
                    Date: {formatDate(bookingDetails.startDate)}
                </div>
                <div className={styles.section_head2}>
                    Time: {formatTime(bookingDetails.startTime)}
                </div>
            </div>
            <div className={styles.total_box}>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Number of People = {bookingDetails.PeopleNo}</div>
                    <div className={styles.item_value}>{peopleCharge.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Sailing Time = {bookingDetails.sailingTime} hrs</div>
                    <div className={styles.item_value}>{sailingCharge.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Still Time = {bookingDetails.stillTime} hrs</div>
                    <div className={styles.item_value}>{stillCharge.toLocaleString()}</div>
                </div>
                {bookingDetails.specialEvent && (
                    <div className={styles.item_row}>
                        <div className={styles.item_label}>Special Event: {bookingDetails.specialEvent}</div>
                        <div className={styles.item_value}>{eventCharge.toLocaleString()}</div>
                    </div>
                )}
                {bookingDetails.specialRequest && (
                    <div className={styles.item_row}>
                        <div className={styles.item_label}>Add ons: {bookingDetails.specialRequest}</div>
                        <div className={styles.item_value}>{addOnsCharge.toLocaleString()}</div>
                    </div>
                )}
                <hr className={styles.divider} />
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Total</div>
                    <div className={styles.item_value}>{subtotal.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>CGST</div>
                    <div className={styles.item_value}>{cgst.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>SGST</div>
                    <div className={styles.item_value}>{sgst.toLocaleString()}</div>
                </div>
                <hr className={styles.divider} />
                <div className={`${styles.item_row} ${styles.grand_total}`}>
                    <div className={styles.item_label}>Grand Total</div>
                    <div className={styles.item_value}>{grandTotal.toLocaleString()}/-</div>
                </div>
            </div>
            <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <button onClick={handleProceedToPayment} className={styles.submit_button}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Total;





// import React from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "../../styles/Total/Total.module.css";
// import Y2 from "../../assets/Yatch/Y2.svg";
// import { Link, useLocation } from "react-router-dom";

// interface YachtDetails {
//     id: string;
//     name: string;
//     description: string;
//     price: {
//         sailing: number;
//         still: number;
//     };
//     images: string[];
//     capacity: number;
// }

// interface BookingResponse {
//     user: string;
//     yacht: string;
//     location: string;
//     duration: number;
//     startDate: string;
//     startTime: string;
//     endDate: string;
//     sailingTime: number;
//     stillTime: number;
//     capacity: number;
//     PeopleNo: number;
//     specialEvent: string;
//     specialRequest: string;
//     totalAmount: number;
//     paymentStatus: string;
//     status: string;
//     _id: string;
//     razorpayOrderId: string;
// }

// const PERSON_RATE = 500; // Fixed rate per person

// const Total: React.FC = () => {
//     const location = useLocation();
//     const { yacht, bookingDetails } = location.state || {};

//     // Format date for display
//     const formatDate = (dateString: string): string => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric'
//         });
//     };

//     // Format time for display
//     const formatTime = (dateString: string): string => {
//         return new Date(dateString).toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: true
//         });
//     };

//     // Calculate individual charges
//     const peopleCharge = bookingDetails.PeopleNo * PERSON_RATE;
//     const sailingCharge = bookingDetails.sailingTime * (yacht?.price?.sailing || 4000);
//     const stillCharge = bookingDetails.stillTime * (yacht?.price?.still || 3000);
//     const eventCharge = bookingDetails.specialEvent ? 5000 : 0;
//     const addOnsCharge = bookingDetails.specialRequest ? 2000 : 0;

//     // Calculate total without tax/GST
//     const grandTotal = peopleCharge + sailingCharge + stillCharge + eventCharge + addOnsCharge;

//     return (
//         <div className={styles.comp_body}>
//             <div className={styles.yatchBox}>
//                 <div className={styles.section_head}>Payment Gateway</div>
//                 <div className={styles.section_head2}>Ready to set sail? Secure Your Adventure with Easy Payments</div>
//             </div>
//             <div className={styles.image_box}>
//                 <img src={yacht?.images?.[0] || Y2} alt="Yacht" className={styles.Y2} />
//             </div>
//             <div className={styles.yatchBox}>
//                 <div className={styles.section_head}>{yacht?.name || "Luxury Yacht"}</div>
//                 <div className={styles.section_head2}>
//                     Date: {formatDate(bookingDetails.startDate)}
//                 </div>
//                 <div className={styles.section_head2}>
//                     Time: {formatTime(bookingDetails.startTime)}
//                 </div>
//             </div>
//             <div className={styles.total_box}>
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>Number of People = {bookingDetails.PeopleNo}</div>
//                     <div className={styles.item_value}>{peopleCharge.toLocaleString()}</div>
//                 </div>
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>Sailing Time = {bookingDetails.sailingTime} hrs</div>
//                     <div className={styles.item_value}>{sailingCharge.toLocaleString()}</div>
//                 </div>
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>Still Time = {bookingDetails.stillTime} hrs</div>
//                     <div className={styles.item_value}>{stillCharge.toLocaleString()}</div>
//                 </div>
//                 {bookingDetails.specialEvent && (
//                     <div className={styles.item_row}>
//                         <div className={styles.item_label}>Special Event: {bookingDetails.specialEvent}</div>
//                         <div className={styles.item_value}>{eventCharge.toLocaleString()}</div>
//                     </div>
//                 )}
//                 {bookingDetails.specialRequest && (
//                     <div className={styles.item_row}>
//                         <div className={styles.item_label}>Add ons: {bookingDetails.specialRequest}</div>
//                         <div className={styles.item_value}>{addOnsCharge.toLocaleString()}</div>
//                     </div>
//                 )}
//                 <hr className={styles.divider} />
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>Total</div>
//                     <div className={styles.item_value}>{grandTotal.toLocaleString()}</div>
//                 </div>
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>Taxes</div>
//                     <div className={styles.item_value}>0</div>
//                 </div>
//                 <div className={styles.item_row}>
//                     <div className={styles.item_label}>CGST/GST</div>
//                     <div className={styles.item_value}>0</div>
//                 </div>
//                 <hr className={styles.divider} />
//                 <div className={`${styles.item_row} ${styles.grand_total}`}>
//                     <div className={styles.item_label}>Grand Total</div>
//                     <div className={styles.item_value}>{grandTotal.toLocaleString()}/-</div>
//                 </div>
//             </div>
//             <Link 
//                 to="/payment-gateway" 
//                 style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}} 
//                 state={{ 
//                     amount: grandTotal, 
//                     yacht, 
//                     bookingDetails,
//                     orderId: bookingDetails.razorpayOrderId 
//                 }}
//             >
//                 <button className={styles.submit_button}>
//                     Proceed to Payment
//                 </button>
//             </Link>
//         </div>
//     );
// };

// export default Total;

// Static code

// import React from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "../../styles/Total/Total.module.css";
// import Y2 from "../../assets/Yatch/Y2.svg";
// import { Link } from "react-router-dom";
// const Total: React.FC = () => {

// const yachtDetails = {
//     name: "Luxury Yacht",
//     description:
//         "The Luxury Yacht is one of the most popular choices at the Gateway of India. It's refined, well-crafted, and reserved for groups, offering an opulent private sailing experience. Whether your journey starts at Mumbai Harbour or connects with nature, it's unforgettable while embracing the sea breeze. Whether relaxing on the spacious deck or dipping your legs into the water while you sail, enjoy your group, charming views, and the serene ocean that makes everyone smile. Happy Sailing! 😊",
//     summary: {
//         idealFor: "Friends, Family, Couples, Groups, Tourists",
//         For: "6 people",
//         location: "Gateway of India, Mumbai and Goa",
//         duration: "According to preference",
//         note: "This is an exclusive private sailing experience where the entire yacht is reserved just for you—whether you are a couple or a group of five, the price remains the same.",
//     },
//     specifications: {
//         length: "65 feet",
//         capacity: "10-15 people",
//         crew: "3",
//     },
//     meetingPoint: "XYZ beach, Goa, India",
//     sailingPrice: "₹4,000 per hour",
//     stillPrice: "₹3,000 per hour",
// };

//   return (
//     <div className={styles.comp_body}>
//         <div className={styles.yatchBox}>
//             <div className={styles.section_head}>Payment Gateway</div>
//             <div className={styles.section_head2}>Ready to set sail? Secure Your Adventure with Easy Payments</div>
//         </div>
//         <div className={styles.image_box}>
//             <img src={Y2} alt="Yacht" className={styles.Y2} />
//         </div>
//         <div className={styles.yatchBox}>
//             <div className={styles.section_head}>{yachtDetails.name}</div>
//             <div className={styles.section_head2}>Date:  19th Dec 2024 - 21 Dec 2024</div>
//             <div className={styles.section_head2}>Time: 5pm</div>
//         </div>
//         <div className={styles.total_box}>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Number of People = 4</div>
//               <div className={styles.item_value}>68,760</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Sailing Time = xyz hrs</div>
//               <div className={styles.item_value}>4,500</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Still Time = abc hrs</div>
//               <div className={styles.item_value}>10,500</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Special Event: Birthday celebration</div>
//               <div className={styles.item_value}>5,000</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Add ons: Cake, Candles</div>
//               <div className={styles.item_value}>2,000</div>
//             </div>
//             <hr className={styles.divider} />
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Total</div>
//               <div className={styles.item_value}>85,000</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>Taxes</div>
//               <div className={styles.item_value}>8,500</div>
//             </div>
//             <div className={styles.item_row}>
//               <div className={styles.item_label}>CGST/GST</div>
//               <div className={styles.item_value}>8,500</div>
//             </div>
//             <hr className={styles.divider} />
//             <div className={`${styles.item_row} ${styles.grand_total}`}>
//               <div className={styles.item_label}>Grand Total</div>
//               <div className={styles.item_value}>1,00,000/-</div>
//             </div>
//         </div>
//         <Link to="/payment-gateway" style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}} >
//             <button className={styles.submit_button}>
//                Proceed to Payment
//             </button>
//         </Link>
//     </div>
//   )
// }

// export default Total;