import Image from "next/image";
import { updateCoffeeStore } from "../lib/coffeeStore";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const UpVoteButton = ({
  coffeeStoreId,
  currRating,
  setRating,
  setUpdating,
}) => {
  const handleOnClick = async () => {
    const newRating = currRating + 1;

    try {
      setUpdating(true);

      await updateCoffeeStore(coffeeStoreId, { rating: newRating });

      setUpdating(false);
      setRating(newRating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleOnClick} className={styles.upVote}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.upVoteIco}
          src="/static/icons/heart.svg"
          layout="fill"
          alt="like ico"
        />
      </div>
    </button>
  );
};

export default UpVoteButton;
