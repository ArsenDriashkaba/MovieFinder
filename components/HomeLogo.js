import Link from "next/link";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const HomeLogo = () => {
  return (
    <header className={styles.logoContainer}>
      <Link href="/">
        <a>
          <h1 className={styles.logoText}>
            Coffee<span className={styles.logoText2}>Connoisseur</span>
          </h1>
        </a>
      </Link>
    </header>
  );
};

export default HomeLogo;
