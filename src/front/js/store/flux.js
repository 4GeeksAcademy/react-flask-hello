
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			liters: [],
			location: [],
			start_time: [],
			finish_time: [],
			total_time: [],
			total_days: [],
			total_liters: [],
			average_time: [],
			average_liters: [],
			total_users: [],
			total_impact_time: [],
			total_impact_liters: []


		},
		actions: {

			setStartTime: (start_time) => {
				const store = getStore()
				setStore({ ...store, start_time: new Date().toISOString() });
			},


			setFinishTime: (finish_time) => {
				const store = getStore()
				setStore({ ...store, finish_time: new Date().toISOString() });
			},

			setNewLiters: (value) => {
				const store = getStore()
				setStore({ ...store, liters: value })
			},

			setNewLocation: (value) => {
				const store = getStore()
				setStore({ ...store, location: value })
			},


			signupNewUser: async (formSignup) => {
				const url = process.env.BACKEND_URL;
				const signupRequirement = "/api/signup"
				try {

					const response = await fetch(url + signupRequirement, {
						method: "POST",
						body: JSON.stringify(formSignup),
						headers: {
							'Content-type': 'application/json'
						},
					})

					if (response.ok) {
						const jsonResponse = await response.json()
						console.log(jsonResponse)
						const store = getStore()
						setStore({ ...store, messageToShowAlert: jsonResponse })
					}

					else {
						const jsonResponse = await response.json()
						console.log(jsonResponse)

					}
				}

				catch (e) {

					console.log("An error has occured", e)

				}
			},

			loginUserExisting: async ({ email, password }) => {
				const url = process.env.BACKEND_URL;
				const loginRequirement = "/api/login"
				try {
					const response = await fetch(url + loginRequirement, {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify({
							email,
							password
						})
					});

					if (response.status !== 200) return false

					const jsonResponse = await response.json()

					if (jsonResponse["token"]) {
						localStorage.setItem("userToken", jsonResponse["token"])
						return true;

					}
					return false;

				}

				catch (e) {
					console.log("An error was occurred, check it out!", e)
				}
			},

			getInformationOfToken: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`
						}
					});

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}

					const jsonResponse = await response.json();

					return jsonResponse;

				} catch (error) {
					console.error("An error occurred: ", error);
				}
			},

			start_time: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							start_time: new Date().toISOString(),
						})
					});

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}

					const data = await response.json();
					console.log(data);
					setStore({ current: data.userdata_id })
				} catch (error) {
					console.error(error);
				}
			},

			submitData: async (start_time, finish_time, location, liters) => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata/" + getStore().current;

				const requestBody = {
					finish_time: new Date().toISOString(),
					location: location,
					liters: liters
				};

				if (start_time !== 'pending') {
					requestBody.start_time = start_time;
				}
				console.log(getStore().start_time, getStore().finish_time, getStore().location, getStore().liters)


				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(requestBody)

					});


					const jsonResponse = await response.json();
					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}
					return jsonResponse;

				}

				catch (error) {
					console.error("An error occurred: ", error);
				}
			},

			submit_manual_data: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";
				
				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							start_time: getStore().start_time,
							finish_time: getStore().finish_time,
							location: getStore().location,
							liters: getStore().liters,
							status: "completed"
						})
					});

					const jsonResponse = await response.json();

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}

					return jsonResponse;
				} catch (error) {
					console.error("An error occurred: ", error);
				}

			},

			getUserImpact: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata/getimpact/";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
					});

					const jsonResponse = await response.json();

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}
					setStore({
						messageToShowAlert: jsonResponse,
						total_time: jsonResponse.total_time,
						total_liters: jsonResponse.total_liters,
						average_time: jsonResponse.average_time,
						average_liters: jsonResponse.average_liters

					})
					return jsonResponse;

				} catch (error) {
					console.error("An error occurred: ", error);
				}
			},

			getTotalImpact: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/totalimpact/";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					const jsonResponse = await response.json();

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}
					setStore({
						messageToShowAlert: jsonResponse,
						total_users: jsonResponse.total_users,
						total_impact_time: jsonResponse.total_impact_time,
						total_impact_liters: jsonResponse.total_impact_liters
					});
					return jsonResponse;

				} catch (error) {
					console.error("An error occurred: ", error)
				}
			}
		}

	}
};

	export default getState;