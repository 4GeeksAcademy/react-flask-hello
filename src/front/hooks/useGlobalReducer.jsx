// src/front/hooks/useGlobalReducer.jsx
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = {
    login: (user) => dispatch({ type: "LOGIN", payload: user }),
    logout: () => dispatch({ type: "LOGOUT" }),
    updateRole: (role) => dispatch({ type: "UPDATE_ROLE", payload: role }),
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}