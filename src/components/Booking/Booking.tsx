import React, { useState, useEffect } from "react";
import styles from "../../styles/Booking/Booking.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import BookedCard from "../Layouts/BookedCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from "react-router-dom";
import { bookingAPI } from "../../api/bookingApi";
import { GoMultiSelect } from "react-icons/go";
import { BiSad } from 'react-icons/bi';
import {toast} from 'react-toastify';
import { useAppDispatch } from "../../redux/store/hook";
import { setLoading } from "../../redux/slices/loadingSlice";
import EarningCard from "../Layouts/EarningCard";
export interface OwnerBookingType {
  id: string;
  yachtId: string;
  bookingDate: string;
  status: string;
  yacht?: {
    name: string;
    capacity: number;
    startingPrice: string;
    images: string[];
  }
}

export interface EarningsAnalytics {
  sevenDaysEarnings: number;
  thirtyDaysEarnings: number;
  totalEarnings: number;
  sevenDaysBookings: OwnerBookingType[];
  thirtyDaysBookings: OwnerBookingType[];
  allBookings: OwnerBookingType[];
}

interface BookingType {
  _id: string;
  name: string;
  capacity: number;
  startDate: string;
  images: string[];
}



const Booking: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentBookings, setCurrentBookings] = useState<BookingType[]>([]);
  const [previousBookings, setPreviousBookings] = useState<BookingType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isTotalEarning, setIsTotalEarning] = useState(true);
  const [earnings, setEarnings] = useState<EarningsAnalytics>({
    sevenDaysEarnings: 0,
    thirtyDaysEarnings: 0,
    totalEarnings: 0,
    sevenDaysBookings: [],
    thirtyDaysBookings: [],
    allBookings: []
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        dispatch(setLoading(true));
        const current = await bookingAPI.getCurrentBookings();
        const previous = await bookingAPI.getPreviousBookings();
        const earnings = await bookingAPI.getEarnings();
        setEarnings(earnings);
        console.log("Current Earning ", earnings);
        console.log("CURRENT DATA IS HERE :", current);
        console.log("PREVIOUS DATA IS HERE :", previous);
        // const earningsData = await bookingAPI.getEarnings();
        // @ts-ignore
        if (Array.isArray(current.AllCurrentRides)) {
        // @ts-ignore
        setCurrentBookings(current.AllCurrentRides);
        }
        // @ts-ignore
        if (Array.isArray(previous.AllBokingRides)) {
        // @ts-ignore
        setPreviousBookings(previous.AllBokingRides);
        }
        // setEarnings(earningsData);
      } catch (err: any) {
        dispatch(setLoading(false));
        toast.error(error)
        setError(err?.message || 'Failed to fetch bookings');
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBookings();
  }, []);

  // if (error) {
  //   toast.error("Something Wrong Happened")
  // }

  const NoBookingsMessage = ({ type }: { type: string }) => (
    <div className={styles.noBookings}>
      <p>No {type} bookings available</p>
    </div>
  );

  const NoEarningsMessage = () => (
    <div className={styles.noEarnings}>
      <BiSad size={50} color="#666" />
      <p>No earnings yet</p>
    </div>
  );

  const handleTotalEarning = () => {
    setIsTotalEarning(!isTotalEarning);
  };

  return (
    <div className={styles.comp_body}>
      <div className={styles.image_box}>
        <img src={Y2} className={styles.Y2} alt="Yacht" />
      </div>
      <div className={styles.hero_left}>
        <div className={styles.hero_head}>Book Your Yacht</div>
        <Link to="/location">
          <div className={styles.hero_btn}>Start Now</div>
        </Link>
      </div>
      <div className={styles.yatchBox}>
        <div className={styles.section_head2}>My bookings</div>
        <div className={styles.section_head}>Current Bookings</div>
        <div className={styles.yatch_slider}>
          {currentBookings.length === 0 ? (
            <NoBookingsMessage type="current" />
          ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            style={{ 
              padding: "20px 0", 
              width: "100%",
            }}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 10
              },
              480: {
                slidesPerView: "auto",
                spaceBetween: 15
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 20
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 40
              }
            }}
          >
              {currentBookings.map((booking) => (
                <SwiperSlide key={booking._id}  className={styles.swiper_slide}>
                  <BookedCard
                    name={booking.name}
                    capacity={booking.capacity}
                    startDate={booking.startDate}
                    images={booking.images[0]}
                    bookingId={booking._id}
                    booking={booking}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className={styles.yatchBox}>
        <div className={styles.section_head}>Previous Bookings</div>
        <div className={styles.yatch_slider}>
          {previousBookings.length === 0 ? (
            <NoBookingsMessage type="previous" />
          ) : (
            <Swiper
            spaceBetween={50}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            style={{ 
              padding: "20px 0", 
              width: "100%",
            }}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 10
              },
              480: {
                slidesPerView: "auto",
                spaceBetween: 15
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 20
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 40
              }
            }}
          >
              {previousBookings.map((booking) => (
                <SwiperSlide key={booking._id} className={styles.swiper_slide}>
                  <BookedCard
                    name={booking.name}
                    capacity={booking.capacity}
                    startDate={booking.startDate}
                    images={booking.images[0]}
                    bookingId={booking._id}
                    booking={booking}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className={styles.yatchBox}>
        <div className={styles.section_head2}>My Earnings</div>
        <div className={styles.section_head_container}>
          <div className={styles.section_head}>{isTotalEarning ? 'Total' : 'This Week'}</div>
          <GoMultiSelect onClick={handleTotalEarning} className={styles.section_head_icon} />
        </div>
        <div className={styles.section_head_container}>
          <div className={styles.section_head2}>
            Earnings {isTotalEarning ? 'Total' : 'This Week'}: ₹{isTotalEarning ? earnings.totalEarnings : earnings.sevenDaysEarnings}
          </div>
          </div>
        <div className={styles.yatch_slider}>
          {(isTotalEarning ? earnings.allBookings : earnings.sevenDaysBookings).length === 0 ? (
            <NoEarningsMessage />
          ) : (
            <Swiper
            spaceBetween={60}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            style={{ 
              padding: "20px 0", 
              width: "100%",
            }}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 20
              },
              480: {
                slidesPerView: "auto",
                spaceBetween: 25
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 30
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 50
              }
            }}
            >
              {(isTotalEarning ? earnings.allBookings : earnings.sevenDaysBookings).map((booking) => (
                <SwiperSlide key={booking.id} className={styles.swiper_slide}>
                  <EarningCard
                    name={booking.yacht?.name || ''}
                    //@ts-ignore
                    capacity={booking.totalAmount}
                    //@ts-ignore
                    startingPrice={new Date(booking.createdAt).toLocaleDateString()}
                    imageUrl={booking.yacht?.images?.[0] || Y2}
                    yachtId={booking.yachtId}
                    // isPrev={true}
                    isEarning={true}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

