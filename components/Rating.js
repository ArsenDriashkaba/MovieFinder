import Image from "next/image";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const Rating = ({ value, ico }) => {
  return (
    <div className={styles.rating}>
      <span>{value}</span>
      <div className={styles.ratingIco}>
        <Image src={`/static/icons/${ico}`} alt="star" layout="fill" />
      </div>
    </div>
  );
};

export default Rating;
