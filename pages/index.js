import { fetchCoffeeStores, getReqSearchUrl } from "../lib/coffeeStores";

import Head from "next/head";
import Banner from "../components/Banner";
import CardList from "../components/CardList";

import styles from "../styles/Home.module.css";
import useTrackLocation from "../hooks/use-track-location";
import { useState, useEffect } from "react";

export const getStaticProps = async () => {
  const url = getReqSearchUrl("coffee", "48.1461013", "17.1080403", 12);
  const coffeeShopsData = await fetchCoffeeStores(url);

  return {
    props: {
      coffeeShops: coffeeShopsData,
    },
  };
};

const fetchLocationCoffeeStores = async (coords, setter) => {
  try {
    if (coords.length == 0) {
      return;
    }

    const [lat, long] = [...coords];
    const url = getReqSearchUrl("coffee", lat, long, 9);
    const coffeeShopsData = await fetchCoffeeStores(url);

    console.log({ lat, long, url, coffeeShopsData });

    setter(coffeeShopsData);
  } catch (err) {
    console.log(err);
  }
};

export default function Home({ coffeeShops }) {
  const [locationCoffeeStores, setLocationCoffeeStores] = useState();

  const { isInSearch, locationCoords, handleTrackLocation, locationErrMsg } =
    useTrackLocation();

  const handleButtonClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchLocationCoffeeStores = async () => {
      try {
        if (locationCoords.length == 0) {
          return;
        }

        const [lat, long] = [...locationCoords];
        const url = getReqSearchUrl("coffee", lat, long, 9);
        const coffeeShopsData = await fetchCoffeeStores(url);

        console.log({ lat, long, url, coffeeShopsData });

        setLocationCoffeeStores(coffeeShopsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocationCoffeeStores();
  }, [locationCoords]);

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
            locationCoffeeStores ? locationCoffeeStores : coffeeShops
          }
        />
      </main>
    </div>
  );
}
