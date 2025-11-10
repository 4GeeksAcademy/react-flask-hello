import React from "react"
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";
const AddSession = ({ typeSessionId=null, edit, onUpdate}) => {
    const { store, dispatch } = useGlobalReducer()
   
    const iniFormData = {
        title: " ",
        description: " ",
        duration: " ",
        difficulty_level: " ",
        price: " ",
        user_id: store?.user?.id

    }
    const [formData, setFormData] = useState( {
        title: " ",
        description: " ",
        duration: " ",
        difficulty_level: " ",
        price: " ",
        user_id: store?.user?.id

    });
    const [success, setSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [update, setUpdate] = useState(false)


  

    useEffect(() => {

        if (!typeSessionId) {
            setFormData({
                title: "",
                description: "",
                duration: "",
                difficulty_level: "",
                price: "",
                user_id: store?.user?.id
            });
            return
        } 

        userServices.oneTypeMentoring(typeSessionId).then(async data => {
          
            if (data.success && edit){
               
                setUpdate(true)
                setFormData({
                    title:data.data.title,
                    description:data.data.description,
                    duration:data.data.duration,
                    difficulty_level:data.data.difficulty_level,
                    price:data.data.price,
                    user_id:data.data.mentor_profile_id
                     
                })
            }
        })

    }, [typeSessionId])



    useEffect(() => {
        if (success || alertError) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setAlertError(false)
            }, 3000);


            return () => clearTimeout(timer);
        }
    }, [success, alertError]);





    const handleSubmit = (e) => {
        e.preventDefault()
        if(update){

            userServices.putTypeMentoring(formData, typeSessionId).then(data =>{
                 if (data.success) {
                    setSuccess(true)
                    onUpdate()
                    setUpdate(false)
                } else{
                    setAlertError(true)
                }
            })

           
        } else{
            
            userServices.createTypeMentoring(formData).then(data => {
              
    
                if (data.success) {
                    setSuccess(true)
                    onUpdate()
                   
                    setFormData(iniFormData)
                } else {
                   
                    setAlertError(true)
    
                }
    
            })


        }

  }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }

    return (
        <>
            <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className=" modal-content modal-style ">

                        <form className="container p-2" onSubmit={handleSubmit}>

                            <div className="modal-body d-flex flex-column gap-3  ">

                                <label className="modal-label">Titulo</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    name="title"
                                    onChange={handleChange}
                                    className="form-control  "
                                    id="exampleInputTitle"
                                    aria-describedby="titleHelp"
                                    required
                                ></input>

                                <label className="modal-label">Descripción</label>
                                <textarea
                                    rows={5}
                                    cols={50}
                                    value={formData.description}
                                    name="description"
                                    onChange={handleChange}
                                    className="form-control "
                                    id="exampleInputDescription"
                                    aria-describedby="descriptionHelp"
                                    required
                                ></textarea>

                                <label className="modal-label">Duración (min)</label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    name="duration"
                                    onChange={handleChange}
                                    className="form-control "
                                    id="exampleInputDuration"
                                    aria-describedby="durationHelp"
                                    required
                                ></input>

                                <label className="modal-label">Nivel de dificultad</label>

                                <select className="form-select" id="inputGroupSelect01" value={formData.difficulty_level} name="difficulty_level" onChange={handleChange}>
                                    <option selected>Indica tu nivel...</option>
                                    <option value="BEGINNER">Principiante</option>
                                    <option value="INTERMEDIATE">Intermedio</option>
                                    <option value="ADVANCED">Avanzado</option>
                                </select>

                                <label className="modal-label">Precio (€)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    name="price"
                                    onChange={handleChange}
                                    className="form-control"
                                    id="exampleInputPrice"
                                    aria-describedby="priceHelp"
                                    required
                                ></input>



                            </div>
                            {success && <AlertSuccess />}
                            {alertError && <AlertError />}
                            <div className="modal-footer">

                                <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-save" data-bs-dismiss="modal">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )

}

export default AddSession
