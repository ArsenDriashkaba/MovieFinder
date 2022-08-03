import Image from "next/image";
import styles from "../styles/Banner.module.css";

const Banner = ({ handleOnClick, buttonText }) => {
  return (
    <section
      className={styles.background}
      style={{ backgroundImage: 'url("/static/images/Background.png")' }}
    >
      <div className={styles.contentBackground}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Coffee
              <br />
              <span className={styles.title2}>Connoisseur</span>
            </h1>

            <p className={styles.subtitle}>Discover your local coffee shops</p>
            <button
              onClick={handleOnClick}
              className={styles.discoverStoresButton}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <Image
          className={styles.steam}
          src="/static/images/steam.png"
          layout="responsive"
          width={686}
          height={686}
        />

        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src="/static/images/coffeeImage.png"
            layout="responsive"
            width={686}
            height={686}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
