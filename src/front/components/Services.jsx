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
    const [calendlyConnected, setCalenldyConnected] = useState(false)
    const [schedulingUrl, setSchedulingUrl] = useState("")

    const fetchTypesMentoring = () => {
        userServices.allTypesMentoring(store?.user.id).then(async data => {

            if (data?.success) {
                setTypesMentoring(data.data)
            }
        })
    }

    useEffect(() => {

        userServices.getCalendlyStatus(store?.user?.id).then(data => {
            if (data.connected) {
                setCalenldyConnected(true)
                setSchedulingUrl(data.scheduling_url)

            }
        })

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

    const handleConnect = () => {
        userServices.connectCalendly(store?.user.id).then(async data => {
            console.log(data)
        })

    }


    return (
        <>

            {!calendlyConnected &&
                <div className="alert alert-danger d-flex my-4">
                    <p className="mx-2">Antes de agregar sesiones, conecte con su cuenta de Calendly</p>
                    <div className="btn btn-success" onClick={handleConnect}>Conectar cuenta Calendly</div>
                </div>}
            {calendlyConnected &&
                <div className="alert alert-info d-flex my-4" role="alert">
                    <p className="mx-2">Tu perfil esta conectado a Calendly:</p>
                    <p>{schedulingUrl}</p>
                </div>

            }



            <div className="d-flex align-items-center">
                <div className="my-4 w-75">
                    <h2>Tipos de sesiones de mentoria</h2>
                </div>
                <div className="d-flex">
                    <div className="btn btn-primary btn-lg btn-addnew" onClick={handleAddNew}>Agrega una nueva sesión</div>
                </div>
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


