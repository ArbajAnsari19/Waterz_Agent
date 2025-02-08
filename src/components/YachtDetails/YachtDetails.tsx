// import React from "react";
// import styles from "../../styles/YachtDetails/YachtDetails.module.css";
// import Y2 from "../../assets/Yatch/Y2.svg";

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

// const Details: React.FC = () => {
//     return (
//         <div className={styles.comp_body}>
//             <div className={styles.yatchBox}>
//                 <div className={styles.section_head}>{yachtDetails.name}</div>
//                 <div className={styles.section_head2}>Explore options to craft a unique yachting experience. </div>
//             </div>
//             <div className={styles.image_box}>
//                 <img src={Y2} alt="Yacht" className={styles.Y2} />
//             </div>
//             <div className={styles.yacht_details_box}>
//                 <div className={styles.details}>
//                     <div className={styles.prices}>
//                         <div className={styles.left}>
//                             <div className={styles.price_head}>Prices</div>
//                             <div className={styles.price_box}>
//                                 <div className={styles.pricess}>
//                                     <div className={styles.price_type}>Sailing Price</div>
//                                     <div className={styles.price_value}>{yachtDetails.sailingPrice}</div>
//                                 </div>
//                                 <div className={styles.pricess2}>
//                                     <div className={styles.price_type}>Still Price</div>
//                                     <div className={styles.price_value}>{yachtDetails.stillPrice}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.Right}>
//                             <button className={styles.bookButton}>Book Now</button>
//                         </div>  
//                     </div>
//                     <div className={styles.about}>
//                         <h3>About {yachtDetails.name}</h3>
//                         <p>{yachtDetails.description}</p>
//                     </div>
//                     <div className={styles.summary}>
//                         <h3>Summary</h3>
//                         <p><b>Ideal for:</b> {yachtDetails.summary.idealFor}</p>
//                         <p><b>For:</b> {yachtDetails.summary.For}</p>
//                         <p><b>Where:</b> {yachtDetails.summary.location}</p>
//                         <p><b>Duration:</b> {yachtDetails.summary.duration}</p>
//                         <p><b>Note:</b> {yachtDetails.summary.note}</p>
//                     </div>
//                     <div className={styles.schedule}>
//                         <h3>Sailing Schedule</h3>
//                         <ul>
//                             <li>
//                                 <b>15 Minutes:</b> Arrive at the designated starting point as per location as instructed by the
//                                 captain. Safety instructions prior to departure.
//                             </li>
//                             <li>
//                                 <b>15 Minutes:</b> The yacht journey is anchored away from the shore. You’ll be taken to a serene
//                                 natural spot.
//                             </li>
//                             <li>
//                                 <b>15 Minutes:</b> Conclude your journey with a scenic return yacht ride back to the shore.
//                             </li>
//                         </ul>
//                     </div>
//                     <div className={styles.specifications}>
//                         <h3>Specifications</h3>
//                         <p><b>Length:</b> {yachtDetails.specifications.length}</p>
//                         <p><b>Passenger Capacity:</b> {yachtDetails.specifications.capacity}</p>
//                         <p><b>Crew:</b> {yachtDetails.specifications.crew}</p>
//                     </div>
//                     <div className={styles.meetingPoint}>
//                         <h3>Meeting Point Address</h3>
//                         <p>{yachtDetails.meetingPoint}</p>
//                     </div>
//                     <div className={styles.guidelines}>
//                         <h3>Important Guidelines</h3>
//                         <ul>
//                             <li><b>Swimming Not Required:</b> Life jackets are provided, so swimming skills are not mandatory.</li>
//                             <li><b>Weather Preparedness:</b> Sailing depends on wind, tides, and clear conditions, which may cause slight schedule and route changes.</li>
//                             <li><b>Advisory Cancellations:</b> Trips from Gateway of India can be canceled by authorities; pre-payment is refundable or re-scheduled.</li>
//                             <li><b>Stop Policy:</b> Wind-up time is included in your tour time.</li>
//                             <li><b>Respect Policy:</b> Weather changes during the trip may need your cooperation.</li>
//                         </ul>
//                     </div>
//                     <div className={styles.faqs}>
//                         <h3>FAQs</h3>
//                         <p><b>Do you provide catering or food on the boat?</b><br />No, we provide snacks and soft drinks without other personal requests. You are allowed to carry your own food and soft drinks or water. (We recommend sweet yogurt as a complimentary by Goa).</p>
//                         <p><b>Can I add decorations like balloons, or cake on board?</b><br />Yes. All private yacht decorations can be directly availed.</p>
//                         <p><b>Can you make special arrangements for birthdays/anniversaries?</b><br />Yes. We have an optional arrangement service. Make sure you confirm answers early by contacting our staff.</p>
//                         <p><b>Is it a fixed location tour and will I describe the tour on my own?</b><br />Yes. It is included and can be based on healthy weather discovery material that you may want to try!</p>
//                     </div>
//                     <div className={styles.cancellation}>
//                         <h3>Cancellation & Refund Policy</h3>
//                         <p><b>Private Cancellations:</b> A refund is allowed if the booking is canceled due to unforeseeable weather, technical issues, or security protocols.</p>
//                         <p><b>Customer Cancellations:</b> No refunds will be provided for cancellations made by the customer.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Details;


import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from "../../styles/YachtDetails/YachtDetails.module.css";
import { useNavigate } from 'react-router-dom';

// These are constant details that don't change between yachts
const constantDetails = {
    schedule: [
        {
            time: "15 Minutes",
            description: "Arrive at the designated starting point as per location as instructed by the captain. Safety instructions prior to departure."
        },
        {
            time: "15 Minutes",
            description: "The yacht journey is anchored away from the shore. You'll be taken to a serene natural spot."
        },
        {
            time: "15 Minutes",
            description: "Conclude your journey with a scenic return yacht ride back to the shore."
        }
    ],
    guidelines: [
        { title: "Swimming Not Required", content: "Life jackets are provided, so swimming skills are not mandatory." },
        { title: "Weather Preparedness", content: "Sailing depends on wind, tides, and clear conditions, which may cause slight schedule and route changes." },
        { title: "Advisory Cancellations", content: "Trips from Gateway of India can be canceled by authorities; pre-payment is refundable or re-scheduled." },
        { title: "Stop Policy", content: "Wind-up time is included in your tour time." },
        { title: "Respect Policy", content: "Weather changes during the trip may need your cooperation." }
    ],
    faqs: [
        {
            question: "Do you provide catering or food on the boat?",
            answer: "No, we provide snacks and soft drinks without other personal requests. You are allowed to carry your own food and soft drinks or water. (We recommend sweet yogurt as a complimentary by Goa)."
        },
        {
            question: "Can I add decorations like balloons, or cake on board?",
            answer: "Yes. All private yacht decorations can be directly availed."
        },
        {
            question: "Can you make special arrangements for birthdays/anniversaries?",
            answer: "Yes. We have an optional arrangement service. Make sure you confirm answers early by contacting our staff."
        },
        {
            question: "Is it a fixed location tour and will I describe the tour on my own?",
            answer: "Yes. It is included and can be based on healthy weather discovery material that you may want to try!"
        }
    ],
    cancellationPolicy: {
        private: "A refund is allowed if the booking is canceled due to unforeseeable weather, technical issues, or security protocols.",
        customer: "No refunds will be provided for cancellations made by the customer."
    }
};



const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const yacht = location.state?.yacht;
    const navigate = useNavigate();

    if (!yacht) {
        return <div>Yacht not found</div>;
    }

    // Format the location string based on the location type
    const formattedLocation = typeof yacht.location === 'object' 
        ? yacht.pickupat || 'Location details available on booking'
        : yacht.location;
    
    const handleBookNow = () => {
        navigate("/booking-details", { 
            state: { 
                yachtId: id,
                yachtName: yacht.name,
                yacht: yacht // Passing the entire yacht object
            } 
        });
    };
    
    return (
        <div className={styles.comp_body}>
            <div className={styles.yatchBox}>
                <div className={styles.section_head}>{yacht.name}</div>
                <div className={styles.section_head2}>Explore options to craft a unique yachting experience.</div>
            </div>
            <div className={styles.image_box}>
                <img src={yacht.images[0]} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yacht_details_box}>
                <div className={styles.details}>
                    <div className={styles.prices}>
                        <div className={styles.left}>
                            <div className={styles.price_head}>Prices</div>
                            <div className={styles.price_box}>
                                <div className={styles.pricess}>
                                    <div className={styles.price_type}>Sailing Price</div>
                                    <div className={styles.price_value}>₹{yacht.price.sailing.toLocaleString()} per hour</div>
                                </div>
                                <div className={styles.pricess2}>
                                    <div className={styles.price_type}>Still Price</div>
                                    <div className={styles.price_value}>₹{yacht.price.still.toLocaleString()} per hour</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Right}>
                            {/* <Link to="/booking-details", { id: { id } }> */}
                               <button className={styles.bookButton} onClick={handleBookNow} >Book Now</button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className={styles.about}>
                        <h3>About {yacht.name}</h3>
                        <p>{yacht.description}</p>
                    </div>
                    <div className={styles.summary}>
                        <h3>Summary</h3>
                        <p><b>Ideal for:</b> Friends, Family, Couples, Groups, Tourists</p>
                        <p><b>For:</b> Up to {yacht.capacity} people</p>
                        <p><b>Where:</b> {formattedLocation}</p>
                        <p><b>Duration:</b> According to preference</p>
                        <p><b>Note:</b> This is an exclusive private sailing experience where the entire yacht is reserved just for you.</p>
                    </div>
                    <div className={styles.schedule}>
                        <h3>Sailing Schedule</h3>
                        <ul>
                            {constantDetails.schedule.map((item, index) => (
                                <li key={index}>
                                    <b>{item.time}:</b> {item.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.specifications}>
                        <h3>Specifications</h3>
                        <p><b>Length:</b> {yacht.dimension}</p>
                        <p><b>Passenger Capacity:</b> {yacht.capacity} people</p>
                        <p><b>Crew:</b> {yacht.crews.length}</p>
                    </div>
                    <div className={styles.meetingPoint}>
                        <h3>Meeting Point Address</h3>
                        <p>{yacht.pickupat || formattedLocation}</p>
                    </div>
                    <div className={styles.guidelines}>
                        <h3>Important Guidelines</h3>
                        <ul>
                            {constantDetails.guidelines.map((item, index) => (
                                <li key={index}><b>{item.title}:</b> {item.content}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.faqs}>
                        <h3>FAQs</h3>
                        {constantDetails.faqs.map((faq, index) => (
                            <p key={index}><b>{faq.question}</b><br />{faq.answer}</p>
                        ))}
                    </div>
                    <div className={styles.cancellation}>
                        <h3>Cancellation & Refund Policy</h3>
                        <p><b>Private Cancellations:</b> {constantDetails.cancellationPolicy.private}</p>
                        <p><b>Customer Cancellations:</b> {constantDetails.cancellationPolicy.customer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;