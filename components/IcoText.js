import Image from "next/image";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const IcoText = ({ data }) => {
  const { text, ico, altIcoMsg } = { ...data };

  return (
    <div className={styles.icoTextContainer}>
      <Image
        src={`/static/icons/${ico}`}
        width={20}
        height={20}
        alt={altIcoMsg}
      />
      <p className={styles.icoText}>{text}</p>
    </div>
  );
};

export default IcoText;
