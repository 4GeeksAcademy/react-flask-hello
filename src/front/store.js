export const initialStore = () => {
  return {
    token: localStorage.getItem("token") || null,
    message: null,
    tareas: [
      {
        id: 1,
        titulo: "Hacer la compra",
        descripcion: "",
        fecha: "2025-11-13",
        hora: "10:00",
        direccion: "Calle Santoña 56, Madrid",
        invitados: ["juan@gmail.com"],
        lat: 40.3926,
        lng: -3.7016,
      },
      {
        id: 2,
        titulo: "Quedada para el cine",
        descripcion: "",
        fecha: "2025-11-14",
        hora: "18:00",
        direccion: "Calle del Santuario 70, Madrid",
        invitados: ["ana@gmail.com", "luis@gmail.com"],
        lat: 40.3926,
        lng: -3.7016,
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      localStorage.setItem("token", action.payload);
      return {
        ...store,
        token: action.payload,
      };
    case "logout":
      localStorage.removeItem("token");
      return {
        ...store,
        token: null,
      };
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    case "add_tarea":
      return {
        ...store,
        tareas: [
          ...store.tareas,
          {
            ...action.payload,
            id:
              store.tareas.length > 0
                ? Math.max(...store.tareas.map((t) => t.id)) + 1
                : 1,
          },
        ],
      };
    default:
      throw new Error("Unknown action.");
  }
}