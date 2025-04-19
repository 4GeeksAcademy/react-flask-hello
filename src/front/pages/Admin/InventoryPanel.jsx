import axios from "axios";
import "../Styles/InventoryPanel.css";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ErrorMessage1 from "../../components/ErrorMessage1";
import ErrorMessage2 from "../../components/ErrorMessage2";

const InventoryPanel = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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

  //---------LLAMO A LOS PRODUCTOS DEL INVENTARIO PARA TRAERLOS A MI PANEL----GET--------------
  //-----USO CURRENTINVENTORY PARA TRAER EL NOBRE DEL DOCUMENTO Y REFLEJARO EN EL PANE---------

  // ---me da el nombre del documento para reflejarlo en el panel y saber 1. que el documento esta y 2. que invetario es----
  const [currentInventory, setCurrentInventory] = useState(null);

  // ----arrancamos la funcion fetch-----------
  const fetchProducts = async () => {
    try {
      setLoading(true);

      //---- pido la informacion de los productos
      const productsResponse = await axios.get(`${baseUrl}/upload/get-user-products`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (productsResponse.data && productsResponse.data.productos) {
        setProducts(productsResponse.data.productos);

        //----- traemos la información del inventario actual-------
        try {
          const inventoryResponse = await axios.get(`${baseUrl}/upload/current-inventory-info`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          if (inventoryResponse.data && inventoryResponse.data.inventory_info) {
            setCurrentInventory(inventoryResponse.data.inventory_info);
          }
        } catch (inventoryError) {
          console.log("No se pudo obtener información del inventario actual", inventoryError);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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


  //---------------ELIMINO LOS PRODUCTOS DEL INVENTARIO DESDE MI PANEL-------DELETE---------

  // Función para mostrar el modal de confirmación de eliminación
  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  // Función para eliminar un producto
  const deleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await axios.delete(
        `${baseUrl}/upload/delete-product/${productToDelete}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        // Eliminar el producto de la lista local
        setProducts(products.filter(product => product.id !== productToDelete));

        // Mostrar mensaje de éxito personalizado
        setSuccessMessage("Producto eliminado correctamente");
        setTimeout(() => setSuccessMessage(null), 3000);

        // Cerrar el modal de confirmación
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);

      if (error.response && error.response.status === 403) {
        setErrorMessage("No tienes permiso para eliminar este producto");
      } else {
        setErrorMessage("Error al eliminar el producto. Por favor, intenta de nuevo.");
      }

      // Cerrar el modal de confirmación
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  //--------MODIFICO LOS PRODUCTOS DEL INVENTARIO DESDE MI PANEL-----PUT------

  const saveProduct = async () => {
    try {
      if (!editingProduct) return;

      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const apiUrl = baseUrl.endsWith('/')
        ? `${baseUrl}upload/update-product/${editingProduct}`
        : `${baseUrl}/upload/update-product/${editingProduct}`;

      const response = await axios.put(
        apiUrl,
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

        // Mostrar mensaje de éxito personalizado
        setSuccessMessage("Producto actualizado correctamente");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setErrorMessage("Error al actualizar el producto. Por favor, intenta de nuevo.");
    }
  };

  // Función para manejar la carga del archivo Excel
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Selecciona un archivo primero.");
      return;
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setErrorMessage("Por favor, selecciona un archivo Excel válido (.xlsx o .xls)");
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

      setSuccessMessage(response.data.message);
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

      setErrorMessage("Error al subir archivo: " + errorMessage);
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

      {/* Mensajes de error y éxito */}
      {errorMessage && (
        <ErrorMessage2
          text={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {successMessage && (
        <ErrorMessage2
          text={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {/* Modal de confirmación para eliminar producto */}
      {showDeleteConfirm && (
        <div className="overlay">
          <div className="message-box error">
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="confirm-buttons">
              <button type="button" className="box-btn" onClick={deleteProduct}>
                Eliminar
              </button>
              <button type="button" className="box-btn" onClick={cancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="panel-actions">
        <div className="current-inventory-info">
          {currentInventory ? (
            <div>
              <span className="inventory-label">Tu inventario actual es: </span>
              <span className="inventory-name">{currentInventory.name}</span>
              {currentInventory.last_updated && (
                <span className="inventory-date">
                  (Última actualización: {new Date(currentInventory.last_updated).toLocaleDateString()})
                </span>
              )}
            </div>
          ) : products.length > 0 ? (
            <span className="inventory-label">Inventario activo</span>
          ) : (
            <span className="inventory-label">No tienes inventario activo</span>
          )}
        </div>

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
                          onClick={() => confirmDelete(product.id)}
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