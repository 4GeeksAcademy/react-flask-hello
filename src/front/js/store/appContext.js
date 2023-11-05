import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
  const StoreWrapper = props => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: updatedStore =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions }
          })
      })
    );

    useEffect(() => {
      state.actions.loadTokens();
      state.actions.getMessage();
      state.actions.getUserInfo(); // Agregar esta acción para obtener la información del usuario, incluida la imagen de perfil
    }, []);

    // Actualizar el estado global con la URL de la imagen de perfil cuando sea necesario
    useEffect(() => {
      if (state.store.userInfo && state.store.userInfo.profileImage) {
        const updatedStore = { profileImage: state.store.userInfo.profileImage };
        state.actions.updateStore(updatedStore);
      }
    }, [state.store.userInfo]);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;

