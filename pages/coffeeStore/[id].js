import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Header from "../../components/Header";
import IcoText from "../../components/IcoText";
import UpVoteButton from "../../components/UpVoteButton";

import styles from "../../styles/CoffeeStoreDynamic.module.css";

import { isEmptyObj, findStoreById } from "../../utils";
import { fetchCoffeeStores, getReqSearchUrl } from "../../lib/coffeeStores";
import {
  generateStaticPaths,
  generateStoreInfo,
  getCoffeeStoreById,
} from "../../lib/coffeeStore";
import { CoffeeStoresContext } from "../../context/coffeeStoresContext";
import constants from "../../constants/coffeeStores";

export const getStaticProps = async ({ params }) => {
  const storeId = params.id;
  const url = getReqSearchUrl("coffee", "48.1461013", "17.1080403", 12);
  const coffeeShopsData = await fetchCoffeeStores(url);
  const foundStore = findStoreById(coffeeShopsData, storeId);
  const coffeeStore = foundStore ? foundStore : {};

  return {
    props: {
      coffeeStore,
    },
  };
};

export const getStaticPaths = async () => {
  const url = getReqSearchUrl("coffee", "48.1461013", "17.1080403", 12);
  const coffeeShopsData = await fetchCoffeeStores(url);

  return {
    paths: generateStaticPaths(coffeeShopsData),
    fallback: true,
  };
};

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  const { state } = useContext(CoffeeStoresContext);

  const id = router.query.id;
  const [coffeeStoreData, setCoffeeStoreData] = useState(coffeeStore);
  const [rating, setRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUrlSwr = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}getCoffeeStore/${id}`;
  const { data, error } = useSWR(fetchUrlSwr, (url) => axios.get(url));

  useEffect(() => {
    if (!coffeeStoreData || isEmptyObj(coffeeStoreData)) {
      if (state.coffeeStoresData.length == 0) {
        const data = getCoffeeStoreById(id);

        setCoffeeStoreData(data);
      } else {
        const data = findStoreById(state.coffeeStoresData, id);

        setCoffeeStoreData(data);
      }
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setRating(data.data.rating);
    }
    if (error) {
      setErrorMsg(errorMsg);
    }
  }, [data]);

  const { name, imgUrl } = { ...coffeeStoreData };
  const { address, neighbourhood } = generateStoreInfo(coffeeStoreData);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Header title={name} />

      <section className={styles.mainSection}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={imgUrl || constants.DEFAULT_STORE_IMG_URL}
            width={500}
            height={500}
            alt={name}
          />
        </div>

        <div className={styles.storeInfoContainer}>
          <>
            <IcoText text={rating} icoUrl="star.svg" altIcoMsg="ratingLogo" />
            <IcoText
              text={address}
              icoUrl="location.svg"
              altIcoMsg="addressLogo"
            />
            <IcoText
              text={neighbourhood}
              icoUrl="home.svg"
              altIcoMsg="neighbourhoodLogo"
            />
          </>
          <div className={styles.buttonContainer}>
            <UpVoteButton
              coffeeStoreId={id}
              text="Up Vote"
              currRating={rating}
              setRating={setRating}
            />
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
