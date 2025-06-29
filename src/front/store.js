export const initialStore = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null
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
        user: action.payload.user
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...store,
        token: null,
        user: null
      };

    default:
      throw new Error("Unknown action.");
  }
}

