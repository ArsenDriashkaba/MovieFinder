import { useState } from "react";

const useTrackLocation = () => {
  const geolocationErrMsg = "Can't access geolocation data...";
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [locationCoords, setLocationCoords] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocationCoords([latitude, longitude]);
    setLocationErrMsg("");
    setIsInSearch(false);
  };

  const error = () => {
    setLocationErrMsg(geolocationErrMsg);
    setIsInSearch(false);
  };

  const handleTrackLocation = () => {
    setIsInSearch(true);

    if (!navigator.geolocation) {
      setLocationErrMsg(geolocationErrMsg);

      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return { locationCoords, locationErrMsg, handleTrackLocation, isInSearch };
};

export default useTrackLocation;
