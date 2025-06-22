const userServices = {};
const backendUrl = import.meta.env.VITE_BACKEND_URL;

userServices.register = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || "something went wrong");
    localStorage.setItem("token", data.token);
    return { success: true, token: data.token };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

userServices.login = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

userServices.getUserInfo = async () => {
  try {
    if (!localStorage.getItem('token')) {
      return;
    } else {
      const resp = await fetch(backendUrl + "/api/private", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      if (resp.status !== 200) {
        localStorage.removeItem('token');
        return;
      }
      if (!resp.ok) throw Error("something went wrong");
      const data = await resp.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

userServices.vincularProfesional = async (userId, profesionalId) => {
  try {
    const resp = await fetch(`${backendUrl}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        profesional_id: profesionalId,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.msg || "Error al vincular");
    return { success: true, ...data };
  } catch (err) {
    console.error("❌ Error en vincularProfesional:", err.message);
    return { success: false, error: err.message };
  }
};

userServices.getUserById = async (id) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || "Algo salió mal al obtener el usuario por ID");
    return data;
  } catch (error) {
    console.error("Error en getUserById:", error);
    return null;
  }
};


export default userServices;
