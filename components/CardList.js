import CoffeeCard from "./CoffeeCard";

import styles from "../styles/CardList.module.css";

const CardList = ({ coffeeShops, locality }) => {
  return (
    <>
      {locality && (
        <h2 className={styles.localityHeader}>
          Coffee shops in <span className={styles.locality}>{locality}</span>{" "}
          near you ;)
        </h2>
      )}
      <div className={styles.container}>
        {coffeeShops?.map((shop) => (
          <CoffeeCard coffeeInfo={shop} key={shop.fsq_id} />
        ))}
      </div>
    </>
  );
};

export default CardList;
