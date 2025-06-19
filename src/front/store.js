export const initialStore = () => {
  return {
    message: null,
    user: null,
    tarifas: [
      {
        id: "basic",
        nombre: "Tarifa Basic",
        descripcion:
          "Ideal para quienes quieren empezar a moverse. Incluye planes básicos de entrenamiento.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/peso-saludable-cuidado-masculino-atletico_1139-695.jpg",
        ],
        price_id: import.meta.env.VITE_BASIC_PRICE_ID,
      },
      {
        id: "premium",
        nombre: "Tarifa Premium",
        descripcion: "Incluye entrenamiento y nutrición personalizados.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/mujer-joven-cinta-metrica-cocina_1303-24778.jpg",
          "https://img.freepik.com/foto-gratis/pareja-gimnasio_1303-5541.jpg",
        ],
        price_id: import.meta.env.VITE_PREMIUM_PRICE_ID,
      },
      {
        id: "dmpc",
        nombre: "Tarifa DMPC",
        descripcion: "Acceso completo a todos los servicios y asesoramientos.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/mujeres-comida-saludable-tiro-medio_23-2149894948.jpg",
        ],
        price_id: import.meta.env.VITE_DMPC_PRICE_ID,
      },
    ],
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
    case "set_tarifa":
      return {
        ...store,
        tarifa: action.payload,
      };
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        ...store,
        user: null,
      };

    case "get_user_info":
      return {
        ...store,
        user: action.payload,
      };

    case "login_register":
      return {
        ...store,
        user: action.payload.user,
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

    case "ACTUALIZAR_USUARIO":
      return {
        ...store,
        user: action.payload,
      };

    case "BORRAR_USUARIO":
      return {
        ...store,
        user: null,
      };

    default:
      throw Error("Unknown action.");
  }
}
