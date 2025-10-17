const userServices = {}
const url = import.meta.env.VITE_BACKEND_URL
    userServices.register = async(formData)=>{
        try {
            const resp = await fetch(url+'/api/register', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)        
            })
            if(!resp.ok) throw new Error('error al registrar usuario')
        const data = await resp.json()
        return data
        } catch (error) {
            console.log(error)
        }
    }

    export default userServices