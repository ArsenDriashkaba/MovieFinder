import Image from "next/image";

import constants from "../constants/coffeeStores";

const PhotoSlide = ({ imgUrl }) => {
  return (
    <div>
      <Image
        src={imgUrl || constants.DEFAULT_STORE_IMG_URL}
        alt="Banner Image"
        layout="fill"
      />
    </div>
  );
};

export default PhotoSlide;
