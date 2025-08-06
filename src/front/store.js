// Estado inicial
export const initialStore = () => {
  return {
   
    all_games: [],
    carro: []  // <- añadido
  };
};

// Reducer
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
        todos: store.todos.map((todo) =>
          (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'setGames':
      return {
        ...store,
        all_games: action.payload
      };

    // ---- carrito ----
    case 'addToCarro': {
      const game = action.payload;
      const exists = store.carro.find(item => item.id === game.id);
      let updated;
      if (exists) {
        updated = store.carro.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...store.carro, { ...game, quantity: 1 }];
      }
      return {
        ...store,
        carro: updated
      };
    }

    case 'removeFromCarro':
      return {
        ...store,
        carro: store.carro.filter(item => item.id !== action.payload)
      };

    case 'clearCarro':
      return {
        ...store,
        carro: []
      };

    case 'updateQuantity':
      return {
        ...store,
        carro: store.carro.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    default:
      throw Error('Unknown action.');
  }
}