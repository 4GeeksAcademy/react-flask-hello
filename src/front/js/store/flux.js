const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			login: async (email, password) => {
			  const actions = getActions()
			  const data = await api.login(email, password)
			  setStore({ user: data.user, token: data.token })
			  actions.getFavorites()
			  if (!data.user.is_admin) localStorage.setItem('myToken', data.token)
			  return data
			},
 
			signup: async (
			  email,
			  password,
			  first_name,
			  last_name,
			  phone,
			  location
			) => {
			  const response = await api.signup(
				email,
				password,
				first_name,
				last_name,
				phone,
				location
			  )
			  return response
			},
	},
			getMessage: async () => {
				let actions=getActions()
				try{
					// fetching data from the backend

					const data = actions.APIfetch("/hello")
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
			},
			APIfetch: async (endpoint,method="GET",body=null)=>{
				let params={method}
				if (body!=null){
					params.headers={
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin":"*"
					}
					params.body=JSON.stringify(body) 
				}
				let res=await fetch(process.env.BACKEND_URL+"/api"+endpoint,params)
				if (!res.ok){
					console.error(res.statusText)
					return ({error:res.statusText})
				}
				let json=res.json()
				return json
			}
		}
	};


export default getState;