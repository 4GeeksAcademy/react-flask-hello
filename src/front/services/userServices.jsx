const userServices = {}
const url = import.meta.env.VITE_BACKEND_URL

userServices.register = async (formData) => {
  try {
    const resp = await fetch(url + '/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!resp.ok) throw new Error('error al registrar usuario')
    const data = await resp.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


userServices.login = async (formData) => {
  try {
    const resp = await fetch(url + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await resp.json()
    if (!resp.ok) return data
    return data
  } catch (error) {
    console.log(error)
  }
}

userServices.dashboard = async (token) => {
  try {
    const resp = await fetch(url + `api/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    })
    if (!resp.ok) throw new Error('error private')
    const data = await resp.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


userServices.uploadAvatar = async (formData) => {
  try {
    const resp = await fetch(url + `api/upload-avatar`, {
      method: "POST",
      body: formData
    })
    if (!resp.ok) throw new Error('error upload avatar')
    const data = await resp.json()
    console.log("Avatar subido---->>", data.url)
    return data
  } catch (error) {
    console.log(error)
  }
}


userServices.mentorprofile = async (formData) => {
  try {
    const resp = await fetch(url + '/api/mentor-profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!resp.ok) throw new Error('error al registrar perfil del mentor')
    const data = await resp.json()

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error al creal el perfil" }
    }


    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}


userServices.searchMentorProfile = async (filter) => {
  try {
    const resp = await fetch(url + `api/mentor-profiles/filter?skills=${filter}`)
    if (!resp.ok) throw new Error('error fetching filters')
    const data = await resp.json()
    // console.log('Perfil del mentor', data)
    return data
  } catch (error) {
    console.log(error)
  }

}



userServices.getMentorProfile = async (userId) => {
  try {
    const resp = await fetch(url + `api/mentor-profiles/${userId}`)
    if (!resp.ok) throw new Error('error fetching image item')
    const data = await resp.json()
    // console.log('Perfil del mentor', data)
    return data
  } catch (error) {
    console.log(error)
  }
}



userServices.putMentorProfile = async (formData, userId) => {
  try {
    const resp = await fetch(url + `api/mentor-profiles/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!resp.ok) throw new Error('error creating user')
    const data = await resp.json();

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error al actualizar el perfil" }
    }


    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}

userServices.createTypeMentoring = async (formData) => {
  try {
    const resp = await fetch(url + '/api/type-mentoring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!resp.ok) throw new Error('error al registrar tipo de mentoria')
    const data = await resp.json()

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error al crear tipo de mentoria" }
    }


    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}

//Se obtiene todas los tipos de mentorias que registre el mentor

userServices.allTypesMentoring = async (userId) => {
  try {
    const resp = await fetch(url + `api/types-mentoring/${userId}`)
    if (!resp.ok) throw new Error('error fetching types mentoring')
    const data = await resp.json()

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error obtener tipos de mentorias" }
    }

    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}


userServices.oneTypeMentoring = async (id) => {
  try {
    const resp = await fetch(url + `api/type-mentoring/${id}`)
    if (!resp.ok) throw new Error('error fetching type mentoring')
    const data = await resp.json()

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error obtener tipos de mentorias" }
    }

    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }

}

userServices.putTypeMentoring = async (formData, id) => {
  try {
    const resp = await fetch(url + `api/type-mentoring/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!resp.ok) throw new Error('error update type mentoring')
    const data = await resp.json();

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error al actualizar tipo de mentoria" }
    }


    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}


userServices.deleteTypeMentoring = async (id) => {
  try {
    const resp = await fetch(url + `api/type-mentoring/${id}`, {
      method: 'DELETE'

    })
    if (!resp.ok) throw new Error('error delete type mentoring')
    const data = await resp.json();
    return { success: true, data }

  } catch (error) {
    console.log(error)
    return error
  };
}

userServices.createStudentProfile = async (formData) => {

  try {
    const resp = await fetch(url + "/api/student-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw new Error("Error al registrar perfil del estudiante");
    const data = await resp.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error de conexión con el servidor" };
  }
};


userServices.getStudentProfile = async (userId) => {
  try {
    const resp = await fetch(url + `/api/student-profiles/user/${userId}`);
    if (!resp.ok) throw new Error("Error fetching perfil del estudiante");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

userServices.resetPassword = async (token, password) => {
  try {
    const resp = await fetch(url + `/api/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
};

userServices.verifyResetToken = async (token) => {
  try {
    const resp = await fetch(url + `/api/verify-reset-token/${token}`, {
      method: 'GET'
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error)
    return { success: false, error: "Token inválido o expirado" }
  }
};


userServices.updateStudentProfile = async (formData, userId) => {
  try {
    const resp = await fetch(url + `/api/student-profiles/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw new Error("Error al actualizar perfil del estudiante");
    const data = await resp.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error de conexión con el servidor" };
  }
};


// ============================================================================
// MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA
// ============================================================================

/**
 * Solicita un enlace de restablecimiento de contraseña
 * Con este método se envía un email al usuario con un token único para restablecer su contraseña
 */
userServices.requestPasswordReset = async (email) => {
  try {
    const resp = await fetch(url + '/api/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    const data = await resp.json();

    // Verifica si la respuesta del servidor fue exitosa
    if (!resp.ok || data.error) {
      return {
        success: false,
        message: data.message || "Error al solicitar restablecimiento de contraseña"
      };
    }

    // Retorna éxito con el mensaje del servidor
    return {
      success: true,
      message: data.message || "Se ha enviado un enlace a tu email"
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error de conexión con el servidor"
    };
  }
};

/**
 * Verifica si un token de restablecimiento es válido
 * Se ejecuta al cargar el componente ResetPassword para validar el enlace
 */
userServices.verifyResetToken = async (token) => {
  try {
    const resp = await fetch(url + `/api/verify-reset-token/${token}`, {
      method: 'GET'
    });
    const data = await resp.json();

    // Valida si el token es correcto y no ha expirado
    if (!resp.ok || data.error) {
      return {
        success: false,
        message: data.message || "Token inválido o expirado"
      };
    }

    // Token válido
    return {
      success: true,
      message: data.message || "Token válido"
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Token inválido o expirado"
    };
  }
};

/**
 * Restablece la contraseña del usuario
 * Actualiza la contraseña en la base de datos usando el token validado
 */
userServices.resetPassword = async (token, password) => {
  try {
    const resp = await fetch(url + `/api/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    });
    const data = await resp.json();

    // Verifica si la contraseña se actualizó correctamente
    if (!resp.ok || data.error) {
      return {
        success: false,
        message: data.message || "Error al restablecer la contraseña"
      };
    }

    // Contraseña actualizada exitosamente
    return {
      success: true,
      message: data.message || "Contraseña actualizada correctamente"
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error de conexión con el servidor"
    };
  }
};

// ============================================================================
// FIN DE MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA
// ============================================================================

export default userServices;