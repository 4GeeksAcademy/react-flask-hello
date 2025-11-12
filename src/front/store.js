export const initialStore = () => {
  return {
    token: localStorage.getItem("token") || null
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      return {
        ...store,
        token: action.payload
      };
    case "logout":
      return {
        ...store,
        token: null
      };
    default:
      throw Error("Unknown action.");
  }
}