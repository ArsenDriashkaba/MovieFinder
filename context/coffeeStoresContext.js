import { createContext, useReducer } from "react";

export const CoffeeStoresContext = createContext();

export const ACTION_TYPES = {
  SET_LAT: "set_latitude",
  SET_LONG: "set_longitude",
  SET_COFFEE_STORES: "set_coffee_stores_data",
  SET_SEARCH_LOCALITY: "set_search_locality",
};

const StoreReducer = (state, action) => {
  const { SET_LAT, SET_LONG, SET_COFFEE_STORES, SET_SEARCH_LOCALITY } = {
    ...ACTION_TYPES,
  };

  switch (action.type) {
    case SET_LAT:
      return { ...state, latitude: action?.payload?.latitude };
    case SET_LONG:
      return { ...state, longitude: action?.payload?.longitude };
    case SET_COFFEE_STORES:
      return { ...state, coffeeStoresData: action?.payload?.coffeeStoresData };
    case SET_SEARCH_LOCALITY:
      return { ...state, searchLocality: action?.payload?.searchLocality };
    default:
      return new Error("Bad action type :c");
  }
};

const AppWrapper = ({ children }) => {
  const initState = {
    latitude: "",
    longitude: "",
    coffeeStoresData: [],
    searchLocality: "",
  };

  const [state, dispatch] = useReducer(StoreReducer, initState);

  return (
    <CoffeeStoresContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeStoresContext.Provider>
  );
};

export default AppWrapper;
