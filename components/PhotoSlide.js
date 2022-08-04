import Image from "next/image";

import styles from "../styles/PhotoSlider.module.css";
import constants from "../constants/coffeeStores";

const PhotoSlide = ({ imgUrl }) => {
  return (
    <div>
      <Image
        className={styles.image}
        src={imgUrl || constants.DEFAULT_STORE_IMG_URL}
        alt="Banner Image"
        layout="fill"
      />
    </div>
  );
};

export default PhotoSlide;
