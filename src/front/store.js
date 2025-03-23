export const initialStore = () => {
	return {
		categories: [],
		items: [],
		selectedCategory: null,
		properties: [],
		favorites: [],
	}
}

export default function storeReducer(store, action = {}) {
	switch (action.type) {

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
