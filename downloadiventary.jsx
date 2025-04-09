import axios from "axios";

export default function DownloadExcelButton() {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/download-excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventario.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <button onClick={handleDownload} className="p-2 bg-green-500 text-white rounded">
      Descargar Excel
    </button>
  );
}
