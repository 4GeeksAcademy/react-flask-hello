export const initialStore=()=>{
  return{
    message: null,
    ofertas: [

    ],
    usuarios: [

    ],
    lastSelectedCoordinates:[

    ],
    token:[

    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_oferta':
      const nuevaOferta = action.payload
      
      return{
      ...store,
        ofertas: [...store.ofertas, nuevaOferta]
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
    case 'add_token':
      const newToken = action.payload
      
      return{
        ...store,
        token:[newToken]
      };
    case "eliminar_usuario":
      return{
        ...store,
        usuarios:null,
        token:null
      }
    default:
      throw Error('Unknown action.');

  }    
}
