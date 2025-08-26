export function initialStore() {
  const raw = localStorage.getItem("tasky_user");
  return {
    user: raw ? JSON.parse(raw) : null,
  };
}

export default function storeReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      const u = action.payload || {};
      const username =
        u.username ||
        (u.name ? u.name : (u.email || "")).split("@")[0];
      const user = { ...u, username };
      localStorage.setItem("tasky_user", JSON.stringify(user));
      return { ...state, user };
    }
    case "LOGOUT": {
      localStorage.removeItem("tasky_user");
      return { ...state, user: null };
    }
    case "UPDATE_ROLE": {
      const role = action.payload;
      const updated = { ...state.user, role };
      localStorage.setItem("tasky_user", JSON.stringify(updated));
      return { ...state, user: updated };
    }
    default:
      return state;
  }
}