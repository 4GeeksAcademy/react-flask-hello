

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			BACKEND_URL: process.env.BACKEND_URL,
			token: null,
			message: null,
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token")
				console.log ("Application opened. Syncing the sessionsStorage token.")
				if ( token && token != "" && token != undefined) setStore ({ token: token })
			},

			logout: () => {
				sessionStorage.removeItem("token")
				console.log ("Logging user out")
				setStore ({ token: null })
			},

			logOut: () => {
				const token = sessionStorage.removeItem("token")
				console.log ("Logging the user out.")
				setStore ({ token: null })
			},

			login: async  (email, password) => {
				console.log(email, password)
				const opts = {
					method: 'POST',
					headers: {
					  "Content-Type": "application/json",
					}, 
					body: JSON.stringify ({
					  email : email,
					  password: password
					})
				  } 
				
				  try {
					  const resp = await  fetch (`${getStore().BACKEND_URL}/api/login`, opts)
						if (resp.status !== 200) {
						alert ("There has been an error !")  
						return false
					  }
	
					  const data = await resp.json()
					  console.log ("This came from the backend.", data)
					  sessionStorage.setItem("token", data.access_token)  
					  setStore ({ token : data.access_token })
					  return true;
				  }
				  catch (error) {
					console.log("There has been an error logging in.")
					console.log(error)
				}

				
			} ,

			getMessage: async () => {

				const store = getStore();
				const opts = {
					 headers: {
						"Authorization" : "Bearer" + store.token
					 }
				}

				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", opts)
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
