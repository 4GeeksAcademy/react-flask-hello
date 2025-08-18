import React, { createContext, useReducer } from "react";
import { initialStore } from "../store";
import storeReducer from "../store";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [store, dispatch] = useReducer(storeReducer, initialStore());

        return (
            <Context.Provider value={{ store, dispatch }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
