export const initialStore = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const favoritesStr = localStorage.getItem("favorites");
  const selectedCategoryStr = localStorage.getItem("selectedCategory");
  const categoriesStr = localStorage.getItem("categories");

  let user = null;
  let favorites = [];
  let selectedCategory = null;
  let categories = [];

  try {
    if (userStr) user = JSON.parse(userStr);

    if (favoritesStr) favorites = JSON.parse(favoritesStr);

    if (selectedCategoryStr) selectedCategory = JSON.parse(selectedCategoryStr);

    if (categoriesStr) categories = JSON.parse(categoriesStr);
  } catch (e) {
    console.log("Error parsing stored data");
  }

  return {
    categories: categories,
    items: [],
    selectedCategory: selectedCategory,
    properties: [],
    favorites: favorites,
    token: token || null,
    user: user || null,
    error: null,
    backend_URL: import.meta.env.VITE_BACKEND_URL || ""
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
      localStorage.removeItem("favorites");
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("categories");

      return {
        ...store,
        token: null,
        user: null,
        selectedCategory: null,
        favorites: [],
        categories: [],
      };

    case "set_error":
      return {
        ...store,
        error: action.payload,
      };

    case "set_categories":
      localStorage.setItem("categories", JSON.stringify(action.payload));
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
      localStorage.setItem("selectedCategory", JSON.stringify(action.payload));
      return {
        ...store,
        selectedCategory: action.payload,
      };

    case "add_favorites":
      const newFavorites = [...store.favorites, action.payload];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...store,
        favorites: newFavorites,
      };

    case "delete_favorites":
      const updatedFavorites = store.favorites.filter(
        (fav) =>
          !(
            fav.id === action.payload.id &&
            fav.category === action.payload.category
          )
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return {
        ...store,
        favorites: updatedFavorites,
      };

    case "load_favorites":
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return {
        ...store,
        favorites: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
