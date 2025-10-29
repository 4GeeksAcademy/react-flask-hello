import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Circle, CirclePlus, CirclePlusIcon } from 'lucide-react';
import AddSession from "./AddSession";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import CarTypeMentoring from "./CarTypeMentoring";


const Services = () => {

    const { store, dispatch } = useGlobalReducer()
    const [typesMentoring, setTypesMentoring] = useState()
    const [selectedType, setSelectedType] = useState(null);
    const [edit, setEdit] = useState(false)
    const [sessionToDelete, setSessionToDelete] = useState(null);


    const fetchTypesMentoring = () => {
        userServices.allTypesMentoring(store?.user.id).then(async data => {

            if (data?.success) {
                setTypesMentoring(data.data)
            }
        })
    }

    useEffect(() => {
        fetchTypesMentoring()
    }, []);

    const handleEdit = (type) => {
        setSelectedType(type)
        setEdit(true)
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();

    }

    const handleAddNew = () => {
        setSelectedType(null);
        setEdit(false);

        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
    };


    const handleOpenDeleteModal = (type) => {
        setSessionToDelete(type);
        
        const modal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
        modal.show();
    }

    

    const confirmDelete = () => {
        console.log(sessionToDelete)
        if (!sessionToDelete) return;
    
        userServices.deleteTypeMentoring(sessionToDelete.id).then(async data => {
            if (data.success) {
                fetchTypesMentoring();

                
                const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                modal.hide();
            }
        });
    };




    const handleDelete = (type) => {

        userServices.deleteTypeMentoring(type.id).then(async data => {
            if (data.success) {
                fetchTypesMentoring()
            }
        })
    }


    return (
        <>
            <div className="my-4">
                <h2>Tipos de sesiones de mentoria</h2>
            </div>
            <div className="div-sessions mb-5 p-5">
                <div className="row">
                    {typesMentoring?.map(type => (

                        <CarTypeMentoring key={type?.id}
                            type={type}
                            onEdit={() => handleEdit(type)}
                            onDelete={() => handleOpenDeleteModal(type)} />

                    ))}
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-4 " >
                        <div className="card card-sessions text-center " onClick={handleAddNew} >
                            <span className="text-center mt-5 mb-0"><CirclePlusIcon /></span>
                            <div className="card-body mb-4 ">
                                <p className="card-text">Agrega una nueva sesión</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddSession
                typeSessionId={selectedType?.id}
                edit={edit}
                onUpdate={fetchTypesMentoring} />


            <div
                className="modal fade"
                id="confirmDeleteModal"
                tabIndex="-1"
                aria-labelledby="confirmDeleteLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro de que deseas eliminar esta sesión?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                           
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Services


