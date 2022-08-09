import Image from "next/image";

import { motion } from "framer-motion";

import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.message}>Loading</h2>

        <motion.div
          className={styles.imageContainer}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Image
            src="/static/icons/coffee.svg"
            layout="fill"
            alt="coffee ico"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Loading;
