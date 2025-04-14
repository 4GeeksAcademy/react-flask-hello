import { createContext, useReducer } from "react";
import storeReducer, { initialStore } from "../store";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
