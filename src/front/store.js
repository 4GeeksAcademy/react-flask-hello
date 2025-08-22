export const initialStore=()=>{
  return{
    message: null,
    ofertas: [

    ],
    usuarios: [

    ],
    lastSelectedCoordinates:[

    ],user:null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

case "add_oferta":
  return {
    ...store,
    ofertas: store.ofertas ? [...store.ofertas, action.payload] : [action.payload]
  };

    case 'add_usuario':
      const nuevoUsuario = action.payload
      
      return{
      ...store,
        usuarios: [...store.usuarios, nuevoUsuario]
      }
    case 'add_coordenates':
      const nuevaCordenate = action.payload
      
      return{
        ...store,
        lastSelectedCoordinates:[nuevaCordenate.latitude,nuevaCordenate.longitude]
      };

    case "eliminar_usuario":
      return{
        ...store,
        usuarios:null
      };
      case 'add_user':
      const add_user = action.payload
      
      return{
      ...store,
        user: [add_user]
      }
      case "eliminar_user":
      return{
        ...store,
        user:null
      };
    default:
      throw Error('Unknown action.');

  }    
}
