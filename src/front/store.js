export const initialStore=()=>{
  return{
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
    contactForm: initialContactFormState
  }
}

const initialContactFormState = {
  status: 'idle',
  error: null
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
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

    case 'CONTACT_SUBMIT_START':

      return {
        ...store, 
        contactForm: {
          ...store.contactForm,
          status: 'loading',
          error: null
        }
      };

      case 'CONTACT_SUBMIT_SUCCESS':
      return {
        ...store,
        contactForm: {
          ...store.contactForm,
          status: 'success'
        }
      };

    case 'CONTACT_SUBMIT_FAILURE':
      return {
        ...store,
        contactForm: {
          ...store.contactForm,
          status: 'error',
          error: action.payload
        }
      };

    case 'CONTACT_RESET_STATUS':
      // Resetea el estado del formulario a su valor inicial
      return {
        ...store,
        contactForm: initialContactFormState
      };

    default:
      throw Error('Unknown action.');
      return store;
  }    
}


