import Image from "next/image";

import { motion } from "framer-motion";

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

        <motion.div
          className={styles.steam}
          animate={{
            x: [-10, 0, -10],
            y: [0, -10, 0],
            opacity: [0.1, 0.3, 0.5, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
        >
          <Image
            src="/static/images/steam.png"
            layout="responsive"
            width={686}
            height={686}
          />
        </motion.div>

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
