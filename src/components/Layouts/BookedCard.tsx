import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Layouts/YatchCard.module.css';

interface YachtCardProps {
  name: string;
  capacity: number;
  startingPrice: string;
  imageUrl: string;
  yachtId: string; // Unique ID for the yacht
}

const BookedCard: React.FC<YachtCardProps> = ({ name, capacity, startingPrice, imageUrl, yachtId }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/yacht/${yachtId}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.capacity}>Capacity: {capacity} people</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <div className={styles.priceTag}>Starting from {startingPrice}</div>
      </div>
      <button className={styles.bookButton} onClick={handleBookNow}>
        View Details
      </button>
    </div>
  );
};

export default BookedCard;
