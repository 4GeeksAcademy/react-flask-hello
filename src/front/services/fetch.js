const URL_BASE_API =
  "https://datosabiertos.navarra.es/datastore/dump/f1fc5b52-be72-4088-8cb1-772076e2071c?format=json&bom=True";
export const OWN_API =
  "https://haunted-spooky-werewolf-69j69rw6p76hq44-3001.app.github.dev/";

async function register(userData) {
  //variable con el rol del usuario
  const role = userData.role;
  let endpointPath;

  //if si es doctor o paciente, cambia el endpoint
  if (role == 'paciente') {
    return registerPatient(userData)
  } else if (role == 'doctor') {
    //return registerDoctor(userData)
    return registerDoctor(userData)
  } else {
    return { success: false, message:"Rol no valido o no definido"}
  }
  //Este codigo estaba antes aqui ->
  /*
  try {
    const response = await fetch(`${OWN_API}api/register/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error("Error en el registro:", data.msg || data.Error);
      alert(`Error: ${data.msg || data.Error}`);
      return;
    }

    console.log("Registro exitoso:", data);
    alert("¡Te has registrado con éxito! Ahora puedes iniciar sesión.");
  } catch (error) {
    console.error("Error de red al registrar:", error);
    alert("Error de conexión. Inténtalo más tarde.");
  }*/
 //aqui termina funcion register
}

//aqui nos enfocamos unicamente a mandar la info a la API
async function registerPatient(userData) {
  try {
    const response = await fetch (`${OWN_API}api/register/patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    

    const data = await response.json();

    if (!response.ok) {
      //devolver el error 400 o lo que sea
      const errorMessage = `Error: ${response.status} fallo al registrar`;
      console.error('error con el registro de paciente', errorMessage);
      return {success: false, message: errorMessage};
    }

    console.log('Registro de paciente exitoso', data);
    return {success: true, data: data, role: 'paciente'}

  } catch (error) {
    //error de red
    console.error('error de red al registrar el paciente', error);
    return{success: false, message: 'error de conexion'}
  }
}

async function registerDoctor(userData) {
  try {
    const response = await fetch (`${OWN_API}api/register/doctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    

    const data = await response.json();

    if (!response.ok) {
      //devolver el error 400 o lo que sea
      const errorMessage = `Error: ${response.status} fallo al registrar`;
      console.error('error con el registro de doctor', errorMessage);
      return {success: false, message: errorMessage};
    }

    console.log('Registro de doctor exitoso', data);
    return {success: true, data: data, role: 'doctor'};

  }catch (error) {
    //error de red
    console.error('error de red al registrar el doctor', error);
    return{success: false, message: 'error de conexion'}
  }
}
//a partir de aqui no he tocado nada
//para login digo yo que podemos hacer lo mismo.
async function login(email, password, role) {
  // Determinamos la URL correcta según el rol
  const loginUrl = `${OWN_API}/login/${role}`;

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error("Error de login:", data.msg);
      alert(`Error: ${data.msg}`);
      return;
    }

    // Guardamos el token y el rol en localStorage
    localStorage.setItem("jwt_token", data.token);
    localStorage.setItem("user_role", role);

    console.log("Login exitoso. Token guardado.");

    // Ahora que tenemos el token, pedimos los datos protegidos
    await getProfile();
  } catch (error) {
    console.error("Error de red al iniciar sesión:", error);
    alert("Error de conexión. Inténtalo más tarde.");
  }
}

// Obtener perfil (ruta protegida)

async function getProfile() {
  // 1. Recuperamos el token y el rol de localStorage
  const token = localStorage.getItem("jwt_token");
  const role = localStorage.getItem("user_role");

  if (!token || !role) {
    console.log("No se encontró token o rol. Debes iniciar sesión.");

    return;
  }

  // 2. Determinamos la URL protegida correcta
  const protectedUrl = `${OWN_API}/protected/${role}`;

  try {
    const response = await fetch(protectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await response.json();

    if (!response.ok) {
      // Manejo de errores
      console.error("Error al obtener datos protegidos:", userData.msg);
      alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");

      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user_role");
      // window.location.href = '/login';
      return;
    }

    // Guardamos los datos completos del usuario en localStorage
    localStorage.setItem("current_user", JSON.stringify(userData));

    console.log("Datos del usuario guardados:", userData);
  } catch (error) {
    console.error("Error de red al obtener datos protegidos:", error);
  }
}

export { register, registerPatient, registerDoctor, login };
