export const initialStore = () => {
  	const token = localStorage.getItem("token");
  	const userStr = localStorage.getItem("user");

	let user = null;

  	try {
		if (userStr) user = JSON.parse(userStr)
  	} catch (e) {
		console.log("error en la data")
  	}
  	return {
    	token: token || null,
		user: user || null,
		error : null
  	};
};

export default function storeReducer(store, action = {}) {
  	switch (action.type) {
    	case "login":
      		localStorage.setItem("token", action.payload.token);
			localStorage.setItem("usuario", JSON.stringify(action.payload.user))

	  		return {
			...store,
			token: action.payload.token,
			user: action.payload.user,
			error: null
	  		};

		case "logout":
			localStorage.removeItem("token");
			localStorage.removeItem("user")

			return {
				...store,
				token: null,
				user: null
			};

		case "set_error":
			return {
				...store,
				error: action.payload
			};
  	}
}
