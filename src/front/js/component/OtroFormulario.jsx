import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import "../../styles/elotroformulario.css";
import { Link } from "react-router-dom";
import { Context, actions} from "../store/appContext";
import "./../pages/perfil";

export const OtroFormulario = (props) => {
  const { store, actions } = useContext(Context);
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmpassword: "",
    rut: "",
    telefono: "",
    comuna: "",
    fecha_de_nacimiento: "",
    tipoUsuario: "",
    aceptoTerminos: false,
    emailregistrado: false,
    rutregistrado: false,
    telefonoregistrado: false,
    errores: {},
  });


  const [showRubroField, setShowRubroField] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "tipoUsuario") {
      setShowRubroField(value === "prestador");
    }

    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errores = validarFormulario();
  
    if (Object.keys(errores).length > 0) {
      setState({ ...state, errores });
      console.error("Formulario inválido:", errores);
      return;
    }
  
    const {
      nombre,
      apellido,
      email,
      password,
      rut,
      telefono,
      comuna,
      fecha_de_nacimiento,
      tipoUsuario,
      rubro,
      aceptoTerminos,
    } = state;
  
    if (!aceptoTerminos) {
      console.error("Debes aceptar los términos y condiciones.");
      return;
    }
  
    const rubroToSend = tipoUsuario === "cliente" ? undefined : rubro;
  
    try {
      const payload = {
        nombre,
        apellido,
        email,
        password,
        rut,
        telefono,
        comuna,
        fecha_de_nacimiento,
        tipoUsuario,
        ...(rubroToSend !== undefined && { rubro: rubroToSend }), // Agrega rubro solo si no es undefined
      };
  
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data?.message === "Usuario registrado con éxito") {
          // Registro exitoso
          setState({ ...state, showModal: true });
          actions.guardarid(data?.user?.id);
          if (data?.message === "Email ya registrado") {
            // Registro exitoso
            setState({ ...state, emailregistrado: true });
        }
      } else {
        const errorData = await response.json();
        console.error("Error al enviar los datos al servidor:", errorData);
      } }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const validarFormulario = () => {
    const {
      nombre,
      apellido,
      email,
      password,
      confirmpassword,
      emailregistrado,
      rut,
      telefono,
      comuna,
      fecha_de_nacimiento,
      tipoUsuario,
      rubro,
      aceptoTerminos,
    } = state;
    const errores = {};

    if (!nombre.trim()) {
      errores.nombre = "El nombre es obligatorio";
    }

    if (!apellido.trim()) {
      errores.apellido = "El apellido es obligatorio";
    }

    if (!email.trim()) {
      errores.email = "El correo eléctronico es obligatorio";
    } 

    if (!password.trim()) {
      errores.password = "La contraseña es obligatoria";
    } else if (password.length < 8 || password.length > 12) {
      errores.password = "La contraseña debe tener entre 8 y 12 caracteres";
    }

    if (!rut.trim()) {
      errores.rut = "El Rut es obligatorio";
    } else if (rut.length < 8 || rut.length > 10) {
      errores.rut = "El Rut debe tener 8 o 9 dígitos";
    } 

    if (!fecha_de_nacimiento.trim()) {
      errores.fecha_de_nacimiento = "La fecha de nacimiento es obligatoria";
    }

    if (!telefono.trim()) {
      errores.telefono = "El telefono es obligatorio";
    } else if (telefono.length !== 9) {
      errores.telefono = "El telefono debe tener 9 dígitos";
    } 

    if (!comuna.trim()) {
      errores.comuna = "Su comuna es obligatoria";
    }

    if (tipoUsuario === "prestador" && !rubro.trim()) {
      errores.rubro = "Su rubro es obligatorio";
    }

    if (!aceptoTerminos) {
      errores.aceptoTerminos = "Debes aceptar los términos y condiciones.";
    }
    if (confirmpassword !== password){
      errores.confirmpassword = "Las contraseñas deben coincidir"
    }
    if (!tipoUsuario) {
      errores.tipoUsuario = "El tipo de usuario es obligatorio";
    }



    return errores;
  };

  const cerrarModal = () => {
    setState({ ...state, showModal: false});
  }

  return (
    <Container >
      <Row>
        <Col   style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #616161",
          borderRadius: "35px",
          margin: "30px auto 0",
          padding: "40px",
          backgroundColor: "white", // Agregado para establecer el fondo gris
          boxShadow: "0 0 45px #546",
        }}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1>
              Bienvenido! Por favor rellene los campos para registrarse en
              EasyJob
            </h1>
            <Form.Group controlId="formNombre" >
              <Form.Label>
                <h3>Nombre</h3>
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                isInvalid={state.errores.nombre}
                onChange={handleChange}
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              />
              {state.errores.nombre && (
                <Form.Text className="text-danger">
                  {state.errores.nombre}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>
                <h3>Apellido</h3>
              </Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={state.apellido}
                onChange={handleChange}
                placeholder="Ingrese su apellido"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              />
              {state.errores.apellido && (
                <Form.Text className="text-danger">
                  {state.errores.apellido}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formRut">
              <Form.Label>
                <h3>Rut</h3>
              </Form.Label>
              <Form.Control
                type="text"
                name="rut"
                value={state.rut}
                onChange={handleChange}
                placeholder="Ingrese su rut sin puntos ni guión"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              />
              {state.errores.rut && (
                <Form.Text className="text-danger">
                  {state.errores.rut}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
  <Form.Label>
    <h3>Correo electrónico</h3>
  </Form.Label>
  <Form.Control
    type="email"
    name="email"
    value={state.email}
    placeholder="Ingrese su correo electronico"
    style={{ borderWidth: "3px", borderColor: "darkcyan" }}
    onChange={handleChange}
  />
  {state.errores.email && (
    <Form.Text className="text-danger">
      {state.errores.email}
    </Form.Text>
  )}
  {state.emailregistrado && (
    <div className="alert alert-warning" role="alert">
      El correo electrónico ya está registrado. Por favor, utilice otro.
    </div>
  )}
</Form.Group>
            <Form.Group controlId="formContraseña">
              <Form.Label>
                <h3>Contraseña</h3>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={state.password}
                placeholder="Ingrese su contraseña. Debe tener entre 8 y 12 caracteres"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                onChange={handleChange}
              />
              {state.errores.password && (
                <Form.Text className="text-danger">
                  {state.errores.password}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formConfirmContraseña">
              <Form.Label>
                <h3>Confirmar Contraseña</h3>
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmpassword"
                placeholder="Repita su contraseña"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                onChange={handleChange}
              />
              {state.errores.confirmpassword && (
                <Form.Text className="text-danger">
                  {state.errores.confirmpassword}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>
                <h3>Teléfono</h3>
              </Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={state.telefono}
                onChange={handleChange}
                placeholder="Ingrese su telefono"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              />
              {state.errores.telefono && (
                <Form.Text className="text-danger">
                  {state.errores.telefono}
                </Form.Text>
              )}
              
              
            </Form.Group>
            <Form.Group controlId="formFechaNacimiento">
              <Form.Label>
                <h3>Fecha de nacimiento</h3>
              </Form.Label>
              <Form.Control
                type="date"
                name="fecha_de_nacimiento"
                value={state.fecha_de_nacimiento}
                onChange={handleChange}
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              />
              {state.errores.fecha_de_nacimiento && (
                <Form.Text className="text-danger">
                  {state.errores.fecha_de_nacimiento}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formComuna">
              <Form.Label>
                <h3>Comuna</h3>
              </Form.Label>
              <Form.Control
                as="select"
                name="comuna"
                value={state.comuna}
                onChange={handleChange}
                placeholder="Ingrese su comuna"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              >
                <option value="" hidden>
                  Seleccione su comuna
                </option>
                <option>La Florida</option>
                <option>La Reina</option>
                <option>Providencia</option>
                <option>Santiago Centro</option>
                <option>Independencia</option>
              </Form.Control>
              {state.errores.comuna && (
                <Form.Text className="text-danger">
                  {state.errores.comuna}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formTipoUsuario">
              <Form.Label>
                <h3>Tipo de Usuario</h3>
              </Form.Label>
              <Form.Control
                as="select"
                name="tipoUsuario"
                value={state.tipoUsuario}
                onChange={handleChange}
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              >
                <option value="">Seleccione...</option>
                <option value="cliente">Cliente</option>
                <option value="prestador">Prestador de Servicio</option>
              </Form.Control>
              {state.errores.tipoUsuario && (
                <Form.Text className="text-danger">
                  {state.errores.tipoUsuario}
                </Form.Text>
              )}
            </Form.Group>

            {showRubroField && (
              <Form.Group controlId="formRubro">
                <Form.Label>
                  <h3>Rubro</h3>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="rubro"
                  value={state.rubro}
                  onChange={handleChange}
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                >
                  <option value="" hidden>
                    Seleccione su rubro
                  </option>
                  <option>Carpinteria</option>
                  <option>Electricista</option>
                  <option>Gasfitería</option>
                  <option>Pintor</option>
                  <option>Aseo</option>
                </Form.Control>
                {state.errores.rubro && (
                  <Form.Text className="text-danger">
                    {state.errores.rubro}
                  </Form.Text>
                )}
              </Form.Group>
            )}

            <Form.Group controlId="formTerminosCondiciones">
              <h3>
                <strong>Terminos y Condiciones</strong>
              </h3>
              <br />
              <div
                className="Terms"
                type="text"
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              >
                {" "}
                <p>
                  El documento denominado Términos y Condiciones Generales de
                  Uso de una determinada página o sitio web es aquel que
                  contiene las normas que regulan la interacción de las personas
                  que acceden a ella (usuarias) con el contenido que la misma
                  página pone a disposición, con los productos y/o servicios
                  ofrecidos en ella, y con las personas responsables del sitio.
                  Los Términos y Condiciones de Uso constituyen un documento que
                  se ha vuelto cada vez más habitual y necesario para cualquier
                  persona que sea propietaria de un Sitio Web, o bien que
                  utilice algún tipo de servicio o host proporcionado por un
                  proveedor (como las plataformas de blogging, microblogging y
                  algunas redes sociales). Aunque en Chile no existe una
                  regulación extensiva en la misma materia, este documento se ha
                  elaborado teniendo en consideración la incipiente legislación
                  aplicable y las recomendaciones realizadas por organismos
                  públicos y no gubernamentales. Es por lo anterior que este
                  modelo de Términos y Condiciones contiene una lista extensa de
                  menciones que se consideran importantes para el correcto
                  funcionamiento de todo sitio web, generando la confianza que
                  incentive en los usuarios la interacción con la página y con
                  los productos y servicios ofrecidos en ella. En relación a los
                  sitios Web que entregan servicios o productos para que las
                  personas usuarias puedan comprar o contratar deben respetar la
                  normativa aplicable a las páginas de internet, así como
                  entregar un acceso a la información claro y conciso, velando
                  por la seguridad de las transacciones y el manejo de los datos
                  personales, especialmente aquellos relacionados con
                  información bancaria o financiera.
                </p>
              </div>
              <Form.Check
                type="checkbox"
                name="aceptoTerminos"
                checked={state.aceptoTerminos}
                onChange={handleChange}
                label="Acepto los términos y condiciones"
              />
              <br />
              <Button
               className="buttonright"
                type="submit">
                Aceptar
              </Button>{" "}
              <Button className="buttonright" variant="secondary" type="reset">
                Cancelar
              </Button>
            </Form.Group>
            <br />
            <Button type="submit">Regresar</Button>
            <Modal show={state.showModal} onHide={cerrarModal}>
            <Modal.Header closeButton>
          <Modal.Title>¡Registro Exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Link to="/login">
            Pulsa aquí para ingresar a tu perfil</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>

            </Modal>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
