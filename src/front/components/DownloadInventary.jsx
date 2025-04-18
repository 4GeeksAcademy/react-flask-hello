import React from "react";
import axios from "axios";

/**
 * Este componente crea un botón que descarga el inventario del backend
 * como archivo Excel y permite al usuario elegir la ruta donde guardarlo.
 */
const DownloadInventoryButton = () => {
  const handleDownload = async () => {
    try {
      // Obtener el token del usuario
      const token = localStorage.getItem("token");

      // Solicitar el archivo Excel al backend
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "download-inventory",
        {
          responseType: "blob", // Importante para descargar archivos binarios
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Mostrar la ventana para que el usuario elija dónde guardar el archivo
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "inventario.xlsx",
        types: [
          {
            description: "Excel File",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            },
          },
        ],
      });

      // Escribir los datos en el archivo seleccionado
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(response.data);
      await writableStream.close();

      alert("Archivo descargado exitosamente.");
    } catch (error) {
      console.error("Error al descargar el inventario:", error);
      alert("Error al descargar el archivo: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDownload}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Descargar Inventario en Excel
      </button>
    </div>
  );
};

export default DownloadInventoryButton;
