import React, { useState, useEffect, useContext } from "react";
import "../../styles/perfil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import "./../component/Buscador.jsx";



const JobPost = ({
  idPublicacion,
  idUsuario,
  titulo,
  nombre,
  apellido,
  descripcion,
  comuna,
  rubro,
  fecha,
  onDelete
}) => {
  // Lógica o JSX relacionado con JobPost

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "15px",
        backgroundColor: "white", // Fondo blanco
        display: "flex", // Mostrar en formato flex
        flexDirection: "column", // Alinear elementos en columna
      }}
    >
      <div
        style={{
          borderLeft: "5px solid red", // Línea de color rojo en el lado izquierdo
          padding: "5px",
        }}
      >
        <h3>{titulo}</h3>
        <p>
          <strong>Nombre:</strong> {nombre} {apellido}
        </p>
        <p>
          <strong>Descripción:</strong> {descripcion}
        </p>
        <p>
          <strong>Comuna:</strong> {comuna}
        </p>
        <p>
          <strong>Categoría:</strong> {rubro}
        </p>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => onDelete(idPublicacion)}
      >
        Borrar
      </button>
    </div>
  );
};




export const Perfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telefono: "",
    rubro: "",
    comuna: ""
  });

  const [data, setData] = useState([]); 

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
  
    fetch("http://localhost:3001/api/perfil_logeado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Bearer " + token
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          ...formData,
          firstName: data.usuario.nombre,
          lastName: data.usuario.apellido,
          email: data.usuario.email,
          comuna: data.usuario.comuna,
          telefono: data.usuario.telefono,
          rubro: data.usuario.rubro,
        });
  
        // Establecer las publicaciones en el estado
        setData(data.publicaciones);
      })
      .catch((error) => console.log(error));
  }, []);

const [correoElectronicoFiltrar, setCorreoElectronicoFiltrar] = useState(''); // Agrega un estado para el correo electrónico a filtrar

useEffect(() => {
  fetch("http://localhost:3001/publicaciones-perfil")
    .then((response) => response.json())
    .then((data) => {
      // Filtra las publicaciones por correo electrónico
      const publicacionesFiltradas = data.publicaciones.filter(publicacion => publicacion.email === correoElectronicoFiltrar);

      // Almacena las publicaciones filtradas en el estado
      setData(publicacionesFiltradas);
    });
}, [correoElectronicoFiltrar]); // Agrega correoElectronicoFiltrar a las dependencias para que el efecto se vuelva a ejecutar cuando cambie
  

const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Perfil actualizado exitosamente");
        // Puedes agregar lógica adicional aquí, si es necesario
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/publicacion/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.idPublicacion !== id);
        setData(updatedData);
        console.log(`Publicación con ID ${id} eliminada exitosamente.`);
      } else {
        console.error("Error al eliminar la publicación.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="profile-container mt-4">
      <div className="header">
        <h1 className="profile-name">¡Bienvenido {formData.firstName}!</h1>
      </div>

      {/* Formulario de datos */}
      <form className="data-form">
        <div className="form-group">
          <label htmlFor="firstName">Nombre:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comuna">Telefono:</label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comuna">Comuna:</label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="rubro">Rubro:</label>
          <input
            type="text"
            id="rubro"
            name="rubro"
            value={formData.rubro}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="button-container">
      <button
          type="button"
          className="action-button custom-button"
          onClick={handleEditProfile}
          style={{
            borderRadius: "12px",
            borderColor: "white",
            backgroundColor: "#2c94da",
            height: "40px",
            color: "black",
            textAlign: "center",
          }}
        >
          Guardar
        </button>
       <Link to="/generadorPublicacion">
          {["Electricista", "Carpintero", "Pintor", "Gasfitería", "Aseo"].includes(formData.rubro) && (
            <button
              className="action-button custom-button"
              style={{
                borderRadius: "12px",
                borderColor: "white",
                backgroundColor: "#2c94da",
                height: "40px",
                color: "black",
                textAlign: "center",
              }}
            >
              Publicar Trabajo
            </button>
          )}
        </Link>
        <Link to="/">
          {" "}
          <button
            className="action-button custom-button"
            style={{
              fontFamily: "fantasy",
              borderRadius: "12px",
              borderColor: "white",
              backgroundColor: "#d74338",
              height: "40px",
              color: "black",
              textAlign: "center",
            }}
          >
            Salir
          </button>
        </Link>
      </div>
      <div className="row flex-column">
        {data?.map((element, index) => {
          console.log(element)
          return (
          <div key={index} className="col mb-3">
            <JobPost {...element} 
            onDelete={(id) => handleDelete(id)}
            />
          </div>
        )})}
    </div>
    </div>
  );
};
