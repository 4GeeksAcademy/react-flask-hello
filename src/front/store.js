export const initialStore=()=>{
  return{
    firstname: "",
    lastname: "",
    shopname: "",
    email: "",
    username: "",
    token: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
      case 'signup':
        var {firstname, lastname, shopname, email, token} = action.payload
  
        localStorage.setItem("token", token);
  
        return {
          ...store,
          firstname:firstname,
          lastname:lastname,
          shopname:shopname,
          email:email, 
          is_active:true, 
          token:token
        };

    case 'login':
      var {email, token} = action.payload

      localStorage.setItem("token", token);

      return {
        ...store,
        email:email, 
        username:username,
        is_active:true, 
        token:token
      };

    case 'logout':

      localStorage.clear()

      return {
        ...store,
        email: "", 
        username: "", 
        is_active: false,
        token: ""
      };


    default:
      throw Error('Unknown action.');
  }    
}
