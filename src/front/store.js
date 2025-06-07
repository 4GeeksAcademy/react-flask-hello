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
        //Si existe, aumentamos la cantidad
        nuevoCarrito = store.carrito.map((item) =>
          item.id ? { ...item, cantidad: item.cantidad + 1 } : item
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

    default:
      throw Error("No es una accion valida");
  }
}
