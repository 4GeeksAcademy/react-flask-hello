


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
			movie: {},
			results: [],
			page: 1,
			movies_from_api:[],
			movies_from_api_2:[],
			recommendedFunnyMovie: null,
			recommendedSadMovie: null,
			

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setRecommendedFunnyMovie: movie => {
                setStore({ recommendedFunnyMovie: movie });
			},

			setRecommendedSadMovie: movie => {
                setStore({ recommendedSadMovie: movie });
			},

			getMovie: () => {
				console.log("Hola desde flux");
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ZhNzNkZjUyZTYyNWQ5NGQ1NzMyNGI1YTFlNDgzYSIsInN1YiI6IjY1OTQwNzAwY2U0ZGRjNmQzODdmMDIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNQabtAWxQcVNGg9_oMH8JWkdoAHIrOkmlBiwpj1oG8'
					}
				};
			
				return fetch('https://api.themoviedb.org/3/movie/500?language=en-EN', options)
					.then(response => response.json())
					.then(response => {
						console.log("Respuesta de la API:", response);
						setStore({ movie: response });
						return response; 
					})
					.catch(err => {
						console.error(err);
						throw err;
					});
			},

			getMovieList: () => {
				console.log("Lista desde Flux");
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ZhNzNkZjUyZTYyNWQ5NGQ1NzMyNGI1YTFlNDgzYSIsInN1YiI6IjY1OTQwNzAwY2U0ZGRjNmQzODdmMDIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNQabtAWxQcVNGg9_oMH8JWkdoAHIrOkmlBiwpj1oG8'
					}
				};
				
				fetch('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=100', options)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ results: data.results });
					})
					.catch(err => console.error(err));
			},

			getMovieList2: () => {
				console.log("Lista desde Flux");
				const { page } = getStore()
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ZhNzNkZjUyZTYyNWQ5NGQ1NzMyNGI1YTFlNDgzYSIsInN1YiI6IjY1OTQwNzAwY2U0ZGRjNmQzODdmMDIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNQabtAWxQcVNGg9_oMH8JWkdoAHIrOkmlBiwpj1oG8'
					}
				};
			
			
				
				fetch('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=2', options)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ results: data.results });
					})
					.catch(err => console.error(err));
			},


			getMovieListFromApi: () => {
				console.log("Lista del api personal desde flux");
				const options = {
					method: 'GET',
				};
				
				fetch('https://ominous-invention-7gwqjv65g5qhwwrw-3001.app.github.dev/api/movies', options)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ movies_from_api: data || [] });
					})
					.catch(err => console.error(err));
			},

			getMovieListFromApi2: () => {
				console.log("Lista del api personal desde flux");
				const options = {
					method: 'GET',
				};
				
				fetch('https://ominous-invention-7gwqjv65g5qhwwrw-3001.app.github.dev/api/movies_2', options)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ movies_from_api_2: data || [] });
					})
					.catch(err => console.error(err));
			},

			getFunnyRecommendation: () => {
				console.log("Hola desde Flux")
				const options = {
					method: 'GET',
				};

				fetch('https://ominous-invention-7gwqjv65g5qhwwrw-3001.app.github.dev/api/movies_2', options)
					.then(response => response.json())
					.then(data => {
						const funnyMovie = data.filter(movie => movie.funny === true);
						console.log(funnyMovie)

					if (funnyMovie.length > 0){
						const ramdomIndex = Math.floor(Math.random() * funnyMovie.length);
						const ramdomMovie = funnyMovie[ramdomIndex];
						getActions().setRecommendedFunnyMovie(ramdomMovie);
						console.log(ramdomMovie)
					}
					})
					.catch(err => console.error(err));
				
			},

			getSadRecommendation: () => {
				console.log("Hola desde Flux")
				const options = {
					method: 'GET',
				};

				fetch('https://ominous-invention-7gwqjv65g5qhwwrw-3001.app.github.dev/api/movies_2', options)
					.then(response => response.json())
					.then(data => {
						const sadMovie = data.filter(movie => movie.sad === true);
						console.log(sadMovie)

					if (sadMovie.length > 0){
						const ramdomIndex = Math.floor(Math.random() * sadMovie.length);
						const ramdomMovie = sadMovie[ramdomIndex];
						getActions().setRecommendedSadMovie(ramdomMovie);
						console.log(ramdomMovie)
					}
					})
					.catch(err => console.error(err));
				
			},

			


			getMessage: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
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
