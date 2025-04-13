// Componente para mostrar la vista previa del PDF
console.log("PdfDocumentWrapper se está renderizando", location.state);
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import './PdfDocumentWrapper.css';

const PdfDocumentWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfData = location.state || {};

  // Si no hay datos, mostramos un mensaje
  if (!pdfData || !pdfData.user) {
    return (
      <div className="pdf-wrapper-container">
        <div className="pdf-wrapper-error">
          <h2>No se encontraron datos para el PDF</h2>
          <p>Por favor, vuelve a la página de presupuestos para generar uno nuevo.</p>
          <button 
            onClick={() => navigate('/app/quote')}
            className="pdf-wrapper-button"
          >
            Volver a Presupuestos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-wrapper-container">
      <div className="pdf-wrapper-header">
        <h1 className="pdf-wrapper-title">Vista Previa del Presupuesto</h1>
        <button 
          onClick={() => navigate('/app/quote')}
          className="pdf-wrapper-button"
        >
          Volver a Presupuestos
        </button>
      </div>
      
      <div className="pdf-wrapper-viewer">
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          <PdfDocument
            user={pdfData.user || ""}
            field={pdfData.field || ""}
            cropType={pdfData.cropType || ""}
            hectares={pdfData.hectares || 0}
            services={pdfData.services || ""}
            frequency={pdfData.frequency || ""}
            pricePerHectare={pdfData.pricePerHectare || 0}
            total={pdfData.total || 0}
            validUntil={pdfData.validUntil || ""}
          />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PdfDocumentWrapper;