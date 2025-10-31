const AuthServices = {}
const url = import.meta.env.VITE_BACKEND_URL


AuthServices.login = async (formData) => {
    try {
        const resp = await fetch(url + '/api/login', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error logging in')

        const data = await resp.json()

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        return data

    } catch (error) {
        console.log(error)
    }
}


AuthServices.register = async (formData) => {
    try {
        const resp = await fetch(url + '/api/register', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error logging in')

        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error)
    }
}



AuthServices.logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true
}


export default AuthServices