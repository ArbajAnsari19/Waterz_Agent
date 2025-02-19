import React from "react";
import styles from "../../styles/Home/Home.module.css"
import YachtCard from "../Layouts/YatchCard";
// import hh1 from "../../assets/Home/hh1.svg";
// import hh2 from "../../assets/Home/hh2.svg";
import hh3 from "../../assets/Home/hh3.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SolutionCard from "../Layouts/SolutionCard";
import { useTopYachts } from "../../hooks/useTopYacht";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const solutionData = [
  {
    id: "solution-1",
    heading: "Access a Wide Audience",
    subheading: "Access a diverse range of yachts for all client needs.",
  },
  {
    id: "solution-2",
    heading: "Easy Bookings",
    subheading: "Our user-friendly platform provide streamlined, hassle-free booking process.",
  },
  {
    id: "solution-3",
    heading: "Attractive Commissions",
    subheading: "Earn competitive commissions on every booking.",
  },
  {
    id: "solution-4",
    heading: "Customization Options",
    subheading: "Tailor bookings with add-ons like catering, routes, and events. ",
  },
  {
    id: "solution-5",
    heading: "Effortless Management",
    subheading: "Track bookings, communicate with clients, and manage your yacht rentals all in one place.",
  },
  {
    id: "solution-6",
    heading: "Dedicated Support",
    subheading: "Exclusive assistance for agents to ensure smooth operations.",
  },
];


  

const Home: React.FC = () => {
  const { yachts,  error } = useTopYachts();

  if (error) {
    toast.error("Something Wrong Happened")
  }

    return(
        <div className={styles.comp_body}>
            <div className={styles.hero_body}>
              <div className={styles.hero_left}>
                <div className={styles.hero_head}>
                  Simplify Yacht Rentals for Your Clients
                </div>
                <div className={styles.hero_subhead}>
                  As an agent, you play a vital role in connecting clients with exceptional experiences. Our platform is designed to empower you, simplify your bookings, and maximize your success. 
                </div>
                <Link to="/location">
                  <div className={styles.hero_btn}>
                    Book Your Batch
                  </div>
                </Link>
              </div>
              <div className={styles.hero_right}>
              {/* <div className={styles.hero_box1}>
                <div className={styles.hero_imgbox}>
                    <img src={hh1} className={styles.hh} />
                </div>
                <div className={styles.hero_imgbox}>
                  <img src={hh2} className={styles.hh} />
                </div>
              </div> */}
              <div className={styles.hero_box2}>
                <img src={hh3} className={styles.hh2} />
              </div>
              </div>
            </div>
            <div className={styles.yatchBox}>
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
                  <SwiperSlide key={yacht._id} className={styles.swiper_slide} >
                    {/* @ts-ignore */}
                    <YachtCard yacht={yacht} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={styles.yatchBox}>
            <div className={styles.section_head2}>
              Effortless Distribution
            </div>
            <div className={styles.section_head}>
              Seamless Yacht Distribution Solutions
            </div>
            <div className={styles.gridBox}>
              {solutionData.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  heading={solution.heading}
                  subheading={solution.subheading}
                />
              ))}
            </div>
          </div>
        </div>
    )
}

export default Home;