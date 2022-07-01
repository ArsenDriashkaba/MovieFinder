import Image from "next/image";
import Link from "next/link";

import styles from "../styles/CoffeeCard.module.css";

const CoffeeCard = ({ coffeeInfo }) => {
  const { name, imgUrl, fsq_id } = {
    ...coffeeInfo,
  };

  return (
    <Link href={`coffeeStore/${fsq_id}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>{name}</h1>
        <Image
          src={
            imgUrl ||
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          }
          alt={name}
          width="230"
          height="200"
        />
      </div>
    </Link>
  );
};

export default CoffeeCard;
