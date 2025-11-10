const tiendaServices = {}
const url = import.meta.env.VITE_BACKEND_URL

tiendaServices.miTienda = async () => {
    try {
        const resp = await fetch(url + 'api/mi_tienda', {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            
        })
        if (!resp.ok) throw new Error('error tiending in')

        const data = await resp.json()

        
        return data

    } catch (error) {
        console.log(error)
    }
}

tiendaServices.crearTienda = async (formData) => {
    try {
        const resp = await fetch(url + '/api/crear_tienda', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error tiendig la tienda')

        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error)
    }
}






export default tiendaServices