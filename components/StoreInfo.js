import styles from "../styles/CoffeeStoreDynamic.module.css";
import GlobalRating from "./GlobalRating";
import LinkButton from "./LinkButton";
import LocalRating from "./LocalRating";
import Pricing from "./Pricing";
import UpVoteButton from "./UpVoteButton";

const StoreInfo = ({ value }) => {
  const { price } = { ...value };

  return (
    <div className={styles.storeInfoContainer}>
      <h1 className={styles.title}>Title</h1>
      <Pricing value={price} />

      <div className={styles.ratingContainer}>
        <GlobalRating />
        <LocalRating />
      </div>

      <div className={styles.descriptionContainer}>Description.</div>
      <div className={styles.buttonContainer}>
        <LinkButton text={"To Store"} />
        <UpVoteButton />
      </div>
    </div>
  );
};

export default StoreInfo;
