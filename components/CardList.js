import CoffeeCard from "./CoffeeCard";
import Loading from "./Loading";
import CardListHeader from "./CardListHeader";

import styles from "../styles/CardList.module.css";

const CardList = ({ coffeeShops, locality, myRef, loading }) => {
  return (
    <section ref={myRef} className={styles.cardListContainer}>
      {loading ? (
        <Loading loadingMessage={"Preparing your coffee"} />
      ) : (
        <>
          <CardListHeader locality={locality} />

          <div className={styles.container}>
            {coffeeShops?.map((shop) => (
              <CoffeeCard coffeeInfo={shop} key={shop.fsq_id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CardList;
