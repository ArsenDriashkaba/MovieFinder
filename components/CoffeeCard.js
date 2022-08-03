import Image from "next/image";
import Link from "next/link";

import { pushCoffeeStore, generateStoreInfo } from "../lib/coffeeStore";
import constants from "../constants/coffeeStores";

import styles from "../styles/CoffeeCard.module.css";

const CoffeeCard = ({ coffeeInfo }) => {
  const { name, imgUrl, fsq_id } = {
    ...coffeeInfo,
  };

  const handleOnClick = async () => {
    const { address, neighbourhood } = generateStoreInfo(coffeeInfo);
    const newStoreData = {
      name,
      imgUrl,
      id: fsq_id,
      address,
      neighbourhood,
      rating: 0,
    };

    await pushCoffeeStore(newStoreData);
  };

  return (
    <Link href={`coffeeStore/${fsq_id}`}>
      <div onClick={handleOnClick} className={styles.container}>
        <Image
          className={styles.image}
          src={imgUrl || constants.DEFAULT_STORE_IMG_URL}
          alt={name}
          layout="fill"
        />
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default CoffeeCard;
