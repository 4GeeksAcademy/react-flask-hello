export const initialStore = () => {
  return {
    user: null,
    token: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...store, access_token: action.payload };
    case "LOGOUT":
      return initialStore();
    default:
      throw Error("Unknown action.");
  }
}
