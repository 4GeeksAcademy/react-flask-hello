import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AuthCallback = () => {
    const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Esperar a que Auth0 termine de cargar
                if (isLoading) {
                    return;
                }

                // Verificar si el usuario está autenticado
                if (!isAuthenticated) {
                    console.error('Usuario no autenticado');
                    navigate('/login');
                    return;
                }

                // Obtener el token de ID de Auth0
                const claims = await getIdTokenClaims();
                if (!claims) {
                    throw new Error('No se pudo obtener el token de ID');
                }

                console.log('URL del backend:', import.meta.env.VITE_BACKEND_URL);
                
                // Enviar el token al backend
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/callback`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_token: claims.__raw
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardar el token y user_id en localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user_id);
                    
                    // Redirigir al usuario a la página principal
                    navigate('/profilemainpage');
                } else {
                    throw new Error(data.msg || 'Error en la autenticación');
                }
            } catch (error) {
                console.error('Error en el callback:', error);
                alert('Error en la autenticación: ' + error.message);
                navigate('/login');
            }
        };

        handleCallback();
    }, [getIdTokenClaims, navigate, isAuthenticated, isLoading]);

    if (isLoading) {
        return <Loader />;
    }

    return <Loader />;
};

export default AuthCallback; 