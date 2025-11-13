export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || null,
    tienda: JSON.parse(localStorage.getItem("tienda")) || null,
    producto: JSON.parse(localStorage.getItem("producto")) || null,
    selected_producto: null,
    auth: localStorage.getItem("token") ? true : false,
    message: null,
    product_details: null,
    productos_generales: JSON.parse(localStorage.getItem("productosGenerales")) || null,
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
    case "productos_generales": 
    return {
      ...store,
      productos_generales: action.payload
    }
    case "upload_tienda":
      return {
        ...store,
        tienda: action.payload,
      };

    case "crear_tienda":
      return {
        ...store,
        tienda: action.payload,
      };

    case "crear_mis_productos":
      console.log('------------------------',action.payload)
      return {
        ...store,
        tienda: action.payload,
        producto: action.payload.productos
      };

    case "editar_tienda":
      return {
        ...store,
        tienda: action.payload,
      };

    case "update_avatar":
      return {
        ...store,
        user: { ...store.user, ["avatar"]: action.payload },
      };
    case "update_tienda_logo":
      return {
        ...store,
        tienda: { ...store.tienda, ["logo_url"]: action.payload },
      };

    case "update_user":
      return {
        ...store,
        user: action.payload,
      };

    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tienda");
      localStorage.removeItem("producto");
      return {
        ...store,
        user: null,
        auth: false,
        tienda: null,
        producto: null,
      };
    case "login":
      let tienda = null;
      let producto = null;
      if (action.payload.tiendas) {
        tienda = action.payload.tiendas[0];
        if (action.payload.tiendas[0].productos) {
          producto = action.payload.tiendas[0].productos;
        }
      }
      return {
        ...store,
        user: action.payload,
        tienda,
        producto,
        auth: true,
      };
    case "register":
      return {
        ...store,
        user: action.payload,
      };
    case "logout":
      return {
        ...store,
        user: null,
        cart: [], // no recuerdo ahora!!!! verificar
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
