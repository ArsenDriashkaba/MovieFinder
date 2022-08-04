import GoogleMapReact from "google-map-react";

import styles from "../styles/Map.module.css";

const defaultMapProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GMAPS_API_KEY }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
