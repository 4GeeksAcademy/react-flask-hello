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

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return alert("Por favor, selecciona un archivo Excel válido (.xlsx o .xls)");
    }

    setUploading(true);
    setResponseDebug(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Subiendo a:", `${import.meta.env.VITE_BACKEND_URL}upload/inventory`);
      console.log("Token usado:", token);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/inventory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },

        }
      );

      // Mostrar los detalles de la respuesta
      setResponseDebug({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      alert(response.data.message);
      console.log("URL del archivo en Tigris:", response.data.file_url);
    } catch (error) {
      console.error("Error al subir archivo:", error);

      let errorMessage = "Error desconocido";

      if (error.response) {
        console.log("Datos de la respuesta de error:", error.response.data);
        errorMessage = error.response.data.error || error.message;
      } else {
        errorMessage = error.message;
      }

      // Manejo de error detallado
      setResponseDebug({
        error: true,
        message: errorMessage,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : "Sin respuesta del servidor"
      });

      alert("Error al subir archivo: " + errorMessage);
    } finally {
      setUploading(false); // Terminamos el proceso de carga
    }
  };

  // El JSX debe estar aquí, fuera de handleUpload
  return (
    <div className="option_panel">
      <div className="inventary_btn">
        <button className="inventary">Add Inventory</button>
      </div>
      <div className="excel-uploader p-4">
        <h1>Cargar Inventario desde Excel</h1>
        <p className="text-sm text-gray-600 mb-2">
          El archivo Excel debe contener las siguientes columnas:
          <strong>nombre_del_producto, precio_por_unidad, descripción, unidades</strong>
        </p>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            disabled={uploading}
            id="fileInput"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white"
            disabled={uploading}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;