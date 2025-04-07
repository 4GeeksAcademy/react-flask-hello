import { useState, useRef } from "react";
import './Styles/Logo.css'

const LogoFrame = () => {
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
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
            />
            
            
            {!image ? (
                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={image} alt="Logo" />
            )}
        </div>
    );
};

export default LogoFrame;
