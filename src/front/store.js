export const initialStore = () => {
  return {
    user: null,
    todos: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_user":
      return { ...store, user: action.payload };
    default:
      return store;
  }
}
