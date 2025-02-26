import React from "react";
import styles from "../../styles/Discover/Discover.module.css"
import YachtCard from "../Layouts/YatchCard";
// import { IoSearchOutline } from "react-icons/io5";
// import filt from "../../assets/Icons/filtIcon.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTopYachts } from "../../hooks/useTopYacht";
import 'swiper/swiper-bundle.css';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Discover: React.FC = () => {
    const { yachts, error } = useTopYachts();

    if (error) {
      toast.error("Something Wrong Happened")
    }
 
    return(
        <div className={styles.comp_body}>
            {/* <div className={styles.search_box}>
                <div className={styles.search_left}>
                    <IoSearchOutline className={styles.searchIcon}/>
                    <input className={styles.search} placeholder="Search for Yachts near you"/>
                </div>
                <div className={styles.search_right}>
                    <img src={filt} className={styles.filtIcon} />
                </div>
            </div> */}
            <div className={styles.hero_left}>
                <div className={styles.hero_head}>
                    Book Your Yatch
                </div>
                <Link to="/location" >
                  <div className={styles.hero_btn}>
                      Start Now
                  </div>
                </Link>
            </div>
            <div className={styles.yatchBox}>
              <div className={styles.section_head2}>
                Top Recommendations
              </div>
              <div className={styles.section_head}>
                Yacht Near You
              </div>
              <div className={styles.yatch_slider}>
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
                {yachts.map((yacht) => (
                  <SwiperSlide key={yacht?._id} className={styles.swiper_slide} >
                      <YachtCard
                        key={yacht._id}
                        yacht={yacht}
                        showLoc={false}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Discover;