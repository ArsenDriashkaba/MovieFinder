import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import Head from "next/head";

import HomeLogo from "../../components/HomeLogo";

import styles from "../../styles/CoffeeStoreDynamic.module.css";

import { isEmptyObj, findStoreById } from "../../utils";
import { fetchCoffeeStores, getSearchPlacesUrl } from "../../lib/coffeeStores";
import {
  generateStaticPaths,
  generateStoreInfo,
  getCoffeeStoreById,
  getCoffeeStoreComments,
  getCoffeeStoreAdditionalInfo,
  additionalInfoFields,
} from "../../lib/coffeeStore";
import { CoffeeStoresContext } from "../../context/coffeeStoresContext";
import constants from "../../constants/coffeeStores";
import PhotoSlider from "../../components/PhotoSlider";
import { getCoffeeStoreImages } from "../../lib/coffeeStore";
import CommentSection from "../../components/CommentSection";
import Map from "../../components/Map";
import StoreInfo from "../../components/StoreInfo";
import IcoTextList from "../../components/IcoTextList";

const {
  DEFAULT_SEARCH_LATITUDE,
  DEFAULT_SEARCH_LONGITUDE,
  DEFAULT_SEARCH_LIMIT1,
  SEARCH_QUERY,
  DEFAULT_QUERY_FIELDS,
} = { ...constants };

const url = getSearchPlacesUrl(
  SEARCH_QUERY,
  DEFAULT_SEARCH_LATITUDE,
  DEFAULT_SEARCH_LONGITUDE,
  DEFAULT_SEARCH_LIMIT1,
  DEFAULT_QUERY_FIELDS
);

export const getStaticProps = async ({ params }) => {
  const storeId = params.id;
  const coffeeShopsData = await fetchCoffeeStores(url);
  const foundStore = findStoreById(coffeeShopsData, storeId);
  const coffeeStore = foundStore ? foundStore : {};

  const images = await getCoffeeStoreImages(storeId);
  const comments = await getCoffeeStoreComments(storeId);
  const additionalInfo = await getCoffeeStoreAdditionalInfo(
    storeId,
    additionalInfoFields
  );

  return {
    props: {
      coffeeStore,
      images,
      comments,
      additionalInfo,
    },
  };
};

export const getStaticPaths = async () => {
  const coffeeShopsData = await fetchCoffeeStores(url);

  return {
    paths: generateStaticPaths(coffeeShopsData),
    fallback: true,
  };
};

const CoffeeStore = ({ coffeeStore, images, comments, additionalInfo }) => {
  const router = useRouter();
  const { state } = useContext(CoffeeStoresContext);

  const id = router.query.id;
  const [coffeeStoreData, setCoffeeStoreData] = useState(coffeeStore);
  const [likes, setLikes] = useState(0);
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
      setLikes(data.data.rating);
    }
    if (error) {
      setErrorMsg(errorMsg);
    }
  }, [data]);

  const title = coffeeStoreData?.name;
  const { address, neighbourhood } = generateStoreInfo(coffeeStoreData);
  const storeInfoValue = {
    id,
    ...additionalInfo,
    likes,
    title,
    likes,
    setLikes,
    description: additionalInfo?.description || constants.DEFAULT_DESCRIPTION,
  };
  const icoTextList = [
    {
      text: address || constants.DEFAULT_ADDRESS,
      ico: "location.svg",
      altIcoMsg: "location icon",
    },
    {
      text: neighbourhood || constants.DEFAULT_LOCATION,
      ico: "navigation.svg",
      altIcoMsg: "navigation icon",
    },
    {
      text: additionalInfo?.tel || constants.DEFAULT_PHONE_NUMBER,
      ico: "phone.svg",
      altIcoMsg: "phone icon",
    },
  ];

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Gerara here dude</p>;
  }

  return (
    <section className={styles.page}>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={styles.contentWrapper}>
        <HomeLogo />

        <section className={styles.mainSection}>
          <div className={styles.sliderInfoWrapper}>
            <PhotoSlider coffeeStoreImages={images} />
            <StoreInfo value={storeInfoValue} />
          </div>

          <IcoTextList dataList={icoTextList} />
        </section>

        <h2 className={styles.reviewsHeader}>Reviews</h2>
        <section className={styles.commentsMapWrapper}>
          <CommentSection comments={comments} />
          <Map />
        </section>
      </div>
    </section>
  );
};

export default CoffeeStore;
