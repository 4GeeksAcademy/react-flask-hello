import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const StoreSettings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState({
    store_name: '',
    store_description: '',
    bank_account: '',
    logo_url: '',
    // Otros campos necesarios
  });

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }
      
      // Aquí podrías validar el token con el backend si es necesario
      setIsAuthenticated(true);
      
      // Cargar datos de la tienda solo si está autenticado
      fetchStoreData();
    };

    const fetchStoreData = async () => {
      try {
        // Aquí iría la llamada a tu API para obtener los datos de la tienda
        // Por ahora usamos datos de ejemplo
        setStoreData({
          store_name: 'Mi Tienda',
          store_description: 'Descripción de la tienda',
          bank_account: 'ES76 2100 0418 4012 3456 7890',
          logo_url: '',
        });
      } catch (error) {
        console.error("Error al cargar datos de la tienda:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Redirigir si no está autenticado
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    console.log("Datos a guardar:", storeData);
    alert("Datos guardados correctamente (simulación)");
  };

  return (
    <div className="container">
      <h1>Datos del Comercio</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="store_name">Nombre del Comercio</label>
          <input
            type="text"
            id="store_name"
            name="store_name"
            value={storeData.store_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="store_description">Descripción</label>
          <textarea
            id="store_description"
            name="store_description"
            value={storeData.store_description}
            onChange={handleChange}
            className="form-control"
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bank_account">Cuenta Bancaria (para recibir pagos)</label>
          <input
            type="text"
            id="bank_account"
            name="bank_account"
            value={storeData.bank_account}
            onChange={handleChange}
            className="form-control"
          />
          <small className="form-text text-muted">Esta información es solo para demostración.</small>
        </div>
        
        <div className="form-group">
          <label>Logo del Comercio</label>
          <div className="custom-file">
            <input 
              type="file" 
              className="custom-file-input" 
              id="logo-upload"
              accept=".jpg,.jpeg,.png"
            />
            <label className="custom-file-label" htmlFor="logo-upload">
              Seleccionar archivo
            </label>
          </div>
          <small className="form-text text-muted">Formatos permitidos: JPG, PNG. Tamaño máximo: 1MB</small>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default StoreSettings;