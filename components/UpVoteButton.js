import { updateCoffeeStore } from "../lib/coffeeStore";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const UpVoteButton = ({
  coffeeStoreId,
  text,
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
      {text}
    </button>
  );
};

export default UpVoteButton;
