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
      //ESTADO PARA GUARDAR TODO LOS LIBROS
      showBooks: [],
      //ESTADO PARA GUARDAR LIBROS INTERCAMBIO
      exchangeBooks: [],
      //ESTADO PARA GUARDAR LIBROS VENTA
      saleBooks: [],
      //ESTADO PARA GUARDAR MIS LIBROS EN VENTA
      mySaleBooks: [],
      //ESTADO PARA GUARDAR MIS LIBROS EN INTERCAMBIO
      myExchangeBooks: [],
      //ESTADO PARA GUARDAR DETALLE DE UN LIBRO
      oneBook: [],
      //ESTADOS INPUT REGISTRO LIBRO CON FOTOS
      title: [],
      author: [],
      cathegory: [],
      number_of_pages: [],
      description: [],
      price: [],
      photo: null,
      type: [],
      //ESTADOS INPUT REGISTRO USUARIO CON FOTOS
      name: [],
      lastname: [],
      email: [],
      password: [],
      rep_password: [],
      region: [],
      city: [],
      userImage: null,
      // ESTADOS MENSAJE ENTRE USUARIOS
      sender_id: [],
      receiver_id: [],
      book_id: [],
      message_text: [],
      ///CHAT ENTRE USUARIOS
      buyChat: [],
      ///TODOS LOS USUARIOS
      allMessagesUser: [],
      booksIdBuy: [],
      ///LIBROS QUE COMPRASTE
      myBooks: [],

      iPosition: [],
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
          const { url, newBook, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : "";
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: JSON.stringify(newBook),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
        //agregar verificación de usuario
        getActions().saveBook(navigate);
      },
      ////FUNC LISTA DE LIBROS
      getLibros: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/all_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ showBooks: data });
            console.log("conseguí los libros");
            console.log("showBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////LISTA LIBROS EN INTERCAMBIO
      getExchangeBooks: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/exchange_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ exchangeBooks: data });
            console.log("libros intercambio");
            console.log("exchangeBook:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////LISTA LIBROS EN VENTA
      getSaleBooks: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/sale_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ saleBooks: data });
            console.log("libros venta");
            console.log("saleBook:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///MIS LIBROS EN VENTA
      getMySaleBooks: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/sale_books/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ mySaleBooks: data });
            console.log("mis libros en venta");
            console.log("mySalesBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///MIS LIBROS EN INTERCAMBIO
      getMyExchangeBooks: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/exchange_books/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ myExchangeBooks: data });
            console.log("mis libros en intercambio");
            console.log("myExchangeBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////FUNC DETALLE UN LIBRO
      getOneBook: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/book_details/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ oneBook: data });
            console.log("tengo el libro");
            console.log("oneBook:", data);
          })
          .catch((error) => console.log("error", error));
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
            alert("Usuario No registrado / Correo o Contraseña incorrectas");
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
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

      ///POST LIBRO CON FOTOS
      postBook: async (formData, navigate) => {
        try {
          const { url, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : "";
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.text())
            .then((result) => {
              navigate("/");
              getActions().getLibros();
              console.log(result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      ///SUBMIT FORM LIBRO CON FOTO
      submitBookImage: (e, navigate) => {
        try {
          e.preventDefault();
          const {
            title,
            author,
            cathegory,
            number_of_pages,
            description,
            price,
            photo,
            type,
          } = getStore();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("author", author);
          formData.append("cathegory", cathegory);
          formData.append("number_of_pages", number_of_pages);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("photo", photo);
          formData.append("type", type);
          getActions().postBook(formData, navigate);
          e.target.reset();

          console.log("SUBMIT");
        } catch (error) {
          console.log(error);
        }
      },

      ///GUARDAR VALOR INPUT IMAGEN LIBRO
      inputBookImage: (file) => {
        setStore({ photo: file });
      },

      ///GUARDAR OTROS CAMPOS DEL INPUT
      inputBookValue: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value,
        });
      },

      //REGISTRO DE USUARIO CON FOTO

      ///GUARDAR VALOR INPUT IMAGEN USUARIO
      inputUserImage: (file) => {
        setStore({ userImage: file });
      },

      ///GUARDAR OTROS CAMPOS DEL INPUT USUARIO
      inputUserValue: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value,
        });
      },

      ///SUBMIT FORM REGISTRO DE USUARIO CON FOTO
      submitUserImage: (e, navigate) => {
        try {
          e.preventDefault();
          const {
            name,
            lastname,
            email,
            password,
            rep_password,
            region,
            userImage,
          } = getStore();
          const formData = new FormData();

          if (getStore().password === getStore().rep_password) {
            formData.append("name", name);
            formData.append("lastname", lastname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("rep_password", rep_password);
            formData.append("region", region);
            formData.append("userImage", userImage);
            getActions().postUser(formData, navigate);
            e.target.reset();
            console.log("SUBMIT USER REGISTER");
          } else {
            alert("las contraseñas no coinciden");
          }
        } catch (error) {
          console.log(error);
        }
      },

      ///POST USUARIO CON FOTOS
      postUser: async (formData, navigate) => {
        try {
          const { url } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.text())
            .then((result) => {
              navigate("/login");
              console.log(result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },
      ///CAMBIO DE DISPONIBILIDAD DE LIBRO
      putAvailableBook: async (id, navigate) => {
        try {
          var formdata = new FormData();
          formdata.append("available", "False");
          const { oneBook } = getStore();

          var requestOptions = {
            method: "PUT",
            body: formdata,
            redirect: "follow",
          };

          fetch(`http://localhost:3001/api/comprar/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              navigate("/");
              console.log("Cambiando disponibilidad");
              console.log(result);
            })
            .catch((error) => console.log("error", error));
        } catch (error) {
          console.log(error);
        }
      },

      ///ENVIO DE MENSAJE
      postMensaje: async () => {
        try {
          const { url, sender_id, receiver_id, book_id, message_text } =
            getStore();
          let infoMessage = { sender_id, receiver_id, book_id, message_text };
          const response = await fetch(`${url}/api/messages`, {
            method: "POST",
            body: JSON.stringify(infoMessage),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.text())
            .then((result) => {
              console.log("Mensaje creado:", result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      //GUARDA DATA EN PARAMETROS PARA EL MENSAJE
      inputMessage1: (sender_id, receiver_id, book_id, message_text) => {
        // Actualiza el estado global con los argumentos recibidos
        setStore({
          ...getStore(),
          sender_id: sender_id,
          receiver_id: receiver_id,
          book_id: book_id,
          message_text: message_text,
        });
        getActions().postMensaje();
        getActions().getMensajesLibro();
      },

      ///MUESTRO TODOS LOS MENSAJES POR USUARIO
      getAllMensajesUser: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/messages/sender/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ allMessagesUser: data });
            console.log("mensaje por usuario");
            console.log("allMessagesUser:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///TODO LOS MENSAJES POR LIBRO
      getMensajesLibro: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/messages/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ buyChat: data });
            console.log("mensaje por libro");
            console.log("buyChat:", data);
          })
          .catch((error) => console.log("error", error));
      },

      allBookIdBuyUser: () => {
        const { allMessagesUser } = getStore();
        const bookIds = allMessagesUser.map((e) => e.book_id);
        setStore({ booksIdBuy: bookIds });
      },

      getIPosition: (i) => {
        setStore({ iPosition: i });
      },

      inputTextArea: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value,
        });
      },
    },
  };
};

export default getState;

/* const getState = ({ getStore, getActions, setStore }) => {
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
      //ESTADO PARA GUARDAR TODO LOS LIBROS
      showBooks: [],
      //ESTADO PARA GUARDAR LIBROS INTERCAMBIO
      exchangeBooks: [],
      //ESTADO PARA GUARDAR LIBROS VENTA
      saleBooks: [],
      //ESTADO PARA GUARDAR MIS LIBROS EN VENTA
      mySaleBooks: [],
      //ESTADO PARA GUARDAR MIS LIBROS EN INTERCAMBIO
      myExchangeBooks: [],
      //ESTADO PARA GUARDAR DETALLE DE UN LIBRO
      oneBook: [],
      //ESTADOS INPUT REGISTRO LIBRO CON FOTOS
      title: [],
      author: [],
      cathegory: [],
      number_of_pages: [],
      description: [],
      price: [],
      photo: null,
      type: [],
      //ESTADOS INPUT REGISTRO USUARIO CON FOTOS
      name: [],
      lastname: [],
      email: [],
      password: [],
      rep_password: [],
      region: [],
      city: [],
      userImage: null,
      // ESTADOS MENSAJE ENTRE USUARIOS
      sender_id: [],
      receiver_id: [],
      book_id: [],
      message_text: [],
      ///CHAT ENTRE USUARIOS
      buyChat: [],
      ///TODOS LOS USUARIOS
      allMessagesUser: [],
      booksIdBuy: [],
      ///LIBROS QUE COMPRASTE
      myBooks: [],

      iPosition: [],
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
          const { url, newBook, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : "";
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: JSON.stringify(newBook),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
        //agregar verificación de usuario
        getActions().saveBook(navigate);
      },
      ////FUNC LISTA DE LIBROS
      getLibros: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/all_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ showBooks: data });
            console.log("conseguí los libros");
            console.log("showBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////LISTA LIBROS EN INTERCAMBIO
      getExchangeBooks: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/exchange_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ exchangeBooks: data });
            console.log("libros intercambio");
            console.log("exchangeBook:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////LISTA LIBROS EN VENTA
      getSaleBooks: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://localhost:3001/api/sale_books", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ saleBooks: data });
            console.log("libros venta");
            console.log("saleBook:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///MIS LIBROS EN VENTA
      getMySaleBooks: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/sale_books/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ mySaleBooks: data });
            console.log("mis libros en venta");
            console.log("mySalesBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///MIS LIBROS EN INTERCAMBIO
      getMyExchangeBooks: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/exchange_books/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ myExchangeBooks: data });
            console.log("mis libros en intercambio");
            console.log("myExchangeBooks:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ////FUNC DETALLE UN LIBRO
      getOneBook: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/book_details/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ oneBook: data });
            console.log("tengo el libro");
            console.log("oneBook:", data);
          })
          .catch((error) => console.log("error", error));
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
            alert("Usuario No registrado / Correo o Contraseña incorrectas");
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
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

      ///POST LIBRO CON FOTOS
      postBook: async (formData, navigate) => {
        try {
          const { url, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : "";
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.text())
            .then((result) => {
              navigate("/");
              getActions().getLibros();
              console.log(result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      ///SUBMIT FORM LIBRO CON FOTO
      submitBookImage: (e, navigate) => {
        try {
          e.preventDefault();
          const {
            title,
            author,
            cathegory,
            number_of_pages,
            description,
            price,
            photo,
            type,
          } = getStore();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("author", author);
          formData.append("cathegory", cathegory);
          formData.append("number_of_pages", number_of_pages);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("photo", photo);
          formData.append("type", type);
          getActions().postBook(formData, navigate);
          e.target.reset();

          console.log("SUBMIT");
        } catch (error) {
          console.log(error);
        }
      },

      ///GUARDAR VALOR INPUT IMAGEN LIBRO
      inputBookImage: (file) => {
        setStore({ photo: file });
      },

      ///GUARDAR OTROS CAMPOS DEL INPUT
      inputBookValue: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value,
        });
      },

      //REGISTRO DE USUARIO CON FOTO

      ///GUARDAR VALOR INPUT IMAGEN USUARIO
      inputUserImage: (file) => {
        setStore({ userImage: file });
      },

      ///GUARDAR OTROS CAMPOS DEL INPUT USUARIO
      inputUserValue: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value,
        });
      },

      ///SUBMIT FORM REGISTRO DE USUARIO CON FOTO
      submitUserImage: (e, navigate) => {
        try {
          e.preventDefault();
          const {
            name,
            lastname,
            email,
            password,
            rep_password,
            region,
            userImage,
          } = getStore();
          const formData = new FormData();

          if (getStore().password === getStore().rep_password) {
            formData.append("name", name);
            formData.append("lastname", lastname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("rep_password", rep_password);
            formData.append("region", region);
            formData.append("userImage", userImage);
            getActions().postUser(formData, navigate);
            e.target.reset();
            console.log("SUBMIT USER REGISTER");
          } else {
            alert("las contraseñas no coinciden");
          }
        } catch (error) {
          console.log(error);
        }
      },

      ///POST USUARIO CON FOTOS
      postUser: async (formData, navigate) => {
        try {
          const { url } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.text())
            .then((result) => {
              navigate("/login");
              console.log(result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },
      ///CAMBIO DE DISPONIBILIDAD DE LIBRO
      putAvailableBook: async (id, navigate) => {
        try {
          var formdata = new FormData();
          formdata.append("available", "False");
          const { oneBook } = getStore();

          var requestOptions = {
            method: "PUT",
            body: formdata,
            redirect: "follow",
          };

          fetch(`http://localhost:3001/api/comprar/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              navigate("/");
              console.log("Cambiando disponibilidad");
              console.log(result);
            })
            .catch((error) => console.log("error", error));
        } catch (error) {
          console.log(error);
        }
      },

      ///ENVIO DE MENSAJE
      postMensaje: async () => {
        try {
          const { url, sender_id, receiver_id, book_id, message_text } =
            getStore();
          let infoMessage = { sender_id, receiver_id, book_id, message_text };
          const response = await fetch(`${url}/api/messages`, {
            method: "POST",
            body: JSON.stringify(infoMessage),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.text())
            .then((result) => {
              console.log("Mensaje creado:", result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      //GUARDA DATA EN PARAMETROS PARA EL MENSAJE
      inputMessage1: (sender_id, receiver_id, book_id, message_text) => {
        // Actualiza el estado global con los argumentos recibidos
        setStore({
          ...getStore(),
          sender_id: sender_id,
          receiver_id: receiver_id,
          book_id: book_id,
          message_text: message_text,
        });
        getActions().postMensaje();
      },

      ///MUESTRO TODOS LOS MENSAJES POR USUARIO
      getAllMensajesUser: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/messages/sender/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ allMessagesUser: data });
            console.log("mensaje por usuario");
            console.log("allMessagesUser:", data);
          })
          .catch((error) => console.log("error", error));
      },

      ///TODO LOS MENSAJES POR LIBRO
      getMensajesLibro: (id) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`http://localhost:3001/api/messages/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setStore({ buyChat: data });
            console.log("mensaje por libro");
            console.log("buyChat:", data);
          })
          .catch((error) => console.log("error", error));
      },

      allBookIdBuyUser: () => {
        const { allMessagesUser } = getStore();
        const bookIds = allMessagesUser.map((e) => e.book_id);
        setStore({ booksIdBuy: bookIds });
      },

      getIPosition: (i) => {
        setStore({ iPosition: i });
      },
    },
  };
};

export default getState;
 */
