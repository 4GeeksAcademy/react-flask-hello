import React, { useState } from "react";

import logo from "../assets/img/Logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/user.services";
import CloudinaryComponent from "./cloudinary";
export const CreateEditClient = () => {
  const { store, dispatch } = useGlobalReducer();
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState(store.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userServices.profile_update(userData).then((data) => {
      if (data.user) dispatch({ type: "update_user", payload: data.user });
    });
  };

  const formatDate = () => {
    if (!userData.fecha_nacimiento) return "";
    const date = new Date(userData.fecha_nacimiento);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = () => {
    if (edit) {
      if (JSON.stringify(store.user) !== JSON.stringify(userData)) {
        handleSubmit(new Event("submit"));
      }
    }
    setEdit(!edit);
  };

  const handleCancel = () => {
    setUserData(store.user);
    setEdit(false);
  };

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ maxWidth: "900px", width: "100%" }}
        >
          <div
            className="card-header text-white rounded-top-4 d-flex justify-content-between align-items-center"
            style={{
              background:
                "linear-gradient(90deg, #ff0000 0%, #f21010 50%, #a00000 100%)",
            }}
          >
            <h3 className="mb-0 fw-semibold text-center py-2">Perfil</h3>
            <button className="btn text-white" onClick={handleEdit}>
              {edit ? (
                <span className="fa fa-save"></span>
              ) : (
                <span className="fa fa-pen"></span>
              )}
            </button>
          </div>

          <div className="card-body p-4">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="col-12 d-flex flex-column align-items-center mb-4 justify-content-center">
                <figure className="text-center">
                  <img
                    src={
                      userData.avatar ||
                      "https://secure.gravatar.com/avatar/?s=80&d=mm&r=g"
                    }
                    alt={userData.nombre || "avatar"}
                    onError={(e) => {
                      e.target.onerror = null;
                      setUserData({
                        ...userData,
                        avatar:
                          "https://secure.gravatar.com/avatar/?s=80&d=mm&r=g",
                      });
                    }}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <figcaption>{userData.nombre || "avatar"}</figcaption>
                </figure>
                {edit && <CloudinaryComponent avatar={true} />}
              </div>
              {/* --- Datos personales --- */}
              <h5 className="text-danger border-bottom pb-2 mb-3">
                Datos Personales
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="nombre"
                    placeholder="Ej: Juan"
                    required
                    readOnly={!edit}
                    name="nombre"
                    onChange={handleChange}
                    value={userData.nombre || ""}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label fw-semibold">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="apellido"
                    placeholder="Ej: Pérez"
                    required
                    readOnly={!edit}
                    name="apellido"
                    onChange={handleChange}
                    value={userData.apellido || ""}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="nickname" className="form-label fw-semibold">
                    NickName
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="nickname"
                    placeholder="Ej: Spidy"
                    required
                    readOnly={!edit}
                    name="nickname"
                    onChange={handleChange}
                    value={userData.nickname || ""}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label fw-semibold">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="telefono"
                    placeholder="+34 600 000 000"
                    readOnly={!edit}
                    name="telefono"
                    onChange={handleChange}
                    value={userData.telefono || ""}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="dni" className="form-label fw-semibold">
                    DNI / NIF / Pasaporte
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="dni"
                    readOnly={!edit}
                    name="dni"
                    onChange={handleChange}
                    value={userData.dni || ""}
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="fechaNacimiento"
                    className="form-label fw-semibold"
                  >
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="fechaNacimiento"
                    readOnly={!edit}
                    name="fecha_nacimiento"
                    onChange={handleChange}
                    value={formatDate() || ""}
                  />
                </div>
              </div>

              {/* --- Dirección --- */}
              <h5 className="text-danger border-bottom pb-2 mt-4 mb-3">
                Dirección
              </h5>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="direccion" className="form-label fw-semibold">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="direccion"
                    placeholder="Calle, número, ciudad"
                    readOnly={!edit}
                    name="direccion"
                    onChange={handleChange}
                    value={userData.direccion || ""}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="ciudad" className="form-label fw-semibold">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="ciudad"
                    readOnly={!edit}
                    name="ciudad"
                    onChange={handleChange}
                    value={userData.ciudad || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label
                    htmlFor="codigoPostal"
                    className="form-label fw-semibold"
                  >
                    Código Postal
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="codigoPostal"
                    readOnly={!edit}
                    name="cp"
                    onChange={handleChange}
                    value={userData.cp || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="pais" className="form-label fw-semibold">
                    País
                  </label>
                  <input
                    type="text"
                    className={edit ? "form-control" : "form-control-plaintext"}
                    id="pais"
                    placeholder="España"
                    readOnly={!edit}
                    name="pais"
                    onChange={handleChange}
                    value={userData.pais || ""}
                  />
                </div>
              </div>

              <h5 className="text-danger border-bottom pb-2 mt-4 mb-3">
                
              </h5>

              {/* --- Botones --- */}
              {edit && (
                <div className="mt-5 text-end">
                  <button
                    type="reset"
                    className="btn btn-outline-secondary me-2"
                    onClick={handleCancel}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i> Cancelar
                  </button>
                  <button
                    type="submit"
                    onClick={handleEdit}
                    className="btn btn-danger px-4"
                  >
                    <i className="bi bi-save"></i> Guardar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
