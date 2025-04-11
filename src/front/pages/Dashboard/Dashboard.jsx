import React from "react";
import { Link } from 'react-router-dom';


export const Dashboard = () => {
    return (
        <>

            <div class="container mt-4 mb-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            {/* CARD IZQUIERDA AGENDA */}
                            <div class="card-body">
                                
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            {/* CARD DERECHA OPCIONES */}
                            <div class="card-body">

                                <Link to="#" className="btn btn-primary w-100 mt-3 mb-3">AGENDAR NUEVO CLIENTE</Link>
                                <Link to="../clientes" className="btn btn-primary w-100 mt-3 mb-3">BUSCAR CLIENTE</Link>
                                <Link to="#" className="btn btn-primary w-100 mt-3 mb-3">CALENDARIO DE CITAS</Link>
                                <Link to="#" className="btn btn-primary w-100 mt-3 mb-3">ASIGNAR SERVICIO</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};