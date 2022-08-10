import { useState } from "react";

import styles from "../styles/CoffeeStoreDynamic.module.css";
import Rating from "./Rating";
import LinkButton from "./LinkButton";
import Pricing from "./Pricing";
import UpVoteButton from "./UpVoteButton";

const StoreInfo = ({ value }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { id, setLikes, price, rating, likes, title, description, link } = {
    ...value,
  };

  return (
    <div className={styles.storeInfoContainer}>
      <h1 className={styles.title}>{title}</h1>
      <Pricing value={price} />

      <div className={styles.ratingContainer}>
        <Rating value={rating} ico="star.svg" />
        <Rating value={likes} ico="heart.svg" isUpdating={isUpdating} />
      </div>

      <div className={styles.descriptionContainer}>{description}</div>
      <div className={styles.buttonContainer}>
        <LinkButton text={"To Store"} link={link} />
        <UpVoteButton
          coffeeStoreId={id}
          currRating={likes}
          setRating={setLikes}
          setUpdating={setIsUpdating}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
