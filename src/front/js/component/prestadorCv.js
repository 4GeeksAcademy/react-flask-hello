import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/prestadorCv.css";

import "./../pages/home.js";

// // const data = [
//   {
//     id: 1,
//     titulo: "Servicio de gasfitería",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   {
//     id: 2,
//     titulo: "Instalación eléctrica residencial",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   {
//     id: 3,
//     titulo: "Servicio de carpintería",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   // Añade más datos según sea necesario
// ];



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
  onContact,
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

      <Link to={`/Prestador/${idUsuario}`} className="btn btn-success">  
        Contactar
      </Link>
    </div>
  );
};

// Componente principal
const PrestadorCv = () => {
  const [data, setData] = useState(data); // Datos de publicaciones

  const [filteredCategoria, setFilteredCategoria] = useState(null); // Estado para filtrar por categoría
  useEffect(() => {
    fetch("http://localhost:3001/publicaciones")
      .then((response) => response.json())
      .then((data) => {
        setData(data.publicaciones);
      });
  }, []);
  const handleCategoriaFilter = (categoria) => {
    setFilteredCategoria(categoria === filteredCategoria ? null : categoria);
  };
 

  const handleContact = (postId) => {
    // Aquí puedes implementar la lógica para contactar al prestador usando el postId
    console.log(`Contactar al prestador con ID: ${postId}`);
    // Por ejemplo, puedes abrir un formulario de contacto o realizar una acción específica
  };

  return (
    <div
      className="container row mt-5"
      style={{ justifyContent: "center", margin: "0 auto" }}
    >
      <div className="row flex-column">
        {data?.map((element, index) => {
          console.log(element)
          return (
          <div key={index} className="col mb-3">
            <JobPost {...element} />
          </div>
        )})}
      </div>
    </div>
  );
};

export default PrestadorCv;
