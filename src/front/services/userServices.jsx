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
    // const file = e.target.files[0]


    // const formData = new FormData()
    // formData.append('avatar', file)

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
   
    return {success: true, data}
  } catch (error) {
    console.log(error)
    return { success: false, error: "Error de conexion con el servidor" }
  }
}


userServices.oneTypeMentoring = async(id) =>{
   try {
    const resp = await fetch(url + `api/type-mentoring/${id}`)
    if (!resp.ok) throw new Error('error fetching type mentoring')
    const data = await resp.json()

    if (!resp.ok || data.error) {
      return { success: false, error: data.message || "Error obtener tipos de mentorias" }
    }
   
    return {success: true, data}
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


userServices.deleteTypeMentoring = async(id) =>{
   try {
        const resp = await fetch(url + `api/type-mentoring/${id}`, {
            method: 'DELETE'
            
        })
        if(!resp.ok) throw new Error('error delete type mentoring')
        const data = await resp.json();
        return { success: true, data }

    } catch (error){
        console.log(error)
        return error
    };
}



export default userServices


