import React, { useEffect, useState } from 'react';
import  {GoogleMapWithCustomControl}  from "../components/GoogleMapWithCustomControl";
import useGlobalReducer from "../hooks/useGlobalReducer"
import {APIProvider, useMap} from '@vis.gl/react-google-maps';

// --- Estilos CSS en línea para el formulario agrícola ---
const formStyles = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '30px',
  border: '1px solid #7cb342', // Verde un poco más oscuro
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0, 100, 0, 0.15)', // Sombra verde para profundidad
  backgroundColor: '#f0f4c3', // Un verde muy claro, casi crema
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23dcedc8\' d=\'M75.1%2C47.8C81.1%2C58.8%2C78.4%2C76.8%2C68.3%2C83.2C58.2%2C89.5%2C40.6%2C84.2%2C30%2C76.3C19.3%2C68.4%2C15.5%2C57.9%2C12.1%2C47C8.7%2C36.1%2C5.7%2C24.7%2C11.5%2C15.6C17.3%2C6.5%2C31.8%2C0.6%2C44.6%2C3.1C57.4%2C5.6%2C68.5%2C16.4%2C75.2%2C29.6C81.9%2C42.8%2C80.8%2C36.7%2C75.1%2C47.8Z\' transform=\'translate(0 0)\' stroke-width=\'0\' style=\'transition: all 0.3s ease 0s;\'%3E%3C/path%3E%3C/svg%3E")', // Pequeño patrón orgánico
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const inputGroupStyles = {
  marginBottom: '20px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#558b2f', // Verde oscuro para las etiquetas
  fontSize: '1.1em',
};

const inputStyles = {
  width: 'calc(100% - 22px)', // Ancho completo menos padding y borde
  padding: '12px',
  border: '2px solid #aed581', // Borde verde claro
  borderRadius: '6px',
  fontSize: '1em',
  color: '#333',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

const checkboxGroupStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  gap: '10px',
};

const checkboxInputStyles = {
  transform: 'scale(1.2)',
};

const buttonStyles = {
  width: '100%',
  padding: '15px 25px',
  backgroundColor: '#689f38', // Verde medio para el botón
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1em',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  boxShadow: '0 4px 8px rgba(0, 128, 0, 0.2)', // Sombra sutil para el botón
};

const buttonHoverStyles = {
  backgroundColor: '#558b2f', // Verde más oscuro al pasar el ratón
  transform: 'translateY(-2px)',
};
// --- Fin de Estilos CSS en línea ---


export const Registro = () => {
  const { store, dispatch } = useGlobalReducer()
  console.log(store)
  // Estados para cada campo del formulario
  const [nombreApellidos, setNombreApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tieneVehiculo, setTieneVehiculo] = useState(false);
  const [consumoVehiculoKm, setConsumoVehiculoKm] = useState('');
  const [coordenadas, setCoordenadas] = useState(''); // Para que el usuario ponga sus coordenadas (ej: "lat,lon")

  const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY
  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => { // <-- Asegúrate de que esta función sea 'async'
    e.preventDefault(); // Previene la recarga de la página
    console.log(store)
  

    const nuevoUser = {
      "name": nombreApellidos, // Mapea nombreApellidos a 'name' para el backend
      "email": email,
      "password": contrasena,
      "vehicle": tieneVehiculo,
      "vehicle_consume_km": tieneVehiculo ? parseFloat(consumoVehiculoKm) : null, // Convertir a número si es necesario
      "coordenates": coordenadas // Las coordenadas del mapa o introducidas manualmente
    };
    dispatch({
              type : "add_usuario",
              payload : nuevoUser
          })

    console.log('Datos del formulario de registro (nuevoUser):', nuevoUser);

    try {
      // Realiza la petición POST al backend
      const response = await fetch("https://animated-pancake-x5pjxq9vv4gj2ppgx-3001.app.github.dev/api/user/register", {
        method: "POST",
        body: JSON.stringify(nuevoUser), // Usa 'nuevoUser' aquí
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        // Manejar errores de respuesta HTTP (ej. 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || `Error en el registro: ${response.status}`);
      }

      const result = await response.json();
      console.log('Respuesta del backend (registro exitoso):', result);
      // Aquí podrías redirigir al usuario, mostrar un mensaje de éxito, etc.
      alert('¡Registro exitoso! Revisa la consola para más detalles.'); // Reemplazado alert por un mensaje más informativo

      // Opcional: Limpiar el formulario después del envío exitoso
      setNombreApellidos('');
      setEmail('');
      setContrasena('');
      setDireccion('');
      setTieneVehiculo(false);
      setConsumoVehiculoKm('');
      setCoordenadas('');

    } catch (error) {
      console.error('Error al registrar:', error);
      // Aquí puedes mostrar un mensaje de error al usuario en la UI
      alert(`Error al registrar: ${error.message}`); // Usando alert temporalmente para el error
    }
  }; // <-- Cierre correcto del handleSubmit
  useEffect(() => {
    setCoordenadas(store.lastSelectedCoordinates)

  }, [store.lastSelectedCoordinates]);
  return (
    <div style={formStyles}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px', fontSize: '2em', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
        Registro de Usuario Agrícola
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre y Apellidos */}
        <div style={inputGroupStyles}>
          <label htmlFor="nombreApellidos" style={labelStyles}>Nombre y Apellidos:</label>
          <input
            type="text"
            id="nombreApellidos"
            value={nombreApellidos}
            onChange={(e) => setNombreApellidos(e.target.value)}
            required
            style={inputStyles}
            placeholder="Ej: Juan Pérez"
          />
        </div>

        {/* Email */}
        <div style={inputGroupStyles}>
          <label htmlFor="email" style={labelStyles}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyles}
            placeholder="ejemplo@dominio.com"
          />
        </div>

        {/* Contraseña */}
        <div style={inputGroupStyles}>
          <label htmlFor="contrasena" style={labelStyles}>Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={inputStyles}
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        {/* Dirección */}
        <div style={inputGroupStyles}>
          <label htmlFor="direccion" style={labelStyles}>Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            style={inputStyles}
            placeholder="Ej: Calle del Campo 123, Pueblo, Provincia"
          />
        </div>

        {/* Checkbox: ¿Tiene vehículo de transporte? */}
        <div style={checkboxGroupStyles}>
          <input
            type="checkbox"
            id="tieneVehiculo"
            checked={tieneVehiculo}
            onChange={(e) => setTieneVehiculo(e.target.checked)}
            style={checkboxInputStyles}
          />
          <label htmlFor="tieneVehiculo" style={labelStyles}>¿Tiene vehículo de transporte?</label>
        </div>

        {/* Consumo del vehículo (condicional) */}
        {tieneVehiculo && (
          <div style={inputGroupStyles}>
            <label htmlFor="consumoVehiculo" style={labelStyles}>Consumo del vehículo (litros/100 km):</label>
            <input
              type="number"
              id="consumoVehiculo"
              value={consumoVehiculoKm}
              onChange={(e) => setConsumoVehiculoKm(e.target.value)}
              required={tieneVehiculo} // Es requerido solo si el checkbox está marcado
              style={inputStyles}
              placeholder="Ej: 8.5"
              step="0.1" // Permite números decimales
            />
          </div>
        )}


        {/* Coordenadas del punto de compraventa y el MAPA */}
        <div style={inputGroupStyles}>
          <label htmlFor="coordenadas" style={labelStyles}>Coordenadas (Latitud, Longitud):</label>
          <input
            type="text"
            id="coordenadas"
            value={coordenadas}
            onChange={(e) => setCoordenadas(e.target.value)}
            required
            style={inputStyles}
            placeholder="Arrastra el marcador en el mapa o introduce aquí"
          />
          </div>
      <div style={{width: '500px', height: '200px'}}>
      <GoogleMapWithCustomControl/>
          
       </div>     
        {/* Botón de Registro */}
        <button
          type="submit"
          style={buttonStyles}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyles)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyles)}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
