import { useEffect, useContext, useRef } from "react";

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
  DEFAULT_DESCRIBE_TEXT,
  DEFAULT_LOADING_TEXT,
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

const executeScroll = (elementRef) => elementRef?.current?.scrollIntoView();

const useCoffeeStoresContext = () => useContext(CoffeeStoresContext);

export default function Home({ coffeeShops }) {
  const { state, dispatch } = useCoffeeStoresContext();
  const { latitude, longitude } = { ...state };
  const cardSection = useRef(null);

  const {
    isLoading: isInSearch,
    fetchData: handleButtonClick,
    error: locationErrMsg = "error",
    setIsInSearch,
  } = useTrackLocation();

  useEffect(() => {
    const fetchLocationCoffeeStores = async () => {
      try {
        if (!latitude || !longitude) {
          return;
        }

        setIsInSearch(true);

        const url = getSearchPlacesUrl(
          SEARCH_QUERY,
          latitude,
          longitude,
          DEFAULT_SEARCH_LIMIT2,
          DEFAULT_QUERY_FIELDS
        );
        const coffeeShopsData = await fetchCoffeeStores(url);

        if (coffeeShopsData.length == 0) {
          setIsInSearch(false);
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

        setIsInSearch(false);
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
        <link rel="icon" href="/static/icons/coffee.svg" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isInSearch ? DEFAULT_LOADING_TEXT : DEFAULT_DESCRIBE_TEXT}
          handleOnClick={() => {
            executeScroll(cardSection);
            handleButtonClick();
          }}
        />
        {locationErrMsg && <span>{locationErrMsg}</span>}
        <CardList
          loading={isInSearch}
          myRef={cardSection}
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
