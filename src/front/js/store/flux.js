import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth:false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			







			// empieza cecilia línea 30
			login: async (email, password) => {
				try {
					let data = await axios.post(process.env.BACKEND_URL + '/api/login',{
						"email":email,
						"password":password
					})
					console.log(data);
					localStorage.setItem("token", data.data.access_token);
					setStore({auth:true})
					return true;
				} catch (error) {
					console.log(error)
					return false;
				}
			},
			




			
			// empieza juan línea 50 -  Falta agregar REPEATPASSWORD!!!!!
			SignupUser: async (name, last_name, email, password, is_active) => {
				console.log("FLUX USER SIGNUP: ", email, " >>>> ", password);
			
				try {
					// if (password === repeatPassword) {
						
					
						let data = await axios.post("https://effective-fortnight-pjrr4wjg9jrghrj96-3001.app.github.dev/api/signup",
						{
							name: name, 
							last_name: last_name,
							email: email,
							password: password,
							is_active: is_active
						}
						)
						console.log(data);
						setStore({ auth: true });
						localStorage.setItem("token", data.data.access_token); 
					
				// }
				// else {alert('Las contraseñas no coiciden')}
					
				} catch (error) {
					console.log(error);
					setStore({ auth: false });
				}
			},
			logout: () => {
				console.log("Funciona")
				localStorage.removeItem("token")
				setStore({auth:false})
			},

			/* empieza código de cecilia valid-token */
			validToken: async () => {
				let token = localStorage.getItem("token")
				try {
					if (token) {
						let data = await axios.get(process.env.BACKEND_URL +'/valid-token',{
							"headers":{'Authorization': 'Bearer '+token}
						})
						if (data.status === 200) {
							console.log(data.status);
							setStore({auth:true})
							return true;
						}
					}else {
						setStore({auth:false})
							return false;
					}
					
				} catch (error) {
					console.log("errorrrrr:" + error)
					if (error.response.status === 401) {
						setStore({auth:false})
					}
					return false;
				}
			},
			


			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			}
		}
	};
};

export default getState;
