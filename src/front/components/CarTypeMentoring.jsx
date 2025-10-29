import { Euro, Clock } from 'lucide-react';
import AddSession from './AddSession';
import { useState } from 'react';

const CarTypeMentoring = ({ type, onEdit, onDelete }) => {

    return (
        <>
            <div className="col-12 col-sm-12 col-lg-6 col-xl-4 d-flex">
                <div class="card card-sessions text-center mb-3 flex-fill">
                    <div class="card-body">
                        <h5 class="card-title">{type.title}</h5>
                        <p class="card-text">{type.description}</p>
                        <div className="d-flex justify-content-left gap-3">
                            <div className="session-duration d-flex justify-content-center align-items-center">
                                <span className='me-1'><Clock /></span>{`${type?.duration} min`}                         </div>
                            <div className="session-price d-flex justify-content-center align-items-center">
                                <span className='me-1'><Euro /></span>{`${type?.price} por sesión`}
                            </div>
                        </div>
                        <div className='d-flex justify-content-end gap-2 mt-3'>
                            <button type="button" className="btn btn-edit btn-sm" onClick={onEdit} >Editar</button>
                            <button
                                type="button"
                                className="btn btn-delete btn-sm"
                               onClick={() =>  onDelete(type)}
                            >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default CarTypeMentoring