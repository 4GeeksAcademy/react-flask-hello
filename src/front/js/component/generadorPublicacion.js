import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const GeneradorPublicacion = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rubro: "",
    comuna: "",
    fecha: "",
    titulo: "",
    descripcion: ""
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
          nombre: data.usuario.nombre,
          apellido: data.usuario.apellido,
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

  

  const handlePublicacion = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  const publicarPublicacion = () => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    formData.idUser = userFromLocalStorage ? userFromLocalStorage.id : null;

    fetch("http://localhost:3001/publicacionpost/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Publicación enviada al servidor:", data);
        abrirModal();
    })
      
      .catch((error) => {
        console.error("Error al enviar la publicación:", error);
      });
  };

  return (
    <div className="container mt-5" >
      <div
        className="col-md-5 offset-md-3 max-width-form text-center"
        style={{
          border: "1px solid #616161",
          borderRadius: "10px",
          background: "#D1EFEA",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#CCCCCC", // Agregado para establecer el fondo gris
          boxShadow: "0 0 70px #000",
        }}
      >
        <h2
          style={{
            fontFamily: "fantasy",
            color: "#001F3F",
            marginTop: "5px",
            boxShadow: "initial",
          }}
        >
          Publicar Aviso
        </h2>

        <div className="mb-6 mt-3">
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Nombre"
              value={`${formData.nombre} ${formData.apellido}`}
              onChange={handlePublicacion}
              name="nombre"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email" style={{ border: '1px solid black' }}// Tipo de entrada email para la validación automática del formato de correo electrónico
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handlePublicacion}
              name="email"
              required // Campo obligatorio
            />
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Comuna"
              value={formData.comuna}
              onChange={handlePublicacion}
              name="comuna"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Rubro"
              value={formData.rubro}
              onChange={handlePublicacion}
              name="rubro"
              required
            />
          <div className="mt-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Titulo de la publicación"
              onChange={handlePublicacion}
              name="titulo"
              required
            />
          </div>
          </div>
          <div className="mb-3">
            <input
              type="date" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Fecha"
              onChange={handlePublicacion}
              name="fecha"
              required
            />
          </div>
        </div>
        <div className="mb-3">
            <textarea
                style={{ border: '1px solid black', height: '150px', resize: 'none', textAlign: 'left', verticalAlign: 'top' }}
                className="form-control"
                placeholder="Descripción"
                onChange={handlePublicacion}
                name="descripcion"
                required
            ></textarea>
        </div>     
        <button
          type="button"
          className="btn btn-primary mt-3"
          style={{ width: "50%" , margin: "0 auto" }}
          onClick={publicarPublicacion}
        >
          Publicar
        </button>
          <Modal show={showModal} onHide={cerrarModal}>
            <Modal.Header closeButton>
                <Modal.Title>¡Publicación registrada con éxito!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Link to="/Perfil">
                    Pulsa aquí para ver tus publicaciones
                </Link>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
       </div>
    </div>
  );
};

export default GeneradorPublicacion;