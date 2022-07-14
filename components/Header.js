import BackToHome from "./BackToHome";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const Header = ({ title }) => {
  return (
    <header className={styles.titleContainer}>
      <h1 className={styles.title}>{title}</h1>
      <BackToHome />
    </header>
  );
};

export default Header;
