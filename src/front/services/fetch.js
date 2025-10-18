
const URL_BASE_API = "https://datosabiertos.navarra.es/datastore/dump/f1fc5b52-be72-4088-8cb1-772076e2071c?format=json&bom=True"
const OWN_API = "https://bug-free-yodel-jwg59wpw7g5f5jpv-3001.app.github.dev"


async function register(userData) {
  try {
    const response = await fetch(`${OWN_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error('Error en el registro:', data.msg || data.Error);
      alert(`Error: ${data.msg || data.Error}`);
      return;
    }

    console.log('Registro exitoso:', data);
    alert('¡Te has registrado con éxito! Ahora puedes iniciar sesión.');


  } catch (error) {
    console.error('Error de red al registrar:', error);
    alert('Error de conexión. Inténtalo más tarde.');
  }
}


async function login(email, password, role) {
  // Determinamos la URL correcta según el rol
  const loginUrl = `${OWN_API}/login/${role}`;

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error('Error de login:', data.msg);
      alert(`Error: ${data.msg}`);
      return;
    }

    // Guardamos el token y el rol en localStorage
    localStorage.setItem('jwt_token', data.token);
    localStorage.setItem('user_role', role);

    console.log('Login exitoso. Token guardado.');

    // Ahora que tenemos el token, pedimos los datos protegidos
    await getProfile();

  } catch (error) {
    console.error('Error de red al iniciar sesión:', error);
    alert('Error de conexión. Inténtalo más tarde.');
  }
}

// Obtener perfil (ruta protegida)

async function getProfile() {
  // 1. Recuperamos el token y el rol de localStorage
  const token = localStorage.getItem('jwt_token');
  const role = localStorage.getItem('user_role');

  if (!token || !role) {
    console.log('No se encontró token o rol. Debes iniciar sesión.');

    return;
  }

  // 2. Determinamos la URL protegida correcta
  const protectedUrl = `${OWN_API}/protected/${role}`;

  try {
    const response = await fetch(protectedUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const userData = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error('Error al obtener datos protegidos:', userData.msg);
      alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_role');
      // window.location.href = '/login';
      return;
    }

    // Guardamos los datos completos del usuario en localStorage
    localStorage.setItem('current_user', JSON.stringify(userData));

    console.log('Datos del usuario guardados:', userData);

  } catch (error) {
    console.error('Error de red al obtener datos protegidos:', error);
  }
}