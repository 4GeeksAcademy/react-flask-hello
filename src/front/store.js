export const initialStore = () => {
	return {
		categories: [],
		items: [],
		selectedCategory: null,
		properties: [],
		favorites: [],
		token: [localStorage.getItem("token")],
		user: [localStorage.getItem("user")]
	}
}

export default function storeReducer(store, action = {}) {
	switch (action.type) {

		case 'login':

			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
	  
			return {
			  ...store,
			  token: action.payload.token,
			  user: action.payload.user,
			  error: null,
			};

			case "logout":
				// 🟢 Eliminar de localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("user");
		  
				return {
				  ...store,
				  token: null,
				  user: null,
				  notes: [],
				};

		case 'set_categories':

			return {
				...store,
				categories: action.payload
			}

		case 'set_items':

			return {
				...store,
				items: action.payload

			}

		case 'set_properties':

			return {
				...store,
				properties: action.payload
			}

		case 'set_selected_category': 
		
			return {
				...store,
				selectedCategory: action.payload
			}


		case 'add_favorites':

			return {
				...store,
				favorites: [...store.favorites, action.payload]
			}

		case 'delete_favorites':

			return {
				...store,
				favorites: store.favorites.filter(fav => !(fav.id === action.payload.id && fav.category === action.payload.category))
			}

		default:
			throw Error('Unknown action.');
	}
}
