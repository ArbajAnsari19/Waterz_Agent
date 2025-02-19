import React,{useState,useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Total/Total.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { yachtAPI } from "../../api/yachts";
import { useAppDispatch } from "../../redux/store/hook";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
declare global {
    interface Window {
        Razorpay: any;
    }
}

// const GST_RATE = 0.10; // 10% GST rate

const Total: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const state = location.state as {
        bookingDetails: any;
        pricingDetail: any;
        orderId: string;
        packageTotal: number;
        addonServicesTotal: number;
        yacht?: any;
      } | null;
    const [orderId, setOrderId] = useState(state!.orderId);

    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Format time for display
    const formatTime = (timeString: string): string => {
        const [hours, minutes] = timeString.split(':');
        return new Date(0, 0, 0, parseInt(hours), parseInt(minutes)).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

  // If no state is passed, redirect back to home or booking page.
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { bookingDetails, pricingDetail, yacht } = state;

//   console.log("priceDetail", pricingDetail)

  console.log("bookingDetails", bookingDetails);
    // Get the base prices from booking details
    const packagePrice = pricingDetail?.packageAmount || 0;
    const addonServicesPrice = pricingDetail?.addonCost || 0;

    // Calculate subtotal and taxes
    const subtotal = packagePrice + addonServicesPrice;
    const cgst = pricingDetail?.gstAmount || 0;
    // const sgst = subtotal * GST_RATE;
    // const grandTotal = subtotal + cgst + sgst;
    const originalGrandTotal = pricingDetail?.totalAmount;
    const finalGrandTotal = originalGrandTotal - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code");
            return;
        }

        setIsApplying(true);
        setCouponError("");

        try {
            const response = await yachtAPI.couponCode({
                bookingId: bookingDetails._id,
                grandTotal: bookingDetails.totalAmount,
                promoCode: couponCode
            });

            const { discount: discountValue, discountType,orderId } = response;
            
            let calculatedDiscount = 0;
            if (discountType === "PERCENTAGE") {
                calculatedDiscount = discountValue;
            } else if (discountType === "FIXED") {
                calculatedDiscount = discountValue;
            }
            setOrderId(orderId);
            setDiscount(calculatedDiscount);
            setShowCouponInput(false);
            setCouponCode("");
        } catch (error) {
            setCouponError("Invalid coupon code");
        } finally {
            setIsApplying(false);
        }
    };


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
            await loadRazorpayScript();
            console.log("total", finalGrandTotal)  
            console.log("orderId is here :", orderId)       
            const options = {
                key: "rzp_test_5Bm8QrZJpLzooF",
                amount: finalGrandTotal*100,
                currency: "INR",
                name: "Waterz Rentals",
                description: "Yacht Booking Payment",
                order_id: orderId,
                handler: async (response: any) => {
                    try {
                        dispatch(setLoading(true));
                        const token = localStorage.getItem('token');
                        await axios.post('http://localhost:8000/payment/verify', 
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
                        toast.success('Payment verification successfull')
                        dispatch(setLoading(false));
                        navigate('/payment-success');
                    } catch (error) {
                        dispatch(setLoading(false));
                        toast.error('Payment verification failed')
                        console.error('Payment verification failed:', error);
                        navigate('/payment-failed');
                    }
                },
                prefill: {
                    name: bookingDetails.name,
                    email: bookingDetails.email,
                    contact: bookingDetails.phone
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            toast.error('Error initiating payment')
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
                    <div className={styles.item_label}>Package Price</div>
                    <div className={styles.item_value}>{packagePrice.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Addon Services</div>
                    <div className={styles.item_value}>{addonServicesPrice.toLocaleString()}</div>
                </div>
                <hr className={styles.divider} />
                <div className={styles.item_row}>
                    <div className={styles.item_label}>Total</div>
                    <div className={styles.item_value}>{subtotal.toLocaleString()}</div>
                </div>
                <div className={styles.item_row}>
                    <div className={styles.item_label}>GST(18%)</div>
                    <div className={styles.item_value}>{cgst.toLocaleString()}</div>
                </div>
                
                {/* Coupon Code Section */}
                <div className={styles.coupon_section}>
                    {!showCouponInput ? (
                        discount === 0   && <button 
                            className={styles.coupon_button}
                            onClick={() => setShowCouponInput(true)}
                        >
                            Have a coupon code?
                        </button>
                    ) : (
                        <div className={styles.coupon_input_container}>
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className={styles.coupon_input}
                            />
                            <button 
                                onClick={handleApplyCoupon}
                                disabled={isApplying}
                                className={styles.apply_button}
                            >
                                {isApplying ? "Applying..." : "Apply"}
                            </button>
                        </div>
                    )}
                    {couponError && <div className={styles.error_message}>{couponError}</div>}
                </div>

                {discount > 0 && (
                    <div className={styles.item_row}>
                        <div className={styles.item_label}>Discount</div>
                        <div className={styles.item_value}>-{discount.toLocaleString()}</div>
                    </div>
                )}
                
                <hr className={styles.divider} />
                <div className={`${styles.item_row} ${styles.grand_total}`}>
                    <div className={styles.item_label}>Grand Total</div>
                    <div className={styles.item_value}>{finalGrandTotal.toLocaleString()}/-</div>
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
