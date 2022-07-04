import { useState, useContext } from "react";
import {
  CoffeeStoresContext,
  ACTION_TYPES,
} from "../context/coffeeStoresContext";

const useTrackLocation = () => {
  const { SET_LAT, SET_LONG } = { ...ACTION_TYPES };

  const geolocationErrMsg = "Can't access geolocation data...";
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [isInSearch, setIsInSearch] = useState(false);

  const { dispatch } = useContext(CoffeeStoresContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({ type: SET_LAT, payload: { latitude } });
    dispatch({ type: SET_LONG, payload: { longitude } });

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

  return { locationErrMsg, handleTrackLocation, isInSearch };
};

export default useTrackLocation;
