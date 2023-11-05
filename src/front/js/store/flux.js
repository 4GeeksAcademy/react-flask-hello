const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      //INICIO DE SESIÓN
      email: "",
      password: "",
      currentUser: null,

      //VARIABLE PARA GUARDAR LOS USUARIOS QUE SE CREAN
      users: [],

      //URL DE LA API
      url: "http://localhost:3001",

      message: null,

      //NAVBAR    
      showBooks: [],      //TODOS LOS LIBROS DISPONILBES (VENTA E INTERCAMBIO)
      exchangeBooks: [],  //TODOS LOS LIBROS PARA INTERCAMBIO DISPONIBLES
      saleBooks: [],      //TODOS LOS LIBROS PARA VENTA DISPONIBLES

      //PROFILE      
      mySaleBooks: [],      //MIS LIBROS PARA VENTA
      myExchangeBooks: [],  //MIS LIBROS PARA INTERCAMBIO
      myBooksPurchased: [], //MIS LIBROS COMPRADOS
      myBooksSold: [],      //MIS LIBROS VENDIDOS
      myOneBook: [],        //DETALLE DE MI LIBRO COMPRADO

      //CHAT DE COMPRA VENTA E INTERCAMBIO
      myChat: [],

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

      ///ESTADOS DE COMPRA
      purchase_id: [],
      seller_id: [],
      buyer_id: [],
      purchase_date: [],

      //ESTADOS PARA CHAT
      idForChat: "",
      idForPurchasedChat: "",
    },

    actions: {
      //PUBLICACIÓN DE LIBRO    
      ////FUNC LISTA DE LIBROS DISPONIBLES VENTA E INTERCAMBIO  
      getLibros: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://localhost:3001/api/all_books", requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ showBooks: data });
            console.log("conseguí los libros");
            console.log("showBooks:", data);
          })
          .catch(error => console.log('error', error));
      },

      ////LISTA LIBROS EN INTERCAMBIO  
      getExchangeBooks: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://localhost:3001/api/exchange_books", requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ exchangeBooks: data });
            console.log("libros intercambio");
            console.log("exchangeBook:", data);
          })
          .catch(error => console.log('error', error));
      },

      ////LISTA LIBROS EN VENTA  
      getSaleBooks: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://localhost:3001/api/sale_books", requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ saleBooks: data });
            console.log("libros venta");
            console.log("saleBook:", data);
          })
          .catch(error => console.log('error', error));
      },

      ///MIS LIBROS EN VENTA
      getMySaleBooks: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/sale_books/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ mySaleBooks: data });
            console.log("mis libros en venta");
            console.log("mySalesBooks:", data);
          })
          .catch(error => console.log('error', error));
      },

      ///MIS LIBROS EN INTERCAMBIO
      getMyExchangeBooks: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/exchange_books/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ myExchangeBooks: data });
            console.log("mis libros en intercambio");
            console.log("myExchangeBooks:", data);
          })
          .catch(error => console.log('error', error));
      },

      ////FUNC DETALLE UN LIBRO
      getOneBook: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/book_details/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {


            setStore({ oneBook: data });
            console.log("tengo el libro");
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
          const token = currentUser ? currentUser.access_token : '';
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: formData,
            headers: {
              "Authorization": `Bearer ${token}`
            },
          })
            .then(response => response.text())
            .then(result => {
              navigate("/");
              getActions().getLibros();
              console.log(result)
            })
            .catch(error => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      ///SUBMIT FORM LIBRO CON FOTO
      submitBookImage: (e, navigate) => {
        try {
          e.preventDefault();
          const { title, author, cathegory, number_of_pages, description, price, photo, type } = getStore();
          const formData = new FormData();
          formData.append('title', title);
          formData.append('author', author);
          formData.append('cathegory', cathegory);
          formData.append('number_of_pages', number_of_pages);
          formData.append('description', description);
          formData.append('photo', photo);
          formData.append('type', type);

          // Verificar si price tiene un valor antes de agregarlo al FormData
          if (price) {
            formData.append('price', price);
          } else {
            formData.append('price', null);
          }

          getActions().postBook(formData, navigate);
          setStore({
            title: "",
            author: "",
            cathegory: "",
            number_of_pages: "",
            description: "",
            price: "",
            type: "",
            userImage: null, // Establecer la imagen en null
          });
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
          [name]: value
        });
      },

      ////EDITAR UN LIBRO
      updateBook: async (id, editedBook, navigate) => {
        try {
          const { url, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : '';
          const formData = new FormData();

          // Agrega los campos editados al FormData
          for (const key in editedBook) {
            formData.append(key, editedBook[key]);
          }

          const response = await fetch(`${url}/api/edit_book/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
              "Authorization": `Bearer ${token}`
            },
          })
            .then(response => response.text())
            .then(result => {
              navigate("/");
              getActions().getLibros();
              console.log(result);
            })
            .catch(error => alert(error));
        } catch (error) {
          console.log(error);
        }
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
          [name]: value
        });
      },

      ///SUBMIT FORM REGISTRO DE USUARIO CON FOTO
      submitUserImage: (e, navigate) => {
        try {
          e.preventDefault()
          const { name, lastname, email, password, rep_password, region, userImage } = getStore();
          const formData = new FormData()

          if (getStore().password === getStore().rep_password) {
            formData.append('name', name)
            formData.append('lastname', lastname)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('rep_password', rep_password)
            formData.append('region', region)
            formData.append('userImage', userImage)
            getActions().postUser(formData, navigate)
            setStore({
              name: "",
              lastname: "",
              email: "",
              password: "",
              rep_password: "",
              region: "",
              userImage: null,
            });
            e.target.reset()
            console.log("SUBMIT USER REGISTER")
          } else {
            alert("las contraseñas no coinciden");
          }

        } catch (error) {
          console.log(error)
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
            .then(response => response.text())
            .then(result => {
              navigate("/login");
              console.log(result)
            })
            .catch(error => alert(error));
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
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
          };
          fetch(`http://localhost:3001/api/comprar/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
              navigate("/");
              console.log("Cambiando disponibilidad");
              console.log(result)
            })
            .catch(error => console.log('error', error));
        } catch (error) {
          console.log(error);
        }
      },

      ///ENVIO DE MENSAJE
      postMensaje: async () => {
        try {
          const { url, sender_id, receiver_id, book_id, message_text, purchase_id } = getStore();
          let infoMessage = { sender_id, receiver_id, book_id, message_text, purchase_id };
          const response = await fetch(`${url}/api/messages`, {
            method: "POST",
            body: JSON.stringify(infoMessage),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(response => response.text())
            .then(result => {
              getActions().getMyOnePurchasedBook(getStore().idForPurchasedChat);
              getActions().getMyMessageForBook(getStore().idForChat);
              console.log('Mensaje creado:', result);
            })
            .catch(error => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      //GUARDA DATA EN PARAMETROS PARA EL MENSAJE
      inputMessage1: (sender_id, receiver_id, book_id, message_text, purchase_id, idForPurchasedChat, idForChat, e) => {
        // Actualiza el estado global con los argumentos recibidos
        e.preventDefault();
        setStore({
          ...getStore(),
          sender_id: sender_id,
          receiver_id: receiver_id,
          book_id: book_id,
          message_text: message_text,
          purchase_id: purchase_id,
          idForPurchasedChat: idForPurchasedChat,
          idForChat: idForChat,
        });
        getActions().postMensaje();
        setStore({
          message_text: "",
        });
      },

      ///CAPTURA MENSAJE
      inputTextArea: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value
        });
      },

      ///ENVIO DE MENSAJE
      postShpopping: async () => {
        try {
          const { url, seller_id, buyer_id, book_id, purchase_date } = getStore();
          let infoShopping = { seller_id, buyer_id, purchase_date, book_id };
          const response = await fetch(`${url}/api/purchases`, {
            method: "POST",
            body: JSON.stringify(infoShopping),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(response => response.text())
            .then(result => {
              console.log('Compra creada:', result);
            })
            .catch(error => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      ///CAPTURA INFO PARA LA COMPRA     
      inputShopping: (seller_id, buyer_id, book_id, purchase_date) => {
        setStore({
          ...getStore(),
          seller_id: seller_id,
          buyer_id: buyer_id,
          book_id: book_id,
          purchase_date: purchase_date
        });
        getActions().postShpopping();
      },

      ///COMPRAS POR USUARIO
      getAllMyPurchasedBooks: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/purchases/buyer/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ myBooksPurchased: data });
            console.log("myBooksPurchased:", data);
          })
          .catch(error => console.log('error', error));
      },

      //VENTAS POR USUARIOS
      getAllMySoldBooks: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/purchases/seller/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ myBooksSold: data });
            console.log("myBooksSold:", data);
          })
          .catch(error => console.log('error', error));
      },

      //DETALLE DE UNA COMPRA POR ID LIBRO
      getMyOnePurchasedBook: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/purchases/book/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ myOneBook: data });
            console.log("myOneBook:", data);
          })
          .catch(error => console.log('error', error));
      },

      //MENSAJES POR VENTA
      getMyMessageForBook: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/messages/purchase/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ myChat: data });
            console.log("myChat:", data);
          })
          .catch(error => console.log('error', error));
      },



    },
  };
};


export default getState;
