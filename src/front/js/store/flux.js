const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userInfo: null,
			userEvent: [],
			message: null,
			modalmsje: [
				{
					boton: "Click",
					header: "headerok",
					body: "bodyok",
					footer: "footerok"
				}
			]
		},
		actions: {
			updateProfileImage: async (newImageUrl) => {
				try {
				  const { apiFetchProtected } = getActions();
		  
				  // Hace una solicitud al servidor para actualizar la imagen de perfil
				  const resp = await apiFetchProtected("/updateimage", "POST", { newImageUrl });
		  
				  if (resp.code === 200) {
					// La imagen de perfil se actualizó con éxito en el servidor
					// Actualiza el estado global con la nueva URL de la imagen
					console.log('la respuesta es' + resp)
					/*setStore((prevStore) => ({
					  ...prevStore,
					  userInfo: {
						...prevStore.userInfo,
						profileImage: newImageUrl,
					  },
					})); */
				  } else {

					// Maneja el caso en el que la API de actualización de la imagen de perfil devuelva un código de error
					console.error("Error al actualizar la imagen de perfil:", resp);
					// Puedes mostrar un mensaje de error o realizar otra acción aquí
				  }
		  
				  return resp;
				} catch (error) {
				  console.error("Error al actualizar la imagen:", error);
				  // Maneja el caso en el que ocurra un error en la llamada a la API
				  // Puedes mostrar un mensaje de error o realizar otra acción aquí
				}
			  },
			apiFetchPublic: async(endpoint, method="GET", body=null)=>{
				try{
					var request
					if (method=="GET"){
						request = fetch(process.env.BACKEND_URL + "/api" + endpoint)
					} else {
						//objeto params con lo necesario para la petición que no es get
						const params={
							method,
							headers:{
								"Content-Type":"application/json",
								"Access-Control-Allow-Origin": "*"

							}
						}
						//si hay body lo agregamos a los params
						if (body) params.body = JSON.stringify(body)
						request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					}
					//hacemos la petición
					const resp = await request
					//obtenemos los datos de la petición
					const data = await resp.json()
					console.log("PRUEBA_fetchpublic"+ JSON.stringify(data)+ resp.status)
					return {code: resp.status, data}
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			apiFetchProtected: async(endpoint, method="GET", body=null)=>{
				try{
					//objeto params con lo necesario para la petición que no es get
					//incluido token en encabezado de autorización
					const {accessToken} = getStore()
					if (!accessToken || accessToken==null){
						return "No token"
					}
					const params={
						method,
						headers:{
							"Authorization": "Bearer " + accessToken,
							"Access-Control-Allow-Origin": "*"
						}
					}
					//si hay body lo agregamos a los params
					if (body) {
						params.headers["Content-Type"]= "application/json",
						params.body = JSON.stringify(body)
					}
					//hacemos la petición
					const resp = await fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					//obtenemos los datos de la petición
					const data = await resp.json()
					console.log("PRUEBA_fetchprotected"+ JSON.stringify(data)+ resp.status)
					return {code: resp.status, data}
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			loadTokens:()=>{
				//traer el token del almacenamiento local
				let token = localStorage.getItem("accessToken")
				setStore({accessToken:token})
			},
			login:async(email, password)=>{
				try{
					const {apiFetchPublic} = getActions()
					//hacemos la petición
					//trae de la API el code(resp.status) y data (mensaje y token)
					//es decir, lo que regresa la función apiFetchPublic()
					const resp = await apiFetchPublic("/login", "POST", {email, password})
					if (resp.code==200){
						//si no hubo error agrego la data de API a mis variables *****
						const {message, token} = resp.data
						//guardamos token en almacenamiento local
						localStorage.setItem("accessToken", token)
						//guardamos el token en el store
						setStore ({accessToken:token})
					} else {
						//borramos el token 
						console.log("borramos el token")
						localStorage.removeItem("accessToken")
					}
					return resp
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			signup:async(email, password, name)=>{
				try{
					const {apiFetchPublic} = getActions()
					//hacemos la petición
					//trae de la API el code(resp.status) y data (mensaje y token)
					//es decir, lo que regresa la función apiFetchPublic()
					const resp = await apiFetchPublic("/signup", "POST", {email, password, name})
					/*if (resp.code==200){
						//si no hubo error agrego la data de API a mis variables *****
						const {message, token} = resp.data
						//guardamos token en almacenamiento local
						localStorage.setItem("accessToken", token)
						//guardamos el token en el store
						setStore ({accessToken:token})
					} else {
						//borramos el token 
						console.log("borramos el token")
						localStorage.removeItem("accessToken")
					}*/
					console.log("PRUEBA_signup", JSON.stringify(resp))
					return resp
				} catch(error){
					console.log("Error al solicitar los datos")
				}
			},
			getUserInfo: async()=>{
				try{
					const {apiFetchProtected} = getActions()
					const resp = await apiFetchProtected("/helloprotected")
					///////////// extra
					console.log("PRUEBA_getuserinfo", resp)
					if (resp.code==200){
						setStore({userInfo:resp.data})
						return "Ok"
					}
					//si el token expiró
					//borramos token del almacenamiento local y del store
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						alert("Sesión expirada")
					}
					return "Sesión expirada"
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const {apiFetchPublic} = getActions()
					const data = await apiFetchPublic("/hello")
					console.log("DATA: ", data)
					setStore({ message: data.data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			dataModal: (dataMsje) => {
				const store = getStore();
				store.modalmsje.splice(0, 1, dataMsje);
				setStore(store);
			},
			newEvent:async(eventData)=>{
				try{
					const {apiFetchProtected} = getActions()
					//hacemos la petición
					//trae de la API el code(resp.status) y data
					//es decir, lo que regresa la función apiFetchPublic()
					console.log("DATOSDELEVENTO: ", {eventData})
					const resp = await apiFetchProtected("/newevent", "POST", {eventData})
					console.log("PRUEBA_newEvent", JSON.stringify(resp))
					if (resp.code==201){
						//setStore({userInfo:resp.data})
						const store = getStore();
						store.userEvent.push(resp.data);
						setStore(store);
						return "Ok"
					}
					//si el token expiró
					//borramos token del almacenamiento local y del store
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						alert("Sesión expirada")
					}
					return "Sesión expirada"
					//return resp
				} catch(error){
					console.log("Error al crear el evento")
				}
			},
			editEvent:async(eventData, index)=>{
				try{
					const {apiFetchProtected} = getActions()
					console.log("DATOSDELEVENTO: ", {eventData})
					const resp = await apiFetchProtected("/editevent", "POST", {eventData})
					console.log("PRUEBA_editEvent", JSON.stringify(resp))
					if (resp.code==201){
						//setStore({userInfo:resp.data})
						const store = getStore();
						store.userEvent.splice(index, 1, resp.data);
						setStore(store);
						return "Ok"
					}
					//si el token expiró
					//borramos token del almacenamiento local y del store
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						alert("Sesión expirada")
					}
					return "Sesión expirada"
					//return resp
				} catch(error){
					console.log("Error al crear el evento")
				}
			},
			deleteEvent:async(eventId, index)=>{
				try{
					const {apiFetchProtected} = getActions()
					console.log("Id del evento a borrar: ", eventId)
					const resp = await apiFetchProtected("/deleteevent", "POST", {eventId})
					console.log("PRUEBA_DeleteEvent", JSON.stringify(resp))
					//si el token expiró borramos token del almacenamiento local y del store
					if (resp.code==201){
						const store = getStore();
						store.userEvent.splice(index, 1);
						setStore(store);
						alert("Evento eliminado exitosamente");
						return "Ok"
					}
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						return ("Sesión expirada")
					}
					return "Sesión expirada"
					//return resp
				} catch(error){
					console.log("Error al crear el evento")
				}
			},
			getUserEvent: async()=>{
				try{
					const {apiFetchProtected} = getActions()
					const resp = await apiFetchProtected("/loadevents")
					///////////// extra
					console.log("PRUEBA_getuserEvent", resp)
					if (resp.code==200){
						//setStore({userEvent:resp.data["eventos"]})
						setStore({userEvent:resp.data.eventos})
						return "Ok"
					}
					//si el token expiró
					//borramos token del almacenamiento local y del store
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						alert("Sesión expirada")
					}
					return "Sesión expirada"
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
      		},
			logout: async () => {
				const { apiFetchProtected } = getActions();

				try {
					// Llama a la API de logout protegida utilizando apiFetchProtected
					const resp = await apiFetchProtected("/logout", "POST"); 

					if (resp.code === 200) {
						// Borra el token de acceso del almacenamiento local
						localStorage.removeItem("accessToken");

						// Borra el token de acceso del estado global
						const store = getStore();
						store.accessToken = null;
						setStore(store);

						// Redirige al usuario a la página de inicio de sesión
						navigate('/'); 
					} else {
						// Maneja el caso en el que la API de logout devuelva un código de error
						console.error("Error al realizar logout:", resp);
						// Puedes mostrar un mensaje de error o realizar otra acción aquí
					}
				} catch (error) {
					console.error("Error al realizar logout:", error);
					// Maneja el caso en el que ocurra un error en la llamada a la API
					// Puedes mostrar un mensaje de error o realizar otra acción aquí
				}
			}
		}
	};
};

export default getState;