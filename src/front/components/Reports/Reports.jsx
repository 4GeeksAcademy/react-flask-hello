import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Reports.css';
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

const Report = ({ fieldId, fields = [], userId: userIdProp, onClose, onUploaded }) => {
  const { store } = useGlobalReducer();
  const token = store.auth.token;
  const userId = userIdProp || store.auth.userId;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState(fieldId || '');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    }
  });

  const handleUpload = async () => {
    const finalFieldId = selectedFieldId || fieldId;
    if (!file || !userId || !finalFieldId) {
      alert('Faltan datos');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    formData.append('field_id', finalFieldId);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report_routes/upload_report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert('📁 Informe subido correctamente');
        setFile(null);
        setTitle('');
        setDescription('');
        setSelectedFieldId('');
        if (onUploaded) onUploaded();
        if (onClose) onClose();
      } else {
        alert('❌ Error al subir el informe');
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert('❌ Error de red al subir el informe');
    }
  };

  return (
    <div className="report-modal-content">
      <h3 className="modal-title">Subir nuevo informe</h3>

      <div {...getRootProps()} className="dropzone-area">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta el archivo aquí...</p>
        ) : file ? (
          <p>{file.name}</p>
        ) : (
          <p>Arrastra un archivo aquí o haz clic para seleccionar</p>
        )}
      </div>

      {/* Selector de tierra si viene el listado */}
      {!fieldId && fields.length > 0 && (
        <select
          className="modal-input"
          value={selectedFieldId}
          onChange={(e) => setSelectedFieldId(e.target.value)}
        >
          <option value="">Selecciona una parcela</option>
          {fields.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} ({f.area} HCT)
            </option>
          ))}
        </select>
      )}

      <input
        type="text"
        className="modal-input"
        placeholder="Título del informe"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="modal-textarea"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <div className="modal-actions">
        <button className="modal-btn" onClick={onClose}>Cancelar</button>
        <button className="modal-btn primary" onClick={handleUpload}>Subir</button>
      </div>
    </div>
  );
};

export default Report;
