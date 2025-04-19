import { useState } from "react";
import axios from "axios";
import './Styles/Settings.css';

const InventoryUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseDebug, setResponseDebug] = useState(null);

  const token = localStorage.getItem('access_token');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const apiUrl = backendUrl.endsWith('/') 
        ? `${backendUrl}upload/inventory` 
        : `${backendUrl}/upload/inventory`;

      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

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
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setUploading(true); // Muestra algún indicador de carga si existe
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const apiUrl = backendUrl.endsWith('/') 
        ? `${backendUrl}upload/download_template`
        : `${backendUrl}/upload/download_template`;
      
      console.log("Intentando descargar de:", apiUrl);
      
      // Realizar la solicitud con axios para obtener el archivo
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        responseType: 'blob', // Importante: indica que la respuesta es un blob (archivo binario)
      });
      
      console.log("Respuesta recibida:", response);
      
      // Verificar que la respuesta tiene datos
      if (!response.data || response.data.size === 0) {
        throw new Error("El servidor devolvió un archivo vacío");
      }
      
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Crear elemento de descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'plantilla_inventario.xlsx');
      document.body.appendChild(link);
      link.click();
      
      // Limpiar después de la descarga
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
      console.log("Descarga completada");
      
    } catch (error) {
      console.error("Error al descargar la plantilla:", error);
      
      // Manejo detallado del error para mostrar información útil
      let errorMessage = "Error desconocido";
      let errorDetails = "";
      
      if (error.response) {
        console.log("Status del error:", error.response.status);
        console.log("Headers:", error.response.headers);
        
        // Si la respuesta contiene datos JSON (posible mensaje de error del servidor)
        if (error.response.data instanceof Blob) {
          try {
            // Intentar leer el blob como texto para ver si contiene un mensaje de error JSON
            const text = await error.response.data.text();
            const jsonError = JSON.parse(text);
            errorMessage = jsonError.error || error.message;
            errorDetails = jsonError.traceback || "";
            console.log("Error del servidor (en JSON):", jsonError);
          } catch (parseError) {
            console.log("No se pudo parsear el error como JSON:", parseError);
          }
        } else {
          errorMessage = error.response.data?.error || error.response.statusText || error.message;
        }
      } else if (error.request) {
        errorMessage = "No se recibió respuesta del servidor";
        console.log("Request enviada pero sin respuesta:", error.request);
      } else {
        errorMessage = error.message;
      }
      
      // Mostrar el error de forma más detallada
      alert(`Error al descargar la plantilla: ${errorMessage}`);
      
      // Si hay detalles adicionales, mostrarlos en la consola
      if (errorDetails) {
        console.error("Detalles adicionales del error:", errorDetails);
      }
      
      setResponseDebug({
        error: true,
        message: errorMessage,
        details: errorDetails,
        originalError: error.toString()
      });
    } finally {
      setUploading(false); // Oculta el indicador de carga
    }
  };

  return (
    <div className="option_panel">
      <div className="inventary_btn">
        <button className="inventary" onClick={handleDownloadTemplate}>
          Descargar plantilla Excel
        </button>
      </div>
      <div className="excel-uploader p-4">
        <h1>Cargar Inventario desde Excel</h1>
        <p className="text-sm text-gray-600 mb-2">
          El archivo Excel debe contener las siguientes columnas:
          <strong> nombre_del_producto, precio_por_unidad, descripción, unidades</strong>
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
      </div>
    </div>
  );
};

export default InventoryUploader;
