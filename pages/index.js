import { useEffect, useContext } from "react";

import Head from "next/head";
import Banner from "../components/Banner";
import CardList from "../components/CardList";

import styles from "../styles/Home.module.css";

import useTrackLocation from "../hooks/use-track-location";
import { fetchCoffeeStores, getReqSearchUrl } from "../lib/coffeeStores";
import {
  CoffeeStoresContext,
  ACTION_TYPES,
} from "../context/coffeeStoresContext";

export const getStaticProps = async () => {
  const url = getReqSearchUrl("coffee", "48.1461013", "17.1080403", 12);
  const coffeeShopsData = await fetchCoffeeStores(url);

  return {
    props: {
      coffeeShops: coffeeShopsData,
    },
  };
};

export default function Home({ coffeeShops }) {
  const { SET_COFFEE_STORES } = { ...ACTION_TYPES };
  const { state, dispatch } = useContext(CoffeeStoresContext);
  const { latitude, longitude } = { ...state };

  const { isInSearch, handleTrackLocation, locationErrMsg } =
    useTrackLocation();

  const handleButtonClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchLocationCoffeeStores = async () => {
      try {
        const url = getReqSearchUrl("coffee", latitude, longitude, 9);
        const coffeeShopsData = await fetchCoffeeStores(url);

        dispatch({
          type: SET_COFFEE_STORES,
          payload: { coffeeStoresData: coffeeShopsData },
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocationCoffeeStores();
  }, [latitude, longitude]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cooffee Shops</title>
        <meta name="description" content="NextJS coffe shops finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isInSearch ? "Loading..." : "View stores"}
          handleOnClick={handleButtonClick}
        />
        {<span>{locationErrMsg}</span> && locationErrMsg}
        <CardList
          coffeeShops={
            state.coffeeStoresData.length > 0
              ? state.coffeeStoresData
              : coffeeShops
          }
        />
      </main>
    </div>
  );
}
