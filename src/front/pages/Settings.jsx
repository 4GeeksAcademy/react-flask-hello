import { useState } from "react";
import axios from "axios";
import './Styles/Settings.css';

const Settings = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseDebug, setResponseDebug] = useState(null);
  const token = localStorage.getItem('token');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return alert("Selecciona un archivo primero.");

    setUploading(true);
    setResponseDebug(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "upload-inventory",formData, // Asegúrate de que esta URL es correcta
        formData,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true, // Cambié a true si el backend maneja cookies
        }
      );

      setResponseDebug({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      alert(response.data.message);

    } catch (error) {
      console.error("Error al subir archivo:", error);

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
      setUploading(false);
    }
  };

  return (
    <div className="option_panel">
      <div className="inventary_btn">
        <button className="inventary">Add Inventory</button>
      </div>
      <div className="excel-uploader p-4">
        <h3>Cargar Inventario desde Excel</h3>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            disabled={uploading}
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
