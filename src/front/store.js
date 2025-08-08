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
      }
    ],
    language: 'es',
    theme: 'light',
    isLoggedIn: false, // Nuevo: estado de autenticación
    user_id: null,     // Nuevo: ID del usuario logeado
    token: null        // Nuevo: token JWT del usuario
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'set_language':
      return {
        ...store,
        language: action.payload
      };

    case 'toggle_theme':
      return {
        ...store,
        theme: store.theme === 'light' ? 'dark' : 'light'
      };

    case 'set_login_status': // Nuevo: Acción para actualizar el estado de login
      return {
        ...store,
        isLoggedIn: action.payload.isLoggedIn,
        user_id: action.payload.user_id,
        token: action.payload.token
      };

    default:
      throw Error('Unknown action.');
  }
}