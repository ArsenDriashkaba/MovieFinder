import Spinner from "./Spinner";

import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.message}>Loading</h2>

        <Spinner />
      </div>
    </section>
  );
};

export default Loading;
