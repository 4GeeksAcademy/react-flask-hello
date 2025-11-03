const url = import.meta.env.VITE_BACKEND_URL

const userServices = {}

userServices.profile_update = async (formData) => {
    try {
        const resp = await fetch(url + '/api/profile_update', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error logging in')
        
        const data = resp.json()
        return data

    } catch (error) {
        console.log(error)
    }
}




export default userServices