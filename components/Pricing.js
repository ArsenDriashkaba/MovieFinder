import Image from "next/image";

import styles from "../styles/CoffeeStoreDynamic.module.css";

const Pricing = ({ value }) => {
  console.log({ value });
  return (
    <div className={styles.pricingContainer}>
      {[...Array(value)].map((_) => (
        <div className={styles.priceIco}>
          <Image src="/static/icons/price.svg" alt="price" layout="fill" />
        </div>
      ))}
    </div>
  );
};

export default Pricing;
