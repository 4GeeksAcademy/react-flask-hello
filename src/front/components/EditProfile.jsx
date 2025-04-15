export const EditProfile = () => {
    return (
      <div className="container">
        <h2>Editar perfil</h2>
        <input className="form-control mb-2" placeholder="Nuevo email" />
        <input className="form-control mb-2" placeholder="Nueva contraseña" type="password" />
        <button className="btn btn-primary">Guardar cambios</button>
      </div>
    );
  };