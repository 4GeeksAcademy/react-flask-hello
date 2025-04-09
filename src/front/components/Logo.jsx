import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

const LogoFrame = () => {
    const [image, setImage] = useState(null); 
    const fileInputRef = useRef(null); 

    useEffect(() => { 
        const savedLogo = localStorage.getItem("logoApp");
        if (savedLogo) {
            setImage(savedLogo);
        }
    }, []);
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            
            // Guardar la imagen en localStorage en base64
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64data = reader.result;
                localStorage.setItem("logoApp", base64data);
                console.log("Imagen guardada en localStorage.");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            {/* BOTÓN INVISIBLE DE SUBIDA */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />

            {/* VISTA DEL LOGO O TEXTO DEFAULT */}
            {!image ? (
                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={image} alt="Logo" />
            )}
        </div>
    );
};

export default LogoFrame;
