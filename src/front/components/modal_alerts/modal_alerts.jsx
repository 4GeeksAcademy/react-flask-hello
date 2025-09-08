// 👇 ❇️ Riki for the group success 👊
// modal_alerts.jsx - Servicio reutilizable para toda la app

import Swal from 'sweetalert2';

// Configuración centralizada de estilos y fuentes
const modalStyles = {
  titleFont: 'Montserrat, sans-serif', // Coherente con h1, h2, h3
  textFont: 'Roboto, sans-serif',      // Coherente con el body
  errorColor: '#d33',                 // Rojo para errores
  successColor: '#28a745',            // Verde para éxito
  titleColor: '#4682B4',              // Color de títulos (como en index.css)
  textColor: '#333',                  // Color de texto base (como en index.css)
};

/**
 * Muestra un modal de error con mensaje personalizado.
 * @param {string} message - Mensaje a mostrar.
 */
export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: modalStyles.errorColor,
    background: '#f8f9fa', // Fondo coherente con Layout.css
    customClass: {
      title: 'modal-title-error', // Clase para títulos
      htmlContainer: 'modal-text', // Clase para texto
    },
  });
};

/**
 * Muestra un modal de éxito con mensaje y callback opcional (ej: redirección).
 * @param {string} message - Mensaje a mostrar.
 * @param {function} [callback] - Función a ejecutar al cerrar el modal.
 */
export const showSuccessAlert = (message, callback = null) => {
  Swal.fire({
    title: '¡Éxito!',
    text: message,  // ✅ Versión simplificada
    icon: 'success',
    confirmButtonColor: modalStyles.successColor,
    background: '#f8f9fa',
    timer: 3000,    // ✅ Cierre automático en 3s
    timerProgressBar: true,
    showConfirmButton: false, // ✅ Oculta el botón "OK"
    customClass: {
      title: 'modal-title-success',
      htmlContainer: 'modal-text',
    },
  }).then(() => {
    if (typeof callback === 'function') {
      callback();
    }
  });
};
/**
 * Muestra un modal de carga (spinner).
 */
export const showLoadingAlert = () => {
  Swal.fire({
    title: 'Cargando...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    background: '#f8f9fa',
    customClass: {
      title: 'modal-title-success', // Reutiliza estilos de éxito
    },
  });
};

/**
 * Cierra cualquier modal activo.
 */
export const closeAlert = () => {
  Swal.close();
};