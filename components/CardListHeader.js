import styles from "../styles/CardList.module.css";

const defaultText = "Popular Coffee Shops in Bratislava";

const CardListHeader = ({ locality }) => {
  const localityText = `Coffee shops in ${locality} near you. Enjoy!`;
  const headerText = locality ? localityText : defaultText;

  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.header}>{headerText}</h2>
    </div>
  );
};

export default CardListHeader;
