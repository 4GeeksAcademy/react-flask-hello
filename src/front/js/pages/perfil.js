import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import tournament from "../../img/perfil/tournament.jpg";
import teamlist from "../../img/perfil/teamlist.jpg";
import eventlist from "../../img/perfil/eventlist.jpg";
import imgLogo from "../../img/LogoTS.jpg";
import * as filestack from 'filestack-js';

const Perfil = ()=>{
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const profileData = {...store.userInfo};
  const [profileImage, setProfileImage] = useState(
   null
  );
  const navigate = useNavigate()
  const filestackClient = filestack.init('ApcaRKG5TSEuvL2v2O2Dnz');
 // Manejar la selección de archivos y actualización de imagen de perfil
 useEffect(()=>{
  setProfileImage(profileData.url_perfil)
}, [profileData.url_perfil]);
  
  //cuando cargue llamamos a getuserinfo y enviamos la data al userData
  useEffect(() => {
    if (store.accessToken) {
      actions.getUserInfo().then(data => {
        setUserData(data);
        // Verificar si el usuario tiene una imagen de perfil y establecerla
        //if (data && data.profileImage) {
         // setProfileImage(data.profileImage);
      //  }
      });
    } else {
      navigate("/cuenta");
    }
  }, [store.accessToken]);

  const handleOpenFilePicker = () => {
    const options = {
      onUploadDone: (res) => {
        const newImageUrl = res.filesUploaded[0].url;
        console.log('la URL de la imagen es:', newImageUrl)
        actions.updateProfileImage(newImageUrl).then(()=>{

          setProfileImage(newImageUrl);
        }).catch(error=>{
          console.error(error)
        })
        
      }
    };
  
     
      filestackClient.picker(options).open().then(response => {
        // Verifica si se seleccionó una imagen antes de continuar
        if (response.filesUploaded && response.filesUploaded.length > 0) {
          // Obtén la URL de la imagen seleccionada
          const imageUrl = response.filesUploaded[0].url;
          // Actualiza el estado con la nueva imagen
          setSelectedImage(imageUrl);
        }
      }).catch(error => {
        console.error('Filestack error:', error);
      });
    };
  
   
  return (
<div className="contSuperior">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={profileImage==""? imgLogo: profileImage}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                {/*<h5 className="my-3">{JSON.stringify(store.userInfo)}</h5>*/}
                <h5 className="my-3">{profileData.name}</h5>
                <button className='btn btn-outline-primary ms-1' onClick={() => actions.logout()}>
                  Cerrar Sesión
                </button>
                <p className="text-muted mb-4">{profileData.address}</p>
                <button type="button" className="btn btn-primary" onClick={handleOpenFilePicker}>
                  Cambiar imagen de perfil
                </button>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nombre completo</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Télefono</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Dirección</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Contraseña</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.password}</p>
                  </div>
                </div>
                <hr />
                <div className='text-center'>
                  <button type="button" className="btn btn-primary">
                    Editar Datos
                  </button>
                </div>
              </div>
            </div>

        <div className="row">          
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card text-center" style={{width: "17.5rem"}}>
                  <img src={tournament} className="card-img-top" alt="Eventos"/>
                  <div className="card-body">  
                    <p className="card-text">Crea, modifica o elimina tus eventos con sus datos.</p>
                    <Link to={"/eventolista/"+profileData.userId}>
                      <button className="btn btn-primary">Administrar Eventos</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-center" style={{width: "17.5rem"}}>
                  <img src={teamlist} className="card-img-top" alt="Equipos"/>
                  <div className="card-body">
                    <p className="card-text">Consulta tus equipos registrados en los eventos.</p>
                    <Link to="/teams" className="btn btn-primary">Administrar Equipos</Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-center" style={{width: "17.5rem"}}>
                    <img src={eventlist} className="card-img-top" alt="Registro"/>
                    <div className="card-body">
                      <p className="card-text">Registra tus equipos a eventos vigentes.</p>
                      <Link to="/nextevent" className="btn btn-primary">Registrar Equipos</Link>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        
        </div>

        </div>
      </div>
  );
}

export default Perfil;
