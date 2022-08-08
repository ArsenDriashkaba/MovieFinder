import Link from "next/link";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const LinkButton = ({ text, link }) => {
  return (
    <Link href={link || "/"}>
      <a>
        <button className={styles.linkButton}>{text}</button>
      </a>
    </Link>
  );
};

export default LinkButton;
