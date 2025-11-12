import { useEffect, useState } from "react";
import cloudinaryServices from "../services/cloudinary.services";
import useGlobalReducer from "../hooks/useGlobalReducer";

function CloudinaryComponent({avatar = false, product=false}) {
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
            const data = await cloudinaryServices.uploadImage(file, {avatar, product});
            //actualizar avatar en store
            dispatch({type:'update_avatar',payload:data.url})
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