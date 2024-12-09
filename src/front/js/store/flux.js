import { symbol } from "prop-types";

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
            ],
            username: null, // Initially no user is logged in
            userID: null,
            token: null,
            favorites: [],
            favoriteIds: [],
            favoriteData: [],
            favoritePriceData: [],
            wallet: [],
            coins: [],
            loadingCoins: true,
            currentCoinId: null,
            currency: "usd",
            timeFrame: "7",
            currentCoinPriceData: [],
            currentCoinData: [],
            showContactModal: false,
            showModal: false,
            showOverallHoldings: false,
            showWallet: false,
            showFavorites: false,
        },
        actions: {
            setFavoritePriceData: () => {
                setStore({ favoritePriceData: [] })
            },
            setFavoriteData: () => {
                setStore({ favoriteData: [] })
            },
            setUserId: (id) => {
                setStore({ userID: id })
            },
            setUserName: (username) => {
                setStore({ username: username })
            },
            setCurrentCoinId: (id) => {
                setStore({ currentCoinId: id })
            },
            setCurrency: (currency) => {
                setStore({ currency: currency })
            },
            setTimeFrame: (days) => {
                setStore({ timeFrame: days })
            },
            setShowContactModal: () => {
                setStore({ showContactModal: !getStore().showContactModal })
            },
            setShowOverallHoldings: () => {
                setStore({ showOverallHoldings: true })
                setStore({ showWallet: false })
                setStore({ showFavorites: false })
            },
            setShowWallet: () => {
                setStore({ showWallet: true })
                setStore({ showOverallHoldings: false })
                setStore({ showFavorites: false })
            },
            setShowFavorites: () => {
                setStore({ showFavorites: true })
                setStore({ showWallet: false })
                setStore({ showOverallHoldings: false })
            },
            fetchCoins: async () => {
                setStore({ loading: true });
                try {
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            'x-cg-pro-api-key': process.env.COINGECKO_KEY
                        }
                    };
                    const response = await fetch(
                        "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1&sparkline=true", options
                    );
                    const data = await response.json();
                    setStore({ coins: data, loading: false });
                } catch (error) {
                    console.error("Error fetching coins:", error);
                    setStore({ loading: false });
                }
            },

            fetchWalletData: async (userId) => {
                try {
                    const response = await fetch(`/api/wallet/${userId}`);
                    if (!response.ok) throw new Error("Failed to fetch wallet data");

                    const walletData = await response.json();
                    setStore({ ...store, wallet: walletData });
                } catch (error) {
                    console.error("Error fetching wallet data:", error);
                }
            },

            setToken: () => {
                setStore({userToken:localStorage.token})
            },



            getCurrentCoinPriceData: () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${getStore().currentCoinId}/market_chart?vs_currency=${getStore().currency}&days=${getStore().timeFrame}`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({
                            currentCoinPriceData:
                                response.prices.map((price) => {
                                    return ({ date: new Date(price[0]), price: price[1] })
                                })
                        })
                    })
                    .catch((err) => console.log(err))
            },

            getCurrentCoinData: () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${getStore().currentCoinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => setStore({ currentCoinData: response }))
                    .catch((err) => console.log(err))
            },

            getFavPriceData: (id) => {
                const currentData = getStore().favoritePriceData
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        if (!currentData.some((entry) => entry[0]?.id === coin_id)) {
                            setStore({
                                favoritePriceData: [...getStore().favoritePriceData,
                                response.prices.map((price) => {
                                    return ({ id: id, date: new Date(price[0]), price: price[1] })
                                })]
                            })}
                    })
                    .catch((err) => console.log(err))
            },

            signUp: (username, password) => {
                console.log(`Sign-up request for: ${username}`);
                // Implement API call or logic for user registration
            },
            // login: async (username, password) => {
            //     try {
            //         const resp = await fetch(process.env.BACKEND_URL + "api/login", {
            //             method: "POST",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify({ 
            //                 username: username, 
            //                 password: password }),
            //         });

            //         if (!resp.ok) throw Error("There was a problem in the login request");

            //         if (resp.status === 401) {
            //             throw new Error("Invalid credentials");
            //         } else if (resp.status === 400) {
            //             throw new Error("Invalid email or password format");
            //         }

            //         const data = await resp.json();

            //         // Save the token in localStorage
            //         localStorage.setItem("jwt-token", data.token);

            //         // Update the store with user details and token
            //         setStore({
            //             username: username,
            //             userID: data.user_id,
            //             token: data.token,
            //         });

            //         console.log("Login successful", data);
            //         return data;
            //     } catch (error) {
            //         console.error("Login error:", error);
            //         throw error;
            //     }
            // },

            // Function to restore the session on app load
            
            login: (email, password) => {
				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					),
					headers: {
						'Content-type': 'application/json'
					}
				})
					.then(res => {
						if(!res.ok) throw Error("There was a problem in the login request")

						if(res.status === 401){
							 throw("Invalid credentials")
						}
						if(res.status === 400){
								throw ("Invalid email or password format")
						}
						return res.json()
					})
					.then(response => {
						console.log("response", response);
						localStorage.setItem('token', response.access_token);
                        localStorage.setItem('username', response.username);
                        localStorage.setItem('userID', response.userID);
                        // localStorage.setItem('userToken', response.access_token);
						
						setStore({ userToken: response.access_token, userEmail: response.user.email, userID:response.userID, username:response.username });
                        getActions().getFavoriteIds(response.userID)
					})
					.catch(error => console.error(error));
			},
            
            
            initSession: () => {
                const token = localStorage.getItem("jwt-token");

                if (token) {
                    // Decode or validate the token if needed
                    setStore({ token });
                    console.log("Session restored");
                } else {
                    console.log("No token found");
                }
            },

            // Logout action to clear token and user data
            logout: () => {
                localStorage.removeItem("token"); // Clear the token
                setStore({ username: null, userID: null, userToken: null }); // Clear store data
                console.log("User logged out");
            },
            search: (query) => {
                console.log("Search query:", query); // Implement actual search logic
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            // addToFavs: (id, name, symbol, current_price) => {
            //     const exist = getStore().favorites.find((favorite) => favorite.name === name)
            //     if (!exist) {
            //         let newFav = { name: name, id: id, symbol: symbol, current_price: current_price };
            //         let newArr = [...getStore().favorites, newFav];
            //         setStore({ favorites: newArr });
            //         console.log("favorites:" + getStore().favorites)
            //     } else { console.log("favorite exists") }
            // },
            addToFavs: (coin) => {
                fetch(process.env.BACKEND_URL + `favorites/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "name": coin.name,
                            "user_id": getStore().userID,
                            "coin_id": coin.id
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ favoriteIds: response }))
                    .catch(error => console.error(error));
            },

            removeFromFavs: (fav_id) => {
                fetch(process.env.BACKEND_URL + `favorites/${getStore().userID}/${fav_id}`, {
					method: 'DELETE'
				})
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
                        return res.json();
					})
                    .then(response => setStore({ favoriteIds: response }))
					.catch(error => console.error(error));
            },

            getFavoriteIds: (id) => {
                fetch(process.env.BACKEND_URL + `users/${id}/favorites`)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({ favoriteIds: response });
                    })
                    .catch((err) => console.log(err))
            },
            getFavoriteData: (coin_id) => {
                const currentData = getStore().favoriteData
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        if (!currentData.some((fav) => fav.id === data.id)) {
                            setStore({ favoriteData: [...getStore().favoriteData, response] })}})
                    .catch((err) => console.log(err))
            }

        },
    };
};

export default getState;
