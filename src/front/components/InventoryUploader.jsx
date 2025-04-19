import { useState } from "react";
import axios from "axios";
import './Styles/Settings.css';

const InventoryManager = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [responseDebug, setResponseDebug] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const token = localStorage.getItem('access_token');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadSuccess(false);
  };

  // Subir inventario inicial
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
      
      setUploadSuccess(true);
    } catch (error) {
      handleError(error, "subir");
    } finally {
      setUploading(false);
    }
  };

  // Actualizar inventario existente
  const handleUpdateInventory = async (event) => {
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
        ? `${backendUrl}upload/update_inventory` 
        : `${backendUrl}/upload/update_inventory`;

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
      console.log("Inventario actualizado");
      
      setUploadSuccess(true);
    } catch (error) {
      handleError(error, "actualizar");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadInventory = async () => {
    try {
      setDownloading(true);
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const apiUrl = backendUrl.endsWith('/') 
        ? `${backendUrl}upload/download_inventory`
        : `${backendUrl}/upload/download_inventory`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        responseType: 'blob', // Importante: indica que la respuesta es un blob (archivo binario)
      });
      
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Crear elemento de descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mi_inventario.xlsx');
      document.body.appendChild(link);
      link.click();
      
      // Limpiar después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
    } catch (error) {
      handleError(error, "descargar");
    } finally {
      setDownloading(false);
    }
  };
  
  // Función para manejar errores
  const handleError = (error, action) => {
    console.error(`Error al ${action}:`, error);
    let errorMessage = "Error desconocido";
    
    try {
      if (error.response && error.response.data instanceof Blob) {
        // Para errores en formato blob
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonError = JSON.parse(reader.result);
            errorMessage = jsonError.error || error.message;
            alert(`Error al ${action}: ${errorMessage}`);
          } catch (e) {
            errorMessage = `Error al ${action} (no se pudo procesar)`;
            alert(errorMessage);
          }
        };
        reader.readAsText(error.response.data);
      } else if (error.response) {
        errorMessage = error.response.data?.error || error.response.statusText || error.message;
        alert(`Error al ${action}: ${errorMessage}`);
      } else {
        errorMessage = error.message;
        alert(`Error al ${action}: ${errorMessage}`);
      }
    } catch (e) {
      alert(`Error al ${action}: ${error.message || "Error desconocido"}`);
    }
    
    setResponseDebug({
      error: true,
      message: errorMessage,
      action: action,
      original: error.toString()
    });
  };

  return (
    <div className="option_panel">
      <div className="inventory-manager p-4">
        <h1>Gestión de Inventario</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Botón de descarga siempre visible */}
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleDownloadInventory}
            disabled={downloading}
          >
            {downloading ? "Descargando..." : "Descargar mi inventario actual"}
          </button>
          
          {/* Información */}
          <div className="text-sm text-gray-600">
            Descarga tu inventario actual para revisarlo o modificarlo.
            Este proceso no afecta a los datos de tu tienda.
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Subir cambios de inventario</h2>
          <p className="text-sm text-gray-600 mb-2">
            El archivo Excel debe contener las columnas:
            <strong> nombre_del_producto, precio_por_unidad, descripción, unidades</strong>
          </p>
          
          <form className="flex flex-col gap-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              disabled={uploading}
              id="fileInput"
              className="p-2 border rounded"
            />
            
            <div className="flex flex-col md:flex-row gap-2">
              <button
                type="button"
                className="p-2 bg-green-500 text-white rounded"
                onClick={handleUpdateInventory}
                disabled={uploading || !file}
              >
                {uploading ? "Procesando..." : "Actualizar inventario existente"}
              </button>
              
              <button
                type="button"
                className="p-2 bg-purple-500 text-white rounded"
                onClick={handleUpload}
                disabled={uploading || !file}
              >
                {uploading ? "Procesando..." : "Subir como nuevo inventario"}
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>Actualizar inventario:</strong> Modifica los productos existentes y añade nuevos.</p>
              <p><strong>Subir como nuevo:</strong> Reemplaza completamente el inventario anterior (¡usar con precaución!).</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;