export const initialStore = () => {
  return {
    message: null,
    user: null,
    tarifas: [
      {
        id: "basico",
        nombre: "Tarifa Basic",
        descripcion:
          "Ideal para quienes quieren empezar a moverse. Incluye planes básicos de entrenamiento.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/peso-saludable-cuidado-masculino-atletico_1139-695.jpg",
        ],
        price: 45,
        price_id: import.meta.env.VITE_BASIC_PRICE_ID,
        beneficios: [
          "Acceso al gimnasio en horario limitado",
          "Plan de entrenamiento general",
          "Acceso eventos deportivos",
        ],
        exclusiones: [
          "Seguimiento nutricional",
          "Clases dirigidas",
          "Asesoramiento personalizado",
          "Acceso a todos los eventos",
          "Invitacion amigos/familiares",
        ],
      },
      {
        id: "premium",
        nombre: "Tarifa Premium",
        descripcion: "Incluye entrenamiento y nutrición personalizados.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/mujer-joven-cinta-metrica-cocina_1303-24778.jpg",
        ],
        price: 55,
        price_id: import.meta.env.VITE_PREMIUM_PRICE_ID,
        beneficios: [
          "Acceso completo al gimnasio sin restricciones horarias",
          "Planes de nutrición personalizados y tabla deportiva",
          "Seguimiento mensual con entrenador",
          "Acceso a clases dirigidas",
        ],
        exclusiones: [
          "Sesiones semanales personalizadas",
          "Acceso prioritario a eventos",
          "Descuentos en productos asociados",
          "Invitacion amigos/familiares",
        ],
      },
      {
        id: "dmpc",
        nombre: "Tarifa DMPC",
        descripcion: "Acceso completo a todos los servicios y asesoramientos.",
        imagenes: [
          "https://img.freepik.com/foto-gratis/primer-plano-instructor-gimnasia-escribiendo-diario_23-2147827460.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740",
        ],
        price: 65,
        price_id: import.meta.env.VITE_DMPC_PRICE_ID,
        beneficios: [
          "Todo lo incluido en Premium",
          "Asesoramiento continuo (entrenamiento, nutrición y bienestar)",
          "Sesiones semanales personalizadas",
          "Acceso prioritario a eventos y talleres",
          "Descuentos en productos asociados",
        ],
        exclusiones: [
          "Sin clases ilimitadas 24h",
          "Sin entrenador personal permanente",
          "Sin acceso VIP a instalaciones premium",
        ],
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
