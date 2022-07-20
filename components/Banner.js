import styles from "../styles/Banner.module.css";

const Banner = ({ handleOnClick, buttonText }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Coffee <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops</p>
      <button onClick={handleOnClick} className={styles.viewStoresButton}>
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
