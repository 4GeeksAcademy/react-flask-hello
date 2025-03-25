export const initialStore = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;

  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.log("Error parsing user");
    }
  }

  return {
    categories: [],
    items: [],
    selectedCategory: null,
    properties: [],
    favorites: [],
    token: token || null,
    user: user || null,
    error: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "login":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };

	  
    case "logout":

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        ...store,
        token: null,
        user: null,
		selectedCategory: null
      };

    case "set_error":
      return {
        ...store,
        error: action.payload,
      };

    case "set_categories":
      return {
        ...store,
        categories: action.payload,
      };

    case "set_items":
      return {
        ...store,
        items: action.payload,
      };

    case "set_properties":
      return {
        ...store,
        properties: action.payload,
      };

    case "set_selected_category":
      return {
        ...store,
        selectedCategory: action.payload,
      };

    case "add_favorites":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "delete_favorites":
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) =>
            !(
              fav.id === action.payload.id &&
              fav.category === action.payload.category
            )
        ),
      };

    case "load_favorites":
      return {
        ...store,
        favorites: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
