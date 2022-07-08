import Head from "next/head";
import { useRouter } from "next/router";
import BackToHome from "../../components/BackToHome";
import { useContext, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/CoffeeStoreDynamic.module.css";

import { isEmptyObj, findStoreById } from "../../lib";
import { fetchCoffeeStores, getReqSearchUrl } from "../../lib/coffeeStores";
import { generateStaticPaths, generateStoreInfo } from "../../lib/coffeStore";
import coffeeStores from "../../data/coffee-stores.json";
import { CoffeeStoresContext } from "../../context/coffeeStoresContext";

export const getStaticProps = async ({ params }) => {
  const storeId = params.id;
  const url = getReqSearchUrl("coffee", "48.1461013", "17.1080403", 12);
  const coffeeShopsData = await fetchCoffeeStores(url);
  const coffeeStore = findStoreById(coffeeShopsData, storeId);

  return {
    props: {
      coffeeStore,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: generateStaticPaths(coffeeStores),
    fallback: true,
  };
};

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const id = router.query.id;
  const [coffeeStoreData, setCoffeeStoreData] = useState(coffeeStore);
  const { state } = useContext(CoffeeStoresContext);

  useEffect(() => {
    if (isEmptyObj(coffeeStoreData)) {
      const data = findStoreById(state.coffeeStoresData, id);

      setCoffeeStoreData(data);
    }
  }, [id]);

  const { name, imgUrl } = { ...coffeeStoreData };
  const { address, neighbourhood } = generateStoreInfo(coffeeStoreData);

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <header className={styles.titleContainer}>
        <h1 className={styles.title}>{name}</h1>
        <BackToHome />
      </header>
      <section className={styles.mainSection}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={500}
            height={500}
            alt={name}
          />
        </div>
        <div className={styles.storeInfoContainer}>
          <>
            <div className={styles.ratingContainer}>
              <Image
                src="/static/icons/star.svg"
                width={20}
                height={20}
                alt="adressLogo"
              />
              <p className={styles.rating}>{0}</p>
            </div>
            <div className={styles.addressContainer}>
              <Image
                src="/static/icons/location.svg"
                width={20}
                height={20}
                alt="adressLogo"
              />
              <p className={styles.address}>{address}</p>
            </div>
            <div className={styles.neighbourhoodContainer}>
              <Image
                src="/static/icons/home.svg"
                width={20}
                height={20}
                alt="neighbourhoodLogo"
              />
              <p className={styles.neighbourhood}>{neighbourhood}</p>
            </div>
          </>
          <div className={styles.buttonContainer}>
            <button className={styles.upVote}>Up Vote</button>
            <Link href={"/"}>
              <button className={styles.toStore}>To Store</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoffeeStore;
