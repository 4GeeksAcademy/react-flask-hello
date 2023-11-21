import showAlert from "../utilidades/alerts";
import showAlertLonger from "../utilidades/alertslargos";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			signup: false,
			isloged: !!localStorage.getItem("jwt-token"),
			user_data: {
				name: null,
				last_name: null,
				email: null,
				password: null
			},
			login_user: {
				email: null,
				password: null
			},
			current_user: JSON.parse(localStorage.getItem("current_user")) || {},
			current_insti_user: JSON.parse(localStorage.getItem("current_insti_user")) || {},
			my_tracker: [],
			selectedScholarshipId: null,
			insSignup: false,
			insLoged: !!localStorage.getItem("jwt-token2"),
			institution_data: {
				institutional_name: null,
				email: null,
				password: null
			},
			institutionalLogin: {
				email: null,
				password: null
			},
			institutionName: null,
			scholarshipsPosted: [],
			scholarshipPosted: false,
			allScholarships: [],

		},
		actions: {


			isPropertyEmpty: (obj) => {
				for (const key in obj) {
					if (obj[key] === "" || obj[key] == null || obj[key] === undefined) {
						return true;
					}
				}
				return false;
			},


			signUpUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					if (actions.isPropertyEmpty(store.user_data))  {
						const customAlertElement = document.getElementById("customAlertSignUp"); {
							customAlertElement.innerHTML = '<div class="alert alert-danger d-flex justify-content-center" role="alert">Le falta llenar algunos datos </div>';
							return;
						};
					}

					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: 'POST',
						body: JSON.stringify(store.user_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const result = await response.json()
					if (response.status == 400) {
						setStore({ signup: false })
					}

					if (response.ok) {
						setStore({ signup: true })
						showAlert("success", "Usuario registrado")
					}

				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ signup: false })
					showAlert("error", "Error de servidor. Por favor intente más tarde.")
				}
			},


			logInUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.login_user)) {
						const customAlertElement = document.getElementById("customAlertLogIn"); {
							customAlertElement.innerHTML = '<div class="alert alert-danger d-flex justify-content-center" role="alert">Le falta llenar algunos datos </div>';
							return;
						};
					}

					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: 'POST',
						body: JSON.stringify(store.login_user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (response.ok) {
						showAlert("success", "Inicio de sesión exitoso")
						localStorage.setItem("jwt-token", result.token);
						localStorage.setItem("current_user", JSON.stringify(result));
						setStore({ isloged: true });
						setStore({ insLoged : false })
						setStore({ current_user: result })

						return true;

					} else {
						setStore({ isloged: false })
						setStore({ insLoged : false })
		

						const customAlertElement = document.getElementById("customAlertLogIn");
						{customAlertElement.innerHTML = `<div class="alert alert-danger" role="alert">Su correo o contraseña son incorrectos. Por favor intente de nuevo.</div>`};

					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ isloged: false })
					setStore({ insLoged: false })
					showAlert("error", "Error de servidor. Por favor intente más tarde.")

				}

			},


			handleChange: (e, type) => {
				const store = getStore()
				if (type == "login") {
					const newUserData = { ...store.login_user }
					newUserData[e.target.name] = e.target.value
					setStore({ login_user: newUserData })
				} else if (type == "signup") {
					const newUserData = { ...store.user_data }
					newUserData[e.target.name] = e.target.value
					setStore({ user_data: newUserData })
				} else if (type == "insSignup") {
					const newUserData = { ...store.institution_data }
					newUserData[e.target.name] = e.target.value
					setStore({ institution_data: newUserData })
				} else if (type == "insLogin") {
					const newUserData = { ...store.institutionalLogin }
					newUserData[e.target.name] = e.target.value
					setStore({ institutionalLogin: newUserData })
				} else if (type == "createScholarship") {
					const newUserData = { ...store.scholarshipsPosted }
					newUserData[e.target.name] = e.target.value
					setStore({ scholarshipsPosted: newUserData })
				}
			},

			signUpInstitution: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.institution_data)) {
						const customAlertElement = document.getElementById("customAlertLogInInst"); {
							customAlertElement.innerHTML = '<div class="alert alert-danger d-flex justify-content-center" role="alert">Le falta llenar algunos datos </div>';
							return;
						};
					}
	
					const response = await fetch(process.env.BACKEND_URL + "/signup-ins", {
						method: 'POST',
						body: JSON.stringify(store.institution_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					if (response.status == 400) {
						setStore({ insSignup: false })
					}
					if (response.ok) {
						setStore({ insSignup: true })
						showAlert("success", "Usuario Institucional registrado")
					}
				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ insSignup: false })
					showAlert("error","Error. Por favor inténtalo más tarde.")
				}
			},


			logInInstitution: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.institutionalLogin)) {
						const customAlertElement = document.getElementById("customAlertLogInInst");
						{customAlertElement.innerHTML = `<div class="alert alert-danger" role="alert">Le falta llenar algunos datos.</div>`};
						return;
					}
					const response = await fetch(process.env.BACKEND_URL + "/login-ins", {
						method: 'POST',
						body: JSON.stringify(store.institutionalLogin),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (response.ok) {
						localStorage.setItem("jwt-token2", result.token);
						localStorage.setItem("current_insti_user", JSON.stringify(result));
						setStore({ insLoged: true });
						setStore({ isloged : false })
						setStore({ current_insti_user: result })
						showAlert("success", "Inicio de sesión exitoso")

						console.log("Nombre de la institución:", result.institution_name); // Agrega esta línea para depurar

						return true;
					} else {
						setStore({ insLoged: false })
						setStore({ isloged : false })

						const customAlertElement = document.getElementById("customAlertLogInInst");
						{customAlertElement.innerHTML = `<div class="alert alert-danger" role="alert">Su correo o contraseña son incorrectos. Por favor intente de nuevo.</div>`};

					}
				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ insLoged: false })
					setStore({ isloged : false })
					showAlert("error","Error. Por favor inténtalo más tarde.")

				}
			},


			postScholarship: async () => {
				const myToken = localStorage.getItem("jwt-token2");
				const store = getStore()
				const actions = getActions()
				setStore({ tokenUser: myToken })

				try {
					if (actions.isPropertyEmpty(store.scholarshipPost)) {
						const customAlertElement = document.getElementById("customAlertPost");
						{customAlertElement.innerHTML = `<div class="alert alert-danger" role="alert">Le falta llenar algunos datos.</div>`};
						return;
					}

					
					const response = await fetch(process.env.BACKEND_URL + "/create-scholarship", {
						method: 'POST',
						body: JSON.stringify(store.scholarshipsPosted),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + myToken
						}
					})
					const result = await response.json()
					console.log(result);
					if (response.ok) {
						localStorage.setItem("jwt-token2", result.token);
						showAlert("success", "Beca publicada exitosamente.")
						setStore({ scholarshipPosted: true });
						return true;
					} else {
						setStore({ scholarshipPosted: false })
						showAlert("error","Por favor inténtalo de nuevo.")
						
					}
				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ scholarshipPosted: false })
					showAlert("error","Error. Por favor inténtalo más tarde.")
				}
			},


			changeSignUpStatus: (value) => {
				setStore({ signup: value })
				setStore({ insSignup: value })

			},

			changeLogInStatus: () => {		
				if (localStorage.getItem("jwt-token")) {
					setStore({ isloged: true });
					setStore({ insLoged: false });
					setStore({ hiddenLogout: false });
				  } else if (localStorage.getItem("jwt-token2")) {
					setStore({ isloged: false });
					setStore({ insLoged: true });
					setStore({ hiddenLogout: true });
				  }
			},


			changeMyProfileStatus: () => {
				if (localStorage.getItem("jwt-token")) {
				setStore({ isloged: true })
				setStore({ insLoged: false })
				}
			},


			changeMyInstitutionalProfileStatus: () => {
				if (localStorage.getItem("jwt-token2")) {
					setStore({ insLoged: true });
					setStore({ isloged: false });
				  } else {
					setStore({ insLoged: false });
					setStore({ isloged: false });
				  }
			},


			logout: () => {
				localStorage.clear();
				setStore({ isloged: false })
				setStore({ insLoged: false })
				setStore({ signup: false })
				setStore({ insSignup: false })
				setStore({ current_user: {} })
				setStore({ current_insti_user: {} })
			},


			getAllScholarShips: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					const response = await fetch(process.env.BACKEND_URL + "/scholarships", {
						method: 'GET'
					})
					const result = await response.json()
					setStore({ allScholarships: result.scholarships })

					if (response.status == 400) {
						showAlert("error","Por favor inténtalo de nuevo.")
					}

					if (response.ok) {
						console.log("Hola Bexplorer!")
					} else {
						showAlert("error","Por favor inténtalo de nuevo.")
					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
					showAlert("error","Error. Por favor inténtalo más tarde.")
				}
			},


			getMyTracker: async () => {
				const myToken = localStorage.getItem("jwt-token");
				const store = getStore()
				const actions = getActions()
				try {

					const response = await fetch(process.env.BACKEND_URL + "/my_tracker", {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + myToken
						}
					})
					const result = await response.json()
					setStore({ my_tracker: result.becas_guardadas })

					if (response.ok) {
						console.log("Becas actualizadas")
					} 

					if (response.status == 400) {
						alert(result.message)
						showAlert("info","No hay aplicaciones registradas.")
					} 
					
					if (response.status == 422) {
						showAlert("info","Debes iniciar sesión como usuario.")
					}
					
				} catch (error) {
					console.log(error + " Error loading message from backend")
					showAlert("error","Error. Por favor inténtalo más tarde.")
				}
			},


			setSelectedScholarshipId: (scholarshipId) => {
				setStore({ selectedScholarshipId: scholarshipId });
			},


			addToMyTracker: async () => {
				const myToken = localStorage.getItem("jwt-token");
				const store = getStore();
				const actions = getActions();

				try {
					const response = await fetch(process.env.BACKEND_URL + "/add_to_tracker", {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + myToken,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ scholarship_id: store.selectedScholarshipId }), // Utiliza el ID almacenado en el estado
					});

					const result = await response.json();
					console.log(result);
					if (response.ok) {
						showAlertLonger("success","Beca agregada a Mis Aplicaciones")
					} 
					
					else if (response.status == 422) {
						showAlert("info","Debes iniciar sesión como Usuario.")
					}
					
					else {
						showAlertLonger("info","Beca anteriormemte guardada en Mis Aplicaciones.")
					}
				}

				catch (error) {
					console.log(error + " Error loading message from backend");
					showAlert("error","Error. Por favor inténtalo más tarde.")
				}
			}


		}
	}
};

export default getState;
