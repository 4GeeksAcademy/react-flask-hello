import { Euro, Clock } from 'lucide-react';

const CarTypeMentoring = ({ type }) => {

    console.log(type)

    return (

        <div className="col-12 col-sm-12  col-lg-6 col-xl-4">
            <div class="card card-sessions text-center mb-3">
                <div class="card-body">
                    <h5 class="card-title">{type.title}</h5>
                    <p class="card-text">{type.description}</p>
                    <div className="d-flex justify-content-left gap-3">
                        <div className="session-duration d-flex justify-content-center align-items-center">
                           <span className='me-1'><Clock/></span>{`${type?.duration} min`}                         </div>
                        <div className="session-price d-flex justify-content-center align-items-center">
                            <span className='me-1'><Euro /></span>{`${type?.price} por sesión`}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2 mt-3'>
                        <button type="button" className="btn btn-edit btn-sm" >Editar</button>
                         <button type="submit" className="btn btn-delete btn-sm" >Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CarTypeMentoring