// 👇 ❇️ Riki for the group success 9_Abril 👊

// modal_alerts.jsx - Servicio reutilizable para toda la app
import Swal from 'sweetalert2';

// Configuración centralizada de estilos y fuentes
const modalStyles = {
  titleFont: 'Montserrat, sans-serif',
  textFont: 'Roboto, sans-serif',
  errorColor: '#d33',
  successColor: '#28a745',
  titleColor: '#4682B4',
  textColor: '#333',
};

// Función de error (sin cambios)
export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: modalStyles.errorColor,
    background: '#f8f9fa',
    customClass: {
      title: 'modal-title-error',
      htmlContainer: 'modal-text',
    },
  });
};

// Función de éxito MODIFICADA (sin logo)
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
    if (callback) callback();
  });
};

// Resto del archivo sin cambios
export const showLoadingAlert = () => {
  Swal.fire({
    title: 'Cargando...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    background: '#f8f9fa',
    customClass: {
      title: 'modal-title-success',
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};