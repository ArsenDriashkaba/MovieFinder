import styles from "../styles/CoffeeStoreDynamic.module.css";
import Rating from "./Rating";
import LinkButton from "./LinkButton";
import Pricing from "./Pricing";
import UpVoteButton from "./UpVoteButton";

const StoreInfo = ({ value }) => {
  const { id, setIsUpdating, setLikes, price, rating, likes, title } = {
    ...value,
  };

  return (
    <div className={styles.storeInfoContainer}>
      <h1 className={styles.title}>{title}</h1>
      <Pricing value={price} />

      <div className={styles.ratingContainer}>
        <Rating value={rating} ico="star.svg" />
        <Rating value={likes} ico="heart.svg" />
      </div>

      <div className={styles.descriptionContainer}>Description.</div>
      <div className={styles.buttonContainer}>
        <LinkButton text={"To Store"} />
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
