import { updateCoffeeStore } from "../lib/coffeeStore";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const UpVoteButton = ({ coffeeStoreId, text, currRating, setRating }) => {
  const handleOnClick = async () => {
    const newRating = currRating + 1;

    setRating(newRating);
    await updateCoffeeStore(coffeeStoreId, { rating: newRating });
  };

  return (
    <button onClick={handleOnClick} className={styles.upVote}>
      {text}
    </button>
  );
};

export default UpVoteButton;
