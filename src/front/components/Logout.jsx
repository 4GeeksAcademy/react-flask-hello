// Función de logout que puede ser utilizada en cualquier componente
const handleLogout = async () => {

    // Guardar el tema actual antes de cerrar sesión
    const currentTheme = localStorage.getItem('userTheme');

    // Limpiar datos de sesión
    localStorage.removeItem('access_token');
    localStorage.removeItem('userData');

    // Restaurar el tema guardado
    if (currentTheme) {
        localStorage.setItem('userTheme', currentTheme);
    }

    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem('token');

        if (token) {
            // Opcionalmente notificar al backend sobre el logout
            await axios.post(`${baseUrl}api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    } catch (error) {
        console.log("Error al notificar logout al servidor:", error);
        // Continuar con el logout aunque falle la comunicación con el servidor
    } finally {
        // Restaurar el logo por defecto en userData
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        userData.logo_url = "https://raw.githubusercontent.com/4GeeksAcademy/Spain_Coho_94_First_Proyect_Da_Da_Ja/refs/heads/main/src/front/assets/logo.png";
        userData.logo_cloud_url = null;
        localStorage.setItem("userData", JSON.stringify(userData));

        // Eliminar el token de autenticación
        localStorage.removeItem('token');

        // Si tienes un tema personalizado, restaurarlo al predeterminado
        localStorage.removeItem('userTheme'); // Si guardas el tema en localStorage

        // Redireccionar al login
        window.location.href = '/login';
    }
};

export default handleLogout;