export const initialStore = () => {
  return {
    products: [],
    carrito: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "agregar_al_carrito": {
      const producto = action.payload;

      const productoExistente = store.carrito.find(
        (item) => item.id === producto.id
      );

      let nuevoCarrito;
      if (productoExistente) {
        nuevoCarrito = store.carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        nuevoCarrito = [...store.carrito, { ...producto, cantidad: 1 }];
      }

      return {
        ...store,
        carrito: nuevoCarrito,
      };
    }

    case "eliminar_del_carrito": {
      const id = action.payload;

      const nuevoCarrito = store.carrito.filter((item) => item.id !== id);

      return {
        ...store,
        carrito: nuevoCarrito,
      };
    }

    case "vaciar_carrito": {
      return {
        ...store,
        carrito: [],
      };
    }

    case "incrementar_cantidad": {
      const id = action.payload;
      return {
        ...store,
        carrito: store.carrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        ),
      };
    }
    case "decrementar_cantidad": {
      const id = action.payload;
      return {
        ...store,
        carrito: store.carrito.map((item) =>
          item.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        ),
      };
    }

    default:
      return store;
  }
}
