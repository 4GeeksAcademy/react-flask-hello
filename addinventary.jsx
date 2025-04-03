import { useState } from "react";
import axios from "axios";

export default function ExcelUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo primero.");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} className="p-2 bg-blue-500 text-white">
        Subir Archivo
      </button>
    </div>
  );
}
