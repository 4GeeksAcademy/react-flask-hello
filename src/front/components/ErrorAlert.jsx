
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ErrorAlert = () => {
  const { store, dispatch } = useGlobalReducer();

  if (!store.error) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow" style={{ zIndex: 9999, minWidth: "300px", maxWidth: "95vw" }} role="alert">
      {store.error}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => dispatch({ type: "error", payload: null })}
      />
    </div>
  );
};
