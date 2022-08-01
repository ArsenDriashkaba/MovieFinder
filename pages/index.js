import { useEffect, useContext } from "react";

import Head from "next/head";
import Banner from "../components/Banner";
import CardList from "../components/CardList";

import styles from "../styles/Home.module.css";

import useTrackLocation from "../hooks/use-track-location";
import { fetchCoffeeStores, getSearchPlacesUrl } from "../lib/coffeeStores";
import {
  CoffeeStoresContext,
  ACTION_TYPES,
} from "../context/coffeeStoresContext";
import constants from "../constants/coffeeStores";
import { getStoreLocality } from "../lib/coffeeStore";

const {
  DEFAULT_SEARCH_LATITUDE,
  DEFAULT_SEARCH_LONGITUDE,
  DEFAULT_SEARCH_LIMIT1,
  DEFAULT_SEARCH_LIMIT2,
  SEARCH_QUERY,
  DEFAULT_QUERY_FIELDS,
} = { ...constants };

export const getStaticProps = async () => {
  const url = getSearchPlacesUrl(
    SEARCH_QUERY,
    DEFAULT_SEARCH_LATITUDE,
    DEFAULT_SEARCH_LONGITUDE,
    DEFAULT_SEARCH_LIMIT1,
    DEFAULT_QUERY_FIELDS
  );
  const coffeeShopsData = await fetchCoffeeStores(url);

  return {
    props: {
      coffeeShops: coffeeShopsData,
    },
  };
};

const useCoffeeStoresContext = () => useContext(CoffeeStoresContext);

export default function Home({ coffeeShops }) {
  const { state, dispatch } = useCoffeeStoresContext();
  const { latitude, longitude } = { ...state };

  const {
    isLoading: isInSearch,
    fetchData: handleButtonClick,
    error: locationErrMsg = "error",
  } = useTrackLocation();

  useEffect(() => {
    const fetchLocationCoffeeStores = async () => {
      try {
        if (!latitude || !longitude) {
          return;
        }

        const url = getSearchPlacesUrl(
          SEARCH_QUERY,
          latitude,
          longitude,
          DEFAULT_SEARCH_LIMIT2,
          DEFAULT_QUERY_FIELDS
        );
        const coffeeShopsData = await fetchCoffeeStores(url);

        if (coffeeShopsData.length == 0) {
          return;
        }

        const locality = getStoreLocality(coffeeShopsData);

        dispatch({
          type: ACTION_TYPES.SET_SEARCH_LOCALITY,
          payload: { searchLocality: locality },
        });

        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { coffeeStoresData: coffeeShopsData },
        });

        console.log(state.searchLocality);
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
        {locationErrMsg && <span>{locationErrMsg}</span>}
        <CardList
          locality={state.searchLocality}
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
