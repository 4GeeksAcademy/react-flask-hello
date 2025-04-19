import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../Styles/InventoryPanel.css";

const InventoryPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    price_per_unit: 0,
    description: "",
    quantity: 0,
    image_url: ""
  });
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("access_token");

  // Verificar autenticación y cargar productos al inicio
  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Primero intentamos obtener productos del usuario actual
      const response = await axios.get(`${baseUrl}/upload/get-user-products`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.data && response.data.productos) {
        setProducts(response.data.productos);
      } else {
        // Si no hay endpoint específico, usamos el general
        const fallbackResponse = await axios.get(`${baseUrl}/upload/get_all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (fallbackResponse.data && fallbackResponse.data.productos) {
          setProducts(fallbackResponse.data.productos);
        }
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setError("No se pudieron cargar los productos. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir a número si el campo es numérico
    if (name === "price_per_unit" || name === "quantity") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setFormData({
      product_name: product.product_name,
      price_per_unit: product.price_per_unit,
      description: product.description || "",
      quantity: product.quantity,
      image_url: product.image_url
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setFormData({
      product_name: "",
      price_per_unit: 0,
      description: "",
      quantity: 0,
      image_url: ""
    });
  };

  const saveProduct = async () => {
    try {
      if (!editingProduct) return;

      const response = await axios.put(
        `${baseUrl}/upload/update-product/${editingProduct}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        // Actualizar la lista de productos
        setProducts(products.map(product => 
          product.id === editingProduct ? { ...product, ...formData } : product
        ));
        
        cancelEditing();
        
        // Mostrar mensaje de éxito
        alert("Producto actualizado correctamente");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto. Por favor, intenta de nuevo.");
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${baseUrl}/upload/delete-product/${productId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        // Eliminar el producto de la lista local
        setProducts(products.filter(product => product.id !== productId));
        
        // Mostrar mensaje de éxito
        alert("Producto eliminado correctamente");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto. Por favor, intenta de nuevo.");
    }
  };

  // Maneja el cambio del archivo seleccionado
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Maneja la carga del archivo Excel
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Selecciona un archivo primero.");
      return;
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert("Por favor, selecciona un archivo Excel válido (.xlsx o .xls)");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${baseUrl}/upload/inventory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      // Recargar productos después de subir el inventario
      fetchProducts();
      setShowUpload(false);
      setFile(null);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      let errorMessage = "Error desconocido";

      if (error.response) {
        errorMessage = error.response.data.error || error.message;
      } else {
        errorMessage = error.message;
      }

      alert("Error al subir archivo: " + errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // Redirigir si no está autenticado
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="loading-container">Cargando...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="inventory-panel">
      <h1 className="panel-title">Panel de Administración de Inventario</h1>
      
      <div className="panel-actions">
        <button 
          className="action-button upload-button"
          onClick={() => setShowUpload(!showUpload)}
        >
          {showUpload ? 'Cancelar' : 'Subir Inventario Excel'}
        </button>
      </div>
      
      {showUpload && (
        <div className="upload-container">
          <h2>Cargar Inventario desde Excel</h2>
          <p className="upload-info">
            El archivo Excel debe contener las siguientes columnas:
            <strong> nombre_del_producto, precio_por_unidad, descripción, unidades</strong>
          </p>
          <form onSubmit={handleUpload} className="upload-form">
            <div className="file-input-container">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                disabled={uploading}
                id="fileInput"
              />
              <label htmlFor="fileInput" className="file-label">
                {file ? file.name : "Seleccionar archivo Excel"}
              </label>
            </div>
            <button
              type="submit"
              className="action-button"
              disabled={uploading}
            >
              {uploading ? "Subiendo..." : "Subir Inventario"}
            </button>
          </form>
        </div>
      )}
      
      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {editingProduct === product.id ? (
                      <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      product.product_name
                    )}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input
                        type="number"
                        name="price_per_unit"
                        value={formData.price_per_unit}
                        onChange={handleInputChange}
                        className="edit-input"
                        step="0.01"
                      />
                    ) : (
                      `${product.price_per_unit.toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="edit-input"
                        rows="2"
                      />
                    ) : (
                      product.description
                    )}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <img 
                        src={product.image_url} 
                        alt={product.product_name} 
                        className="product-thumbnail" 
                      />
                    )}
                  </td>
                  <td>
                    {editingProduct === product.id ? (
                      <div className="btn-group">
                        <button
                          className="save-btn"
                          onClick={saveProduct}
                        >
                          Guardar
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={cancelEditing}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="btn-group">
                        <button
                          className="edit-btn"
                          onClick={() => startEditing(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-products">
                  No hay productos en el inventario. 
                  <br />
                  Puedes subir un archivo Excel para empezar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPanel;