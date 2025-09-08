import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer debe usarse dentro de <StoreProvider>");
  }
  return context;
}
