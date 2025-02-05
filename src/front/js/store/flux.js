const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            auth: localStorage.getItem('token') || false,
            user: null,
            token: null,
            player_info: null,
            host_info: null,
            tournaments: [],
            torneo: {},
            participant: {}, 
		},
		actions: {

            /////////////////////////////////////////USER/////////////////////////////////////////

            getUserData: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/protected", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }

                    const data = await resp.json();
                    console.log("Datos del usuario:", data);

                    setStore({ user: data.users});
                } catch (error) {
                    console.error("Error en getUserData:", error);
                }
            },

			register: async (formData) => { //POST USER SIGNUP
                try {
                    console.log("Form data antes de enviar:", formData);
                    const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al registrar el usuario");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});
                    localStorage.setItem('player', formData.player);
                    if (formData.player) {
                        return "/player/editProfile";
                    } 
                    return "/host/editProfile";
                } catch (error) {
                    console.error("Error en register:", error);
                }
            },

            login: async (formData) => {    //POST USER LOGIN
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    if (!resp.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await resp.json();
                    console.log("Usuario logeado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});
                    localStorage.setItem('player', data.user_info.player);
                    if (data.user_info.player) {
                        return "/player/profile";
                    } 
                    return "/host/profile";
                } catch (error) {
                    console.error("Error en login:", error);
                }
            },
			getMessage: () => {
                console.log("Mensaje inicial cargado");
			},


            /////////////////////////////////////////PLAYER/////////////////////////////////////////

            updatePlayer: async (playerData) => {   //PUT ONE PLAYER
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/editPlayers", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                         },
                        body: JSON.stringify(playerData)
                    });

                    if (!resp.ok) {
                        throw new Error("Error al actualizar el perfil");
                    }

                    const data = await resp.json();
                    console.log("Usuario actualizado:", data);

                    setStore({ player_info: data.player});

                } catch (error) {
                    console.error("Error al actualizar el perfil:", error);
                }
            },

            getPlayers: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/getPlayers", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
            
                    if (!resp.ok) {
                        if (resp.status === 404) {
                            throw new Error("No hay jugadores registrados.");
                        }
                        throw new Error("Error al obtener los jugadores.");
                    }
            
                    const data = await resp.json();
                    console.log("Jugadores obtenidos:", data.players);
            
                    // Aquí actualizamos el estado global con los jugadores obtenidos
                    setStore({ players: data.players });
                } catch (error) {
                    console.error("Error al obtener los jugadores:", error.message);
                }
            },

            getPlayer: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/getPlayer", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")} `,
                        },
                    });
            
                    if (!resp.ok) {
                        if (resp.status === 404) {
                            throw new Error("No hay jugadores registrados.");
                        }
                        throw new Error("Error al obtener los jugadores.");
                    }
            
                    const data = await resp.json();
                    console.log("Jugadores obtenidos:", data.players);
            
                    // Aquí actualizamos el estado global con los jugadores obtenidos
                    setStore({ player_info: data.player});
                } catch (error) {
                    console.error("Error al obtener los jugadores:", error.message);
                }
            },


            /////////////////////////////////////////HOST/////////////////////////////////////////

            updateHost: async (hostData) => {  //PUT ONE HOST
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/editHost/", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(hostData)
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del host");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                    setStore({ host_info: data.host});
                    
                } catch (error) {
                    console.error("Error al actualizar el perfil del Host:", error);
                }
            },

            getHost: async () => {  //GET HOST
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/getHost", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!resp.ok) {
                        if (resp.status === 404) {
                            throw new Error("No hay hosts registrados.");
                        }
                        throw new Error("Error al obtener los hots.");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                    setStore({ host_info: data.host});

                } catch (error) {
                    console.error("Error en getHost:", error);
                }
            },


            /////////////////////////////////////////TOURNAMENT/////////////////////////////////////////
        
            postTournament: async (tournamentData) => {  //POST TOURNAMENT
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/tournaments", {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(tournamentData)   
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al crear el torneo");
                    }

                    const data = await resp.json();
                    console.log("Torneo creado:", data);

                    const store = getStore();
                    setStore({ tournaments: [...(store.tournaments), data] });
                    return data;

                } catch (error) {
                    console.error("Error en postTournament:", error);
                }
            },

            getTournaments: async () => {   //GET TOURNAMENTS
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/tournaments");   

                    if (!resp.ok) {
                        if (resp.status === 404) {
                            throw new Error("No hay torneos registrados.");
                        }
                        throw new Error("Error al obtener los torneos.");
                    }

                    const data = await resp.json(); // Obtener la lista de torneos
                    console.log("Torneos obtenidos:", data);

                    setStore({ tournaments: data.tournaments }); // Guardarlos en el estado global
            

                } catch (error) {
                    console.error("Error en getTournaments:", error)
                }
            },

            getOneTournament: async (tournamentId) => {   //GET ONE TOURNAMENT
             try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/tournaments/${tournamentId}` ,{
                });   
                
                if (!resp.ok) {
                    if (resp.status === 404) {
                        throw new Error("No hay torneo con ese id");
                    }
                    throw new Error("Error al obtener el torneo.");
                }

                const data = await resp.json();
                setStore({torneo: data.torneo})
                
                getActions().getTournamentParticipants(tournamentId)

             } catch (error) {
                console.error("Error en getOneTournament:", error);   
             }
            },
            

            /////////////////////////////////////////CHECK/////////////////////////////////////////
        
            checkUser: async () => {    //Comprueba si el usuario logueado es player o Host. Devuelve True si es player
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/check", {
                        method: "GET",
                        headers: { 
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },  
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al checkear el usuario");
                    }

                    const data = await resp.json();
                    console.log("user:", data);

                    return data.player;

                } catch (error) {
                    console.error("Error en checkUser:", error)
                }
            },


            /////////////////////////////////////////PARTICIPANTS/////////////////////////////////////////

            registerParticipant: async (tournamentId) => {  //Post participantes
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tournaments/${tournamentId}/participate`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    });
            
                    const data = await resp.json();
            
                    if (resp.ok) {
                        alert("Participación registrada con éxito");

                        setStore({
                            torneo: { ...getStore().torneo, participants_registered: data.participants_registered }
                        });
                    } else {
                        alert(data.msg || 'Error al participar en el torneo');
                    }
                } catch (error) {
                    alert("Ocurrió un error al participar en el torneo:", error)
                }
            },

            getTournamentParticipants: async (tournamentId) => {    //Get todos los participantes de un torneo
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tournaments/${tournamentId}/participants`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
            
                    const data = await resp.json();
            
                    if (resp.ok) {
                        setStore({
                            torneo: { ...getStore().torneo, participants: data.participants },
                        });
                    } else {
                        alert(data.msg || "Error al obtener los participantes");
                    }
                } catch (error) {
                    console.error("Error en getTournamentParticipants:", error);
                    alert("Ocurrió un error al obtener los participantes");
                }
            },        

            getParticipantDetails: async (tournamentId, playerId) => {      //Get un participante de un torneo
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/tournaments/${tournamentId}/participants/${playerId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
            
                    const data = await resp.json();
            
                    if (resp.ok) {
                        setStore({participant: data.participant});
                    } else {
                        alert(data.msg || "Error al obtener el participante");
                    }
                } catch (error) {
                    console.error("Error en getParticipantDetails:", error);
                }
            },
            

            removeParticipant: async (tournamentId, playerId) => {      //Delete un participante de un torneo
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/tournaments/${tournamentId}/remove_player/${playerId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
            
                    const data = await resp.json();
            
                    if (resp.ok) {
                        alert("Jugador eliminado del torneo");
            
                        setStore({
                            torneo: { ...getStore().torneo, participants_registered: data.participants_registered },
                        });
                    } else {
                        alert(data.msg || "Error al eliminar el jugador del torneo");
                    }
                } catch (error) {
                    console.error("Error en removeParticipant:", error);
                }
            },
            

            /////////////////////////////////////////TEAMS/////////////////////////////////////////
            
            getTournamentTeams: async (tournamentId) => {       //GET todos los equipos de un torneo
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tournaments/${tournamentId}/teams`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
            
                    const data = await resp.json();
            
                    if (resp.ok) {
                        setStore({
                            torneo: { ...getStore().torneo, teams: data.teams }
                        });

                    } else {
                        alert(data.msg || "Error al obtener los equipos del torneo");
                    }
                } catch (error) {
                    console.error("Error en getTournamentTeams:", error);
                }
            },
            
            



        },
    };
};
export default getState;





