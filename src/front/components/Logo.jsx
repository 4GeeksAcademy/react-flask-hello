import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

const LogoFrame = () => {


    const [image_logo_url, setImage] = useState(null); 
    const fileInputRef = useRef(null); 
    const savedLogo = localStorage.getItem("logoApp"); // DECLARO SAVEDLOGO PARA QUE GUARDE LA IMAGEN EN MI LOCALSTORAGE

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
            
            // Guardar la imagen en localStorage
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64data = reader.result;
                localStorage.setItem("logoApp", base64data);
                console.log("Imagen guardada en localStorage.");
            };
            reader.readAsDataURL(file);

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>

            { /*BOTON DE SUBIDA DE IMG_LOGO*/}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"    /*URL DEL LOGO*/ 
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
  
            {!savedLogo ? ( {!image ? (

                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={savedLogo} alt="Logo" />
            )}
        </div>
    );
};

export default LogoFrame;
