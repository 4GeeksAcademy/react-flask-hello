import { useState } from "react";
import axios from "axios";
import './Styles/Settings.css';

const Settings = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseDebug, setResponseDebug] = useState(null);

  // Obtenemos el token de localStorage para enviarlo con la solicitud
  const token = localStorage.getItem('token');

  // Maneja el cambio del archivo seleccionado
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Maneja la carga del archivo
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return alert("Selecciona un archivo primero.");

    setUploading(true);
    setResponseDebug(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Realizamos la petición POST con axios y enviamos el token en los headers
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "upload-inventory", // Asegúrate de que esta URL sea correcta
        formData,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
          },

          // El navegador se encargará de enviarlo automáticamente con cada solicitud si el token está en las cookies
          withCredentials: true, 
        }
      );

      // Mostrar los detalles de la respuesta
      setResponseDebug({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      alert(response.data.message); // Mostrar el mensaje de respuesta

    } catch (error) {
      console.error("Error al subir archivo:", error);

      // Manejo de error detallado
      setResponseDebug({
        error: true,
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : "Sin respuesta del servidor"
      });

      alert("Error al subir archivo: " + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false); // Terminamos el proceso de carga
    }
  };

  return (
    <div className="option_panel">
      <div className="inventary_btn">
        <button className="inventary">Add Inventory</button>
      </div>
      <div className="excel-uploader p-4">
        <h1>Cargar Inventario desde Excel</h1>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            disabled={uploading} // Deshabilitamos el input si estamos subiendo
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white"
            disabled={uploading} // Deshabilitamos el botón si estamos subiendo
          >
            {uploading ? "Subiendo..." : "Subir a Tigris Data"}
          </button>
        </form>

        {responseDebug && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <h4>Información de la respuesta:</h4>
            {responseDebug.error ? (
              <>
                <p className="text-red-500">Error: {responseDebug.message}</p>
                <pre className="bg-gray-800 text-white p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(responseDebug.response, null, 2)}
                </pre>
              </>
            ) : (
              <>
                <p>Status: {responseDebug.status} {responseDebug.statusText}</p>
                <p>Content-Type: {responseDebug.headers["content-type"]}</p>
                <pre className="bg-gray-800 text-white p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(responseDebug.data, null, 2)}
                </pre>
                {responseDebug.data.download_url && (
                  <a
                    href={responseDebug.data.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Descargar archivo guardado
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
