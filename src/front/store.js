export const initialStore=()=>{
  return{
    user: JSON.parse(localStorage.getItem('user')) || null,
    tienda: JSON.parse(localStorage.getItem('tienda')) || null,
    auth: localStorage.getItem('token')? true :  false,
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
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'upload_tienda':
      return{
        ...store,
        tienda: action.payload
      }
    
      case 'update_avatar':
        return{
          ...store,
          user:{...store.user, ['avatar']:action.payload} 
        }

    case 'update_user':
      return {
        ...store, 
        user: action.payload
      }

    case 'logout': 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return {
      ...store, 
      user: null,
      auth: false
    }
    case "login":
      return {
        ...store,
        user: action.payload,
        auth: true
      }
      case "register":
        return {
          ...store,
          user: action.payload
        }
      case "logout":
        return {
          ...store,
          user: null,
          cart: [] // no recuerdo ahora!!!! verificar
        }
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
    
  }    
}