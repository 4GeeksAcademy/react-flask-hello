export function initialStore() {
  const raw = localStorage.getItem("tasky_user");
  if (raw) return { user: JSON.parse(raw) };

  return {
    user: {
      id: 1,
      username: "demo",
      email: "prueba1@gmail.com",
      roles: ["client"],
      bio: "Electricista con 5 años de experiencia.",
      location: "CDMX, México",
      created_at: new Date().toISOString(),
      avatar_url: "",
      tagline: "Mini bio (opcional)",
    },
  };
}

export default function storeReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      const user = action.payload;
      localStorage.setItem("tasky_user", JSON.stringify(user));
      return { ...state, user };
    }
    case "LOGOUT": {
      localStorage.removeItem("tasky_user");
      return { ...state, user: null };
    }
    case "UPDATE_PROFILE": {
      const user = { ...state.user, ...action.payload };
      localStorage.setItem("tasky_user", JSON.stringify(user));
      return { ...state, user };
    }
    default:
      return state;
  }
}