
import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// message: null,
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
			alquileres : [],
			ventas : [],
			auth : false
		},
		actions: {

			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					// console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			signup: async (firstName, lastName, email, password, phone, confpassword) => {

				try {
					let data = await axios.post(process.env.BACKEND_URL + "/api/signup", {

						"name": firstName,
						"lastname": lastName,
						"email": email,
						"phone_number": phone,
						"password": password,
						"is_admin": false

					})

					return true;

				} catch (error) {

					if (error.response.status === 404) {
						alert(error.response.data.msg)

					}
					return false;
				}

			},


			
			validToken: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/valid_token',
					{
						headers : {"Authorization" : "Bearer " + localStorage.getItem('token')}
					})
					setStore({ auth : true})
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
						// 	alert(error.response.data.msj)
						// }
						return false
					}
				},
				
				getPerfil: async () => {
					try {
						let data = await axios.get(process.env.BACKEND_URL + '/api/perfil',
						{
							headers : {"Authorization" : "Bearer " + localStorage.getItem('token')}
						})
						console.log(data);
						return true
					} catch (error) {
						console.log(error);
						// if (error.response.status === 404) {
							// 	alert(error.response.data.msj)
							// }
							return false
						}
					},
					
					login: async (email, password) => {
						try {
							let data = await axios.post(process.env.BACKEND_URL + '/api/login',
								{
									"email": email,
									"password": password
								})
							console.log(data);
							localStorage.setItem("token", data.data.access_token)
							setStore({ auth : true})
							return true
						} catch (error) {
							console.log(error);
							if (error.response.status === 404) {
								alert(error.response.data.msg)
							}
							return false
						}
					},

					logout: async () => {
						localStorage.removeItem('token')
						setStore({ auth : false})
					},

			getAlquileres: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/rent')
					setStore({ alquileres: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}
			},

			getVentas: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/sell')
					setStore({ ventas: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}
			}

		}
	}
};


export default getState;
