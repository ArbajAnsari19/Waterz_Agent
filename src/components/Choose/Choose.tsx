import React from "react";
import styles from "../../styles/Choose/Choose.module.css";
import YachtCard from "../Layouts/YatchCard";
import { useYachts } from "../../hooks/useYachts";
import { useLocation } from "react-router-dom";
import { Yacht } from "../../types/yachts";
import { toast } from "react-toastify";

interface LocationState {
    yachts: Yacht[];
}

const Choose: React.FC = () => {
  const location = useLocation();
  const state = (location.state as LocationState) || null;
  const { yachts: hookYachts, error } = useYachts();

  // Determine which yachts to display.
  // If ideal yachts were returned and are non-empty, use them.
  // Otherwise, if the ideal yachts array is empty, set a flag and use hookYachts.
  //  @ts-ignore
  const idealYachts = state?.yachts.yatches;
  console.log("idealYacht", idealYachts.length)
  const filterEmpty = idealYachts && idealYachts.length === 0;
  const displayedYachts = idealYachts && idealYachts.length > 0 ? idealYachts : hookYachts;

  if (error) {
    toast.error("Something Wrong Happened")
  }

  return (
    <div className={styles.comp_body}>
      <div className={styles.yatchBox}>
        <div className={styles.section_head}>Choose Your Perfect Getway</div>
        <div className={styles.section_head2}>
          Explore options to craft a unique yachting experience.
        </div>
      </div>

      {/* If the filtered result is empty, show a message */}
      {filterEmpty && (
        <div style={{ textAlign: "start", margin: "20px 0", fontSize: "20px", color: "red" }}>
          No Yachts found for selected filter
          <div style={{ textAlign: "start", margin: "20px 0", fontSize: "20px", color: "#2B6BE7" }}>
          Here the Other yachts you can explore
        </div>
        </div>
      )}

      <div className={styles.yachtGrid}>
        {/* @ts-ignore */}
        {displayedYachts?.map((yacht) => (
          <YachtCard showLoc={filterEmpty} key={yacht._id} yacht={yacht} />
        ))}
      </div>
    </div>
  );
};

export default Choose;


