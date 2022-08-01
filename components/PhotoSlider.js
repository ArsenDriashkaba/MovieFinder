import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import styles from "../styles/PhotoSlider.module.css";

import PhotoSlide from "./PhotoSlide";
import { useState, useEffect } from "react";
import { getCoffeeStoreImages } from "../lib/coffeeStore";

const PhotoSlider = ({ storeId }) => {
  const [coffeeStoreImages, setCoffeeStoreImages] = useState([]);

  useEffect(() => {
    const fetchStoreImages = async () => {
      const images = await getCoffeeStoreImages(storeId);

      setCoffeeStoreImages(images);
    };

    fetchStoreImages();
  }, [storeId]);

  return (
    <Swiper
      className={styles.container}
      slidesPerView={1}
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
    >
      {coffeeStoreImages?.map((photo) => (
        <SwiperSlide>
          <PhotoSlide imgUrl={photo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PhotoSlider;
