const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      //VARIABLES PARA GUARDAR EL INICIO DE SESIÓN
      email: "",
      password: "",
      //VARIABLE PARA GUARDAR LOS USUARIOS QUE SE CREAN
      users: [],
      //SE GUARDA EL REGISTRO DE USUARIO
      newUser: {
        id: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        rep_password: "",
        region: "",
      },
      //URL DE LA API
      url: "http://localhost:3001",

      message: null,
      //USUARIO QUE INICIO SESIÓN
      currentUser: null,
      //VARIABLE PARA PUBLICAR EL NUEVO LIBRO
      newBook: {
        id: "",
        title: "",
        author: "",
        cathegory: "",
        number_of_pages: "",
        description: "",
        type: "",
        price: "",
        photo: "",
      },
      //VARIABLE PARA GUARDAR LISTA DE LIBROS
      showBook: [],
      //VARIABLE PARA GUARDAR DETALLE DE UN LIBRO
      oneBook: [],
    },

    actions: {
      //PUBLICACIÓN DE LIBRO      
      ////FUNC. GUARDAR VALOR INPUT
      handleChangeBook: (e) => {
        const { newBook } = getStore();
        e.preventDefault();
        newBook[e.target.name] = e.target.value;
        setStore({ newBook });
        console.log("newBook:", getStore().newBook);
      },
      ////FUNC. PARA GUARDAR LIBRO
      saveBook: async (navigate) => {
        try {
          const { url, newBook } = getStore();
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: JSON.stringify(newBook),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
      ////FUNC. ENVIAR REGISTRO
      submitBook: (e, navigate) => {
        e.preventDefault();
        getActions().saveBook(navigate);
      },
      ////FUNC LISTA DE LIBROS  
      getLibros: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3001/api/libroVenta", requestOptions)
        .then(response => response.json())
        .then(data => {
          getStore().showBook = data;
          console.log("conseguí los libros");
          console.log("showBook:", data);
        })
        .catch(error => console.log('error', error));
      },


      

      ////FUNC DETALLE UN LIBRO
      getOneBook: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3001/api/detalle-libro/${id}", requestOptions)
        .then(response => response.json())
        .then(data => {
          getStore().oneBook = data;
          console.log("conseguí el libro");
          console.log("oneBook:", data);
        })
        .catch(error => console.log('error', error));
      },

      

      //---------< funcion para  registro  de usuario >----------------->

      handleChangeRegister: (e) => {
        const { newUser } = getStore();
        e.preventDefault();
        newUser[e.target.name] = e.target.value;
        setStore({ newUser });
        console.log("newUser:", getStore().newUser);
      },

      submitRegister: (e, navigate) => {
        e.preventDefault();

        if (getStore().newUser.password === getStore().newUser.rep_password) {
          getActions().saveUser(navigate);
        } else {
          alert("las contraseñas no coinciden");
        }
      },

      saveUser: async (navigate) => {
        try {
          const { url, newUser } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      },
      //----------< Login usuario >---------------------------------------------->


      //---- funcion para  login  de usuario------------------------------------------->
      handleSubmitLogin: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password, currentUser };
          const response = await fetch(`${url}/api/login`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.access_token) {
            setStore({ currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/profile");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
      },

      searchLibros: (title, callback) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3001/api/books?q="+title, requestOptions)
        .then(response => response.json())
        .then(data => {
          getStore().showBook = data.results;
          console.log("conseguí los libros");
          callback(data.results)
          console.log("showBook:", data);
        })
        .catch(error => console.log('error', error));
      },

      handleChangeLogin: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },
      // VERIFICA QUE EXISTA EL USUARIO 
      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },

      logout: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
      },
    },
  };
};


export default getState;
