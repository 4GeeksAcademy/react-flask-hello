import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Cloudinary = () => {
	const { store, actions } = useContext(Context);
    const [url_img, setUrl_img]= useState("https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg")

    useEffect(()=>{

    },[url_img])

    const changeUploadImage = async (e) =>{
        const files = e.target.files[0];
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "Presents_react");
        const newImage = await actions.uploadImage(data)
        setUrl_img(newImage)
        console.log(newImage);

    }
  
	return (
		<div className="d-flex flex-column align-items-center gap-3">
			<h1>Seleccionar imagen para Cloudinary</h1>
            <div>
                <input className="m-3" type="file" accept="image/*" onChange={changeUploadImage}></input>
                <img src={url_img} style={{width: "250px", height: "250px"}}/>
            </div>
		</div>       
	);
};
