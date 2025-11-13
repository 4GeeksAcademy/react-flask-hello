const productServices = {}
const url = import.meta.env.VITE_BACKEND_URL

productServices.misProductos = async () => {
    try {
        const resp = await fetch(url + '/api/mi_producto', {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            
        })
        if (!resp.ok) throw new Error('error producting in')

        const data = await resp.json()

        
        return data

    } catch (error) {
        console.log(error)
    }
}

productServices.crearProducto = async (formData) => {
    try {
        const resp = await fetch(url + '/api/crear_mis_productos', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer "  + localStorage.getItem('token')
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error producting el producto')

        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

productServices.recibirProductos = async () => {
    try {
        const resp = await fetch(url + '/api/recibir_productos')
        if (!resp.ok) throw new Error('error producting in')

        const data = await resp.json()

        
        return data

    } catch (error) {
        console.log(error)
    }
}





export default productServices