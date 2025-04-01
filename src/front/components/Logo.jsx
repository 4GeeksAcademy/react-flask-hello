import { useState, useRef } from "react";
import './Styles/Logo.css'

const LogoFrame = () => {
    const [image, setImage] = useState(null); // Guarda la imagen cargada
    const fileInputRef = useRef(null); // Referencia al input oculto

    // Maneja la carga de la imagen
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crea una URL temporal
            setImage(imageUrl); // Guarda la imagen en el estado
        }
    };

    // Simula un clic en el input al hacer clic en el marco
    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
            />
            
            {/* Si no hay imagen, muestra el texto "Add your logo" */}
            {!image ? (
                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={image} alt="Logo" />
            )}
        </div>
    );
};

export default LogoFrame;
