import axios from "axios";


export default function DownloadExcelButton() {
  const handleDownload = async () => {
    try {
      const response = await axios.get("https://fluffy-space-spoon-v6q9vgr5vqjx2w5vx-3001.app.github.dev/download-excel", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const fileURL = window.URL.createObjectURL(blob);

      // Crear link para forzar ventana de guardar
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "inventario.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error al descargar:", error);
    }
  };

  return (
    <div className="p-4">
      
  
    <button onClick={handleDownload} className="p-2 bg-blue-500 text-white rounded">
      Download
    </button>
    </div>
  );
  
}
