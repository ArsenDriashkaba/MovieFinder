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

    setUpdating(true);
    await updateCoffeeStore(coffeeStoreId, { rating: newRating });
    setUpdating(false);
    setRating(newRating);
  };

  return (
    <button onClick={handleOnClick} className={styles.upVote}>
      <Image src="/static/icons/heart.svg" layout="fill" alt="like ico" />
    </button>
  );
};

export default UpVoteButton;
