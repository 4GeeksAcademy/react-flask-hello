import React from "react";
import "./FormNewClient.css"

export const FormNewClient = () => {
    return (
        <>
            <div className="container">
                <div>
                    <h1>Nuevo Cliente</h1>
                </div>
                <div>
                    <form>
                        <div className="row p-2">
                            <label>Nombre</label>
                            <input type="text" id="dNombre" required/>
                            <label>Apellido</label>
                            <input type="text" id="dApellido" required/>
                        </div>
                        <div className="row p-2">
                            <label>Dirección</label>
                            <input type="text" id="dDireccion" required/>
                            <label>Teléfono</label>
                            <input type="text" id="dTelefono" required/>
                        </div>
                        <div className="row p-2">
                            <label>DNI</label>
                            <input type="text" id="dDni" required/>
                            <label>Email</label>
                            <input type="text" id="dEmail" required/>
                        </div>
                        <button type="submit">Crear</button>
                    </form>
                </div>
            </div>
        </>
    );
}

// Los datos son Nombre*, Apellidos*, telefono*, DNI*, Email*