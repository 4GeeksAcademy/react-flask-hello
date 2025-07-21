import './login.css'


export const Login = () => {
   

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className="col-md-4">
                <div className="card bg-dark text-light">
                    <div className="card-body">
                        <h2 className="text-center">Iniciar sesión</h2>
                        <form>
                           
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input  type="email" className="form-control mt-2 mb-2" id="email" placeholder="Ingrese su correo electrónico" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control mt-2 mb-2" id="password" placeholder="Ingrese su contraseña" />
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                               
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                               <p className=" text-info ">No tienes cuenta? Registrate ahora</p>
                               
                            </div>
                            

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}