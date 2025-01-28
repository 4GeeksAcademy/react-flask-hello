import React, {useState} from "react";
import {context} from "../store/appContext";

export const ProfileEdit = () => {

    const [formData, setFormData] =useState({
        name: '',
        address: '',
        phone: '',
        courtType: ''
    })

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    };

    const handleCancel = e => {
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log (formData)
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" className="hostProfile__input" value={formData.name} onChange={handleChange} placeholder="name" name="name"></input>
            <input type="text" className="hostProfile__input" value={formData.address} onChange={handleChange} placeholder="address" name="address"></input>
            <input type="number" className="hostProfile__input" value={formData.phone} onChange={handleChange} placeholder="phone" name="phone"></input>
            <input type="text" className="hostProfile__input" value={formData.courtType} onChange={handleChange} placeholder="court type" name="courtType"></input>

            <input className="btn btn-success" type="submit" value="Enviar"/>
            <input className="btn btn-danger" value="Cancelar" onClick={handleCancel}/>
        </form>
    );
};