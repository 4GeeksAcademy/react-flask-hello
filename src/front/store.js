export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    auth: {
      isAuthenticated: !!localStorage.getItem("token"),
      token: localStorage.getItem("token"),
      rolId: localStorage.getItem("rol_id"),
      userId: localStorage.getItem("user_id"),
    },
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("rol_id", action.payload.rolId);
      localStorage.setItem("user_id", action.payload.userId);
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          token: action.payload.token,
          rolId: action.payload.rolId,
          userId: action.payload.userId,
        },
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...store,
        auth: {
          isAuthenticated: false,
          token: null,
          rolId: null,
          userId: null,
        },
      };

    default:
      throw Error("Unknown action.");
  }
}
