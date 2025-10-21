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


export default userServices
