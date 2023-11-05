import Swal from 'sweetalert2'

const showAlert = (iconType, message) => {

    Swal.fire({
        position: 'top-center',
        icon: iconType,
        title: message,
        showConfirmButton: false,
        timer: 2000
    });
}


export default showAlert