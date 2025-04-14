import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Reports.css'; // Asegúrate que esté importado
import {useGlobalReducer} from "../../hooks/useGlobalReducer"; // ✅ Import del global store

const Report = ({ fieldId, onClose, onUploaded }) => {
  const { store } = useGlobalReducer(); // ✅ Hook global
  const token = store.auth.token;
  const userId = store.auth.userId;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    }
  });

  const handleUpload = async () => {
    if (!file || !userId || !fieldId) {
      alert('Faltan datos');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    formData.append('field_id', fieldId);
    formData.append('title', title);
    formData.append('description', description);

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report_routes/upload_report`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}` // ✅ Token desde global store
      },
      body: formData
    });

    if (res.ok) {
      alert('Archivo subido');
      setFile(null);
      setTitle('');
      setDescription('');
      if (onUploaded) onUploaded();
      if (onClose) onClose();
    } else {
      alert('Error al subir el archivo');
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
