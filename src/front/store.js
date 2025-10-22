export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")),
    userRole: localStorage.getItem("userRole"),
    auth: localStorage.getItem("user") ? true : false,
    icon: "/src/front/assets/img/MM-1.png",
    nameApp: "MentorMatch",
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
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_avatar":
      const updatedUser = { ...store.user, avatarUrl: action.payload };
      return {
        ...store,
        user: updatedUser,
      };
    case "save_user":
      return {
        ...store,
        user: action.payload,
        auth: true,
      };
    case "logged_out":
      localStorage.removeItem("user");
      return {
        ...store,
        auth: false,
        user: null,
      };
    case "logged_in":
      return {
        ...store,
        auth: true,
      };
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
    default:
      throw Error("Unknown action.");
  }
}
