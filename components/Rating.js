import Image from "next/image";

import styles from "../styles/CoffeeStoreDynamic.module.css";
import Spinner from "./Spinner";

const Rating = ({ value, ico, isUpdating }) => {
  return (
    <div className={styles.rating}>
      {isUpdating ? (
        <Spinner className={styles.likeLoading} />
      ) : (
        <>
          <span>{value}</span>
          <div className={styles.ratingIco}>
            <Image src={`/static/icons/${ico}`} alt="star" layout="fill" />
          </div>
        </>
      )}
      {/* <Spinner /> */}
    </div>
  );
};

export default Rating;
