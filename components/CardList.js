import CoffeeCard from "./CoffeeCard";

import styles from "../styles/CardList.module.css";

const CardList = ({ coffeeShops }) => {
  return (
    <div className={styles.container}>
      {coffeeShops?.map((shop) => (
        <CoffeeCard coffeeInfo={shop} key={shop.fsq_id} />
      ))}
    </div>
  );
};

export default CardList;
