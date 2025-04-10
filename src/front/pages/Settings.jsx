import { useState } from "react";
import axios from "axios";

import './Styles/Settings.css';

const Settings = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseDebug, setResponseDebug] = useState(null);
  const token = localStorage.getItem('acces_token')

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
      
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "api/upload/upload-inventory",
        formData,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: false,
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
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Settings;