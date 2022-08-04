import CoffeeCard from "./CoffeeCard";

import styles from "../styles/CardList.module.css";
import CardListHeader from "./CardListHeader";

const CardList = ({ coffeeShops, locality }) => {
  return (
    <section className={styles.cardListContainer}>
      <CardListHeader locality={locality} />

      <div className={styles.container}>
        {coffeeShops?.map((shop) => (
          <CoffeeCard coffeeInfo={shop} key={shop.fsq_id} />
        ))}
      </div>
    </section>
  );
};

export default CardList;
