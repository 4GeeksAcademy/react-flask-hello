export const initialStore = () => {
  return {
    misEventos: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "setMyEvents":
      return {
        ...store,
        misEventos: action.payload,
      };

    case "deleteEvent":
      return {
        ...store,
        misEventos: store.misEventos.filter((e) => e.id !== action.payload.id),
      };

    default:
      throw Error("Unknown action.");
  }
}