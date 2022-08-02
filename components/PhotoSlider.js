import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import styles from "../styles/PhotoSlider.module.css";

import PhotoSlide from "./PhotoSlide";

const PhotoSlider = ({ coffeeStoreImages }) => {
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
