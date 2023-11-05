const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				}
			],
			pets: [],
			singlePet: [],
      signup: [],
      signupKeeper: []
		},
		actions: {
			//Get all pets from the database, including the owners inside the pet object.
			getPets: async () => {
				const {pets} = getStore()
				try {
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets`).then(resp => {
						if (!resp.ok){
							console.error(resp.status+ ": " + resp.statusText)
						}
						return resp.json()
					}).then(data=> {
						console.log(data)
						setStore({pets:data})
					})
				} catch (error) {
					console.error(error)
				}
			},
			//Get pets by owner id
			getOwnerPets: async (owner_id) => {
				const {pets} = getStore()
				try {
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets/owner/${owner_id}`).then(resp => {
						if (!resp.ok){
							if (resp.status == 404){
								throw Error({"msg":"User does not exist"})
							}
							console.error(resp.status+ ": " + resp.statusText)
						}
						return resp.json()
					}).then(data=> {
						console.log(data)
						setStore({pets:data})
						return "ok"
					})
				} catch (error) {
					console.error(error)
				}
			},
			createPet: async (obj) => {
				try {
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets`, {
						method: 'POST',
						body: JSON.stringify(obj),
						headers:{
							'Content-Type':'application/json'
						}
					}).then(response=>{
						if(!response.ok){
							throw Error(response.status+": "+response.statusText)
						}
						return response.json()
					}).then(data=>{
						console.log("Successfully created pet: "+data)
						getActions().getOwnerPets(obj.owner_id)
					})
				} catch (error) {
					console.error(error)
				}
			},
			updatePet: async (obj)=>{
				try {
					//Use email as contact id
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets/${obj.id}`, {
						method: 'PUT',
						body: JSON.stringify(obj),
						headers:{
							'Content-Type':'application/json'
						}
					}).then(response=>{
						if(!response.ok){throw Error (response.status+": "+response.statusText)}
						return response.json()
					}).then(data=>{
						console.log("Successfully updated pet: "+data)
						//Routes returns updated pet
						getActions().getOwnerPets(obj.owner_id)
					})
				} catch (error) {
					console.error(error)
				}
			},
			getPet: async (id)=>{
				const {singlePet} = getStore();
				try {
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets/${id}`).then(resp => {
						if (!resp.ok){
							console.error(resp.status+ ": " + resp.statusText)
						}
						return resp.json()
					}).then(data=> {
						console.log(data)
						setStore({singlePet:data})
					})
				} catch (error) {
					console.error(error)
				}
			},
			deletePet:async (obj)=>{
				try{
					fetch(`https://upgraded-cod-464w4v5prv43vrg-3001.app.github.dev/api/pets/${obj.id}`, {
						method: 'DELETE'
					})
					.then(response=>{
						if(!response.ok){
							if (response.status == 404){ throw Error("No pet associated with ID provided") }
							else{ throw Error(response.status +": "+ response.statusText) }
						}
						return response.json()
					}).then(data=>{
						console.log({data}+" Succesfully deleted pet from server")
						//setStore({pets:data})
						getActions().getOwnerPets(obj.owner_id)
					})
				} catch (error) {
					console.error({error})
					return
				}
			},

      apiFetch: async (endpoint, method = "GET", body = null) => {
        var request;
        if (method == "GET") {
          request = await fetch(process.env.BACKEND_URL + "/api" + endpoint);
        } else {
          const params = {
            method,
            headers: {
              "Content-Type": "application/json",
            },
          };
          if (body) params.body = JSON.stringify(body);
          request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params);
        }
        const resp = await request;
        const data = await resp.json();
        return { code: resp.status, data };
      },

      signup: async (first_name, last_name, email, password) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch("/signup", "POST", {
          last_name,
          first_name,
          email,
          password,
        });
        if (resp.code != 201) {
          console.error("Signup error");
          return resp;
        }
      },

      signupKeeper: async (
        first_name,
        last_name,
        email,
        password,
        hourly_pay
      ) => {
        const { apiFetch } = getActions();
        const resp = await apiFetch("/signup/keeper", "POST", {
          last_name,
          first_name,
          email,
          password,
          hourly_pay,
        });
        if (resp.code != 201) {
          console.error("Signup error");
          return resp;
        }
      },

      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
    },
  };
};

export default getState;
