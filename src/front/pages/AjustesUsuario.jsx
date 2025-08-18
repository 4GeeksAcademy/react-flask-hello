import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../utils/Notifications";


export const AjustesUsuario = () => {
        const[usuario, setUsuario] = useState({
            nombre: '',
            apellido: '',
            nickname: '',
            telefono: '',
            avatar: '',
            email: '',
            rol: ''
          });

          useEffect(() => {
              const cargarDatosUSUario = async () => {
                const tokenUsuario = localStorage.getItem("token");
                const idUsuario = localStorage.getItem("userId");

                try{
                  const respuesta = await fetch(`.......URL......`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${tokenUsuario}`,
                      'Content-Type': 'application/json'
                    }
                  }); 

                  const data = await respuesta.json();

                  if(respuesta.ok) {
                    setUsuario(data);
                  } else {
                    console.error("Error al cargar los datos del usuario:", data);
                  }

                } catch (error) {
                  console.error("Error en la solicitud:", error);
                }
              };

              cargarDatosUSUario();
            }, []);


            const actualizarDatosUsuario = async () => {
              const tokenUsuario = localStorage.getItem("token");
              const idUsuario = localStorage.getItem("userId");

              try {
                const respuesta = await fetch(`.......URL......`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bearer ${tokenUsuario}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(usuario)
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                  notifySuccess("Datos de usuario actualizados correctamente");
                  setUsuario(data);
                } else {
                  notifyError("Error al actualizar los datos del usuario:", data);
                }

              } catch (error) {
                notifyError("Error en la solicitud:", error);
              }
            };
              const handleChange = (e) => {
                const { name, value } = e.target;
                setUsuario(prev => ({ ...prev, [name]: value }));
              };


  return (
    <div>
      <h1>Ajustes de Usuario</h1>
      <form onSubmit={(e) => { e.preventDefault(); actualizarDatosUsuario(); }}>
        <label>Nombre:</label>
        <input name="nombre" value={usuario.nombre} onChange={handleChange} />

        <label>Apellido:</label>
        <input name="apellido" value={usuario.apellido} onChange={handleChange} />

        <label>Nickname:</label>
        <input name="nickname" value={usuario.nickname} onChange={handleChange} />

        <label>Teléfono:</label>
        <input name="telefono" value={usuario.telefono} onChange={handleChange} />

        <label>Avatar (URL):</label>
        <input name="avatar" value={usuario.avatar} onChange={handleChange} />

        <label>Email:</label>
        <input value={usuario.email} disabled />

        <label>Rol:</label>
        <input value={usuario.rol} disabled />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};