import Swal from 'sweetalert2'

const showAlertLonger = (iconType, message) => {

    Swal.fire({
        position: 'top-center',
        icon: iconType,
        title: message,
        showConfirmButton: false,
        allowOutsideClick: false, 
        showCloseButton: true, 
        footer: '<a href=""></a>'
    });
}

export default showAlertLonger