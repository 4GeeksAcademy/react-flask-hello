// store.js

export const initialStore = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    error: null, // so you can track errors in your store
    profile_colors:["red","brown","orange","yellow","mint","green","aqua","blue","purple"]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...store,
        token: null,
        user: null,
        error: null,
      };

    case "error":
      return {
        ...store,
        error: action.payload || "Error desconocido",
      };

    default:
      // Instead of throwing an error (which would crash the app), we simply return the existing store.
      // You can log a warning if you want.
      console.warn("Unknown action type:", action.type);
      return store;
  }
}

