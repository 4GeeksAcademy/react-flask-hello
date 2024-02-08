const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			user: [],
			followed: [],
			followers: [],
			genres: [],
			movies: [],
			movie: [],
			actors: [],
			actor: [],
			reviews: [],
			multiSearchResult: [],
			personalMovies: []
		},

		actions: {
			// User
			getAllUsers: async () => {
				try {
					// Fetch data from the backend to get all users
					const resp = await fetch(process.env.BACKEND_URL + "/users", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
					const data = await resp.json();
					if (resp.ok) {
						setStore({ users: data.results });
						return true;
					} else {
						throw new Error(data.msg || "Failed to get users");
					}
				} catch (error) {
					console.log("Error getting all users:", error);
					return false;
				}
			},
			getUserById: async (userId) => {
				try {
					// Fetch data from the backend to get a specific user by ID
					const resp = await fetch(
						process.env.BACKEND_URL + `/user/${userId}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem("authToken")}`,
							},
						}
					);
					const data = await resp.json();
					if (resp.ok) {
						setStore({ users: [data.results] });
						return true;
					} else {
						throw new Error(data.msg || "Failed to get the user");
					}
				} catch (error) {
					console.log("Error getting a specific user:", error);
					return false;
				}
			},
			signup: async (email, username, name, age, password) => {
				try {
					// Check if age is between 18 and 100
					if (age < 18 || age > 100) {
						throw new Error("Age must be between 18 and 100");
					}
					let datos = {
						email: email,
						username: username,
						name: name,
						age: age,
						password: password,
					};
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(datos),
					});
					const data = await resp.json();
					setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
					// don't forget to return something, that is how the async resolves
					return true;
				} catch (error) {
					console.log("Error signing up:", error);
					return false;
				}
			},
			login: async (email, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});
					const data = await resp.json();
					if (!data.token) throw new Error("No token received from server");
					localStorage.setItem("authToken", data.token);
					//store.userLoggedIn(true);
					setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error logging in:", error);
				}
			},
			profile: async (authToken) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/private", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					});
					const data = await resp.json();
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error getting into the profile:", error);
				}
			},
			logout: async () => {
				try {
					// Clear the auth token from local storage
					localStorage.removeItem("authToken");
					// Additional cleanup or actions if needed
					// Example: setStore({ userLoggedIn: false });
					return { msg: "Logout successful" };
				} catch (error) {
					console.log("Error logging out:", error);
				}
			},
			setNewPassword: async (password, authToken) => {
				try {
					// Make sure the user is logged in with a valid authToken
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to update the password
					const resp = await fetch(
						process.env.BACKEND_URL + "/api/passwordreset",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
							body: JSON.stringify({
								password: password,
							}),
						}
					);
					const data = await resp.json();
					if (resp.ok) {
						setStore({ message: data.message }); // Assuming the server responds with a 'message' field
						return true;
					} else {
						throw new Error(data.error);
					}
				} catch (error) {
					console.log("Error updating password:", error);
					return false;
				}
			},
			updateUser: async (name, username, profilePicture) => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to update user information
					const resp = await fetch(process.env.BACKEND_URL + "/edituser", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
						body: JSON.stringify({
							name: name,
							username: username,
							profile_picture: profilePicture,
						}),
					});
					const data = await resp.json();
					if (resp.ok) {
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.msg);
					}
				} catch (error) {
					console.log("Error updating user:", error);
					return false;
				}
			},
			deleteUser: async (userId) => {
				try {
					// Fetch data from the backend to delete the user
					const resp = await fetch(
						process.env.BACKEND_URL + `/deleteuser/${userId}`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					const data = await resp.json();
					if (resp.ok) {
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.msg || data.error);
					}
				} catch (error) {
					console.log("Error deleting user:", error);
					return false;
				}
			},
			// Support
			createIssue: async (issue) => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to create the issue
					const resp = await fetch(process.env.BACKEND_URL + "/support", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
						body: JSON.stringify({
							issue: issue,
						}),
					});
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'msg' field
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.error);
					}
				} catch (error) {
					console.log("Error creating issue:", error);
					return false;
				}
			},
			deleteIssue: async (email, issue) => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to delete the issue
					const resp = await fetch(process.env.BACKEND_URL + "/support", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
						body: JSON.stringify({
							email: email,
							issue: issue,
						}),
					});
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'msg' field
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.error);
					}
				} catch (error) {
					console.log("Error deleting issue:", error);
					return false;
				}
			},
			// Follow / Unfollow
			getFollowedList: async () => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to get the list of followed users
					const resp = await fetch(process.env.BACKEND_URL + "/followed", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					});
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'results' field containing an array of followed users
						setStore({ followed: data.results });
						return true;
					} else {
						throw new Error(data.msg || "Failed to get the followed users");
					}
				} catch (error) {
					console.log("Error getting followed users:", error);
					return false;
				}
			},
			getFollowersList: async () => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to get the list of followers
					const resp = await fetch(process.env.BACKEND_URL + "/followers", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					});
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'results' field containing an array of followers
						setStore({ followers: data.results });
						return true;
					} else {
						throw new Error(data.msg || "Failed to get the followers");
					}
				} catch (error) {
					console.log("Error getting followers:", error);
					return false;
				}
			},
			followUser: async (userId) => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to follow the user
					const resp = await fetch(
						process.env.BACKEND_URL + `/followuser/${userId}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
						}
					);
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'msg' field
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.msg || "Failed to follow the user");
					}
				} catch (error) {
					console.log("Error following user:", error);
					return false;
				}
			},
			unfollowUser: async (userId) => {
				try {
					// Fetch the auth token from local storage
					const authToken = localStorage.getItem("authToken");
					if (!authToken) {
						throw new Error("User not authenticated");
					}
					// Fetch data from the backend to unfollow the user
					const resp = await fetch(
						process.env.BACKEND_URL + `/unfollowuser/${userId}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
						}
					);
					const data = await resp.json();
					if (resp.ok) {
						// Assuming the server responds with a 'msg' field
						setStore({ message: data.msg });
						return true;
					} else {
						throw new Error(data.msg || "Failed to unfollow the user");
					}
				} catch (error) {
					console.log("Error unfollowing user:", error);
					return false;
				}
			},

			// Personal movies
			getPersonalMovies: async (viewStatus) => {
				const authToken = localStorage.getItem("authToken");
				try {
					const resp = await fetch(
						process.env.BACKEND_URL + `/favoritemovies/${viewStatus}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
						}
					);

					const data = await resp.json();

					if (resp.ok) {
						setStore({ personalMovies: data.results });
						return true;
					} else {
						throw new Error(data.msg || "Failed to get personal movies");
					}
				} catch (error) {
					console.error("Error getting personal movies:", error);
					return false;
				}
			},

			addPersonalMovie: async (movieId) => {
				const authToken = localStorage.getItem("authToken");
				try {
					const resp = await fetch(
						process.env.BACKEND_URL + `/favoritemovies/${movieId}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
						}
					);

					const data = await resp.json();

					if (resp.ok) {
						console.log("Movie added to personal list successfully");
						return true;
					} else {
						throw new Error(data.msg || "Failed to add movie to personal list");
					}
				} catch (error) {
					console.error("Error adding personal movie:", error);
					return false;
				}
			},

			removePersonalMovie: async (movieId) => {
				const authToken = localStorage.getItem("authToken");
				try {
					const resp = await fetch(
						process.env.BACKEND_URL + `/favoritemovies/${movieId}`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`,
							},
						}
					);

					const data = await resp.json();

					if (resp.ok) {
						console.log("Movie removed from personal list successfully");
						return true;
					} else {
						throw new Error(
							data.msg || "Failed to remove movie from personal list"
						);
					}
				} catch (error) {
					console.error("Error removing personal movie:", error);
					return false;
				}
			},

			changeViewStatus: async (movieId) => {
				const authToken = localStorage.getItem("authToken");
				try {
					const resp = await fetch(
						process.env.BACKEND_URL + `/viewstate/${movieId}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${authToken}`, // Include your JWT token here
							},
						}
					);

					const data = await resp.json();

					if (resp.ok) {
						console.log("View state updated successfully");
						return true;
					} else {
						throw new Error(data.msg || "Failed to update view state");
					}
				} catch (error) {
					console.error("Error changing view state:", error);
					return false;
				}
			},

			// Genres
			getGenres: async () => {
				try {
				  const resp = await fetch(process.env.BACKEND_URL + "/genres", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ genres: data.result });
					return true;
				  } else {
					throw new Error(data.error);
				  }
				} catch (error) {
				  console.log("Error getting genres: ", error);
				  return false;
				}
			  },
			  
			  // Movies
			  getAllMovies: async () => {
				try {
				  // Fetch data from the backend to get all movies
				  const resp = await fetch(process.env.BACKEND_URL + "/movies", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					// Assuming the server responds with a 'movies' field
					setStore({ movies: data.results });
					return true;
				  } else {
					throw new Error(data.error);
				  }
				} catch (error) {
				  console.log("Error getting all movies:", error);
				  return false;
				}
			  },
			  getMovieById: async (id) => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(
					process.env.BACKEND_URL + `/movie/id/${id}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ movie: [data.result] });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get movie details");
				  }
				} catch (error) {
				  console.log("Error getting movie details:", error);
				  return false;
				}
			  },
			  getMoviesByGenre: async (genreId) => {
				try {
				  // Fetch data from the backend route "/movies/genre/<genre_id>"
				  const response = await fetch(
					process.env.BACKEND_URL + `/movies/genre/${genreId}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
				  const data = await response.json();
				  if (response.ok) {
					// Assuming setStore is a function to update your application state
					setStore({ movies: data.result });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get movies by genre");
				  }
				} catch (error) {
				  console.error("Error getting movies by genre:", error);
				  return false;
				}
			  },
			  
			  getMovieByTitle: async (title) => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(
					process.env.BACKEND_URL + `/movie/title/${title}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ movie: data.result });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get movie details");
				  }
				} catch (error) {
				  console.log("Error getting movie details:", error);
				  return false;
				}
			  },
			  getRandomMovie: async () => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(process.env.BACKEND_URL + "/randommovie", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ movie: data.result });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get random movie");
				  }
				} catch (error) {
				  console.log("Error getting random movie:", error);
				  return false;
				}
			  },
			  getMovieDetails: async (id) => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(
					process.env.BACKEND_URL + `/moviedetails/${id}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ movie: data.result });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get movie details");
				  }
				} catch (error) {
				  console.log("Error getting movie details:", error);
				  return false;
				}
			  },
			  // Actors
			  getActors: async () => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(process.env.BACKEND_URL + "/actors", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ actors: data.results });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get popular actors");
				  }
				} catch (error) {
				  console.log("Error getting popular actors:", error);
				  return false;
				}
			  },
			  getActorByName: async (name) => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(
					process.env.BACKEND_URL + `/actors/${name}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ actor: [data.result] });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get actor details");
				  }
				} catch (error) {
				  console.log("Error getting actor details:", error);
				  return false;
				}
			  },
			  getActorById: async (id) => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(process.env.BACKEND_URL + `/actors/${id}`, {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ actor: [data.result] });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get actor details");
				  }
				} catch (error) {
				  console.log("Error getting actor details:", error);
				  return false;
				}
			  },
			  getRandomActor: async () => {
				try {
				  // Fetch data from the backend, which in turn fetches from the external API
				  const resp = await fetch(process.env.BACKEND_URL + "/randomactor", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  const data = await resp.json();
				  if (resp.ok) {
					setStore({ actor: [data.result] });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get random actor");
				  }
				} catch (error) {
				  console.log("Error getting random actor:", error);
				  return false;
				}
			  },
			  
			  // Reviews Managment - Create, Update y Delete Reviews
			  createReview: async (reviewData) => {
				try {
				  const authToken = localStorage.getItem("authToken");
			  
				  if (!authToken) {
					throw new Error("User not authenticated");
				  }
			  
				  const resp = await fetch(process.env.BACKEND_URL + "/reviews", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(reviewData),
				  });
			  
				  const data = await resp.json();
			  
				  if (resp.ok) {
					setStore({ message: data.msg });
					return true;
				  } else {
					throw new Error(data.error);
				  }
				} catch (error) {
				  console.log("Error creating review:", error);
				  return false;
				}
			  },
			  
			  updateReview: async (reviewId, reviewData) => {
				try {
				  const authToken = localStorage.getItem("authToken");
			  
				  if (!authToken) {
					throw new Error("User not authenticated");
				  }
			  
				  const resp = await fetch(process.env.BACKEND_URL + `/reviews/${reviewId}`, {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(reviewData),
				  });
			  
				  const data = await resp.json();
			  
				  if (resp.ok) {
					setStore({ message: data.msg });
					return true;
				  } else {
					throw new Error(data.error);
				  }
				} catch (error) {
				  console.log("Error updating review:", error);
				  return false;
				}
			  },
			  
			  deleteReview: async (reviewId) => {
				try {
				  const authToken = localStorage.getItem("authToken");
			  
				  if (!authToken) {
					throw new Error("User not authenticated");
				  }
			  
				  const resp = await fetch(process.env.BACKEND_URL + `/reviews/${reviewId}`, {
					method: "DELETE",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: `Bearer ${authToken}`,
					},
				  });
			  
				  const data = await resp.json();
			  
				  if (resp.ok) {
					setStore({ message: data.msg });
					return true;
				  } else {
					throw new Error(data.error);
				  }
				} catch (error) {
				  console.log("Error deleting review:", error);
				  return false;
				}
			  },
			  
			  // Multi Search
			  getMulti: async (value) => {
				try {
				  const resp = await fetch(
					process.env.BACKEND_URL + `/multi/${value}`,
					{
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
					  },
					}
				  );
			  
				  const data = await resp.json();
			  
				  if (resp.ok) {
					setStore({ multiSearchResult: data.result });
					return true;
				  } else {
					throw new Error(data.msg || "Failed to get multi search results");
				  }
				} catch (error) {
				  console.log("Error getting multi search results:", error);
				  return false;
				}
			  },
			},
		  };
		};
		export default getState;