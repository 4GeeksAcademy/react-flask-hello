const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      Formulario: [],
      OtroFormulario: [],
      ususario: {},
      publicaciones: [],
      Buscador: [],
      id: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      guardarperfil(datos) {
        setStore({ usuario: datos });
        console.log(getStore().usuario);
      },
      guardarsegundoperfil(datos) {
        setStore({ usuario2: datos });
      },
      async cargarPerfil(id) {
        let perfil = null;
        let res = await fetch(
          "http://localhost:3001/api/perfil/" + getStore().id,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        let data = await res.json();
        perfil = data;


        return perfil;
      },
      guardarid(id) {
        setStore({ id: id });
      },
      
      getPublicaciones: async (idUsers)=>{
				try {
					const response = await fetch('http://localhost:3001/api/perfil/' + idUsers)
					const data = await response.json()
					console.log(data)
					setStore({
						publicaciones: data
					})
				} catch (error) {
					console.log(error)
				}
			},


      
    },
  };
};

export default getState;
