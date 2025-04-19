import React, { useState } from 'react';
import { uploadLogo } from '../../api/uploadApi';

const LogoUploader = ({ currentLogo, onLogoUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Solo se permiten archivos JPG y PNG');
      return;
    }
    
    // Validar tamaño (por ejemplo, máximo 1MB)
    if (file.size > 1024 * 1024) {
      setError('El logo no debe superar 1MB');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      const response = await uploadLogo(formData);
      onLogoUpdate(response.url);
    } catch (err) {
      setError('Error al subir el logo. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="logo-uploader">
      <div className="current-logo">
        {currentLogo ? (
          <img src={currentLogo} alt="Logo actual" className="logo-preview" />
        ) : (
          <div className="no-logo">No hay logo</div>
        )}
      </div>
      
      <input
        type="file"
        id="logo-upload"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="file-input"
      />
      <label htmlFor="logo-upload" className="upload-button">
        {uploading ? 'Subiendo...' : 'Seleccionar logo'}
      </label>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="logo-info">
        <small>Formatos permitidos: JPG, PNG</small>
        <small>Tamaño máximo: 1MB</small>
        <small>Dimensiones recomendadas: 200x200 píxeles</small>
      </div>
    </div>
  );
};

export default LogoUploader;