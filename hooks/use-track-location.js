import { useState, useContext } from "react";
import {
  CoffeeStoresContext,
  ACTION_TYPES,
} from "../context/coffeeStoresContext";

const geolocationErrMsg = "Can't access geolocation data...";

const useTrackLocation = () => {
  const { SET_LAT, SET_LONG } = { ...ACTION_TYPES };

  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [isInSearch, setIsInSearch] = useState(false);

  const { dispatch } = useContext(CoffeeStoresContext);

  const handleSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({ type: SET_LAT, payload: { latitude } });
    dispatch({ type: SET_LONG, payload: { longitude } });

    setLocationErrMsg("");
    setIsInSearch(false);
  };

  const handleError = () => {
    setLocationErrMsg(geolocationErrMsg);
    setIsInSearch(false);
  };

  const handleTrackLocation = () => {
    setIsInSearch(true);

    if (!navigator.geolocation) {
      setLocationErrMsg(geolocationErrMsg);

      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  return {
    error: locationErrMsg,
    fetchData: handleTrackLocation,
    isLoading: isInSearch,
    setIsInSearch,
  };
};

export default useTrackLocation;
