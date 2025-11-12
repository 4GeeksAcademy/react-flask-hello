import { useEffect, useState } from "react";
import cloudinaryServices from "../services/cloudinary.services";
import useGlobalReducer from "../hooks/useGlobalReducer";

function CloudinaryComponent({avatar = false, product=false, tienda=false, returnUrl}) {
    const [file, setFile] = useState(null);
    const {store,dispatch} = useGlobalReducer();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!file) return setError("Selecciona una imagen");

        try {
            setLoading(true);
            const data = await cloudinaryServices.uploadImage(file, {avatar, product, tienda});
            //actualizar avatar en store
            if (avatar) dispatch({type:'update_avatar',payload:data.url})
            if (tienda) {
                dispatch({type:'update_tienda_logo',payload:data.url})
                returnUrl({...tienda, ['logo_rul']:data.url})
            } 

            return data;
        } catch (err) {
            console.error(err);
            setError("Error al subir la imagen: " + (err.message || err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (file) {
            handleSubmit(new Event('submit'));
        }
    }, [file]);

    return (
        <div style={{ padding: 30 }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        //setUrl("");
                        setError("");
                    }}
                />
                    {loading && "Subiendo..."}


            {error && <p style={{ color: "red" }}>{error}</p>}
         
        </div>
    );
}

export default CloudinaryComponent;