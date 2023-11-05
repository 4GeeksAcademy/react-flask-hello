import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Formulario.css";

const FormularioBeca = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);

  
  const handleChangeScholarshipPost =(e)=>{
    actions.handleChange(e, "createScholarship")
  }

  const handleScholarshipPost = () => {
    actions.postScholarship()
  }

  useEffect(() => {
    if (store.scholarshipPosted) {
      actions.getAllScholarShips(); // Actualiza las becas en la página principal
      navigate('/');
    }
  }, [store.scholarshipPosted]);


  return (
    <div className='container'>
      <h2 className='form-title'>Formulario Sobre Beca</h2>
      <div className='container-fluid p-3'>
        {/* first row starts here */}
        <div className='row m-3'>
          <div className='col-9'>
            <label htmlFor="nombreInstitucion" className="form-label">Institución</label>
            <input name='institution' type="email" className="form-control" id="nombreInstitucion" placeholder='Nombre de la institución' onChange={handleChangeScholarshipPost} />
          </div>
          <div className='col-3'>
            <label htmlFor="fechaLimite" className="form-label">Fecha Límite de Inscripción</label>
            <input name='deadline' type="date" className="form-control" id="fechaLimite" placeholder='DD/MM/AA' onChange={handleChangeScholarshipPost}/>
          </div>
        </div>
        {/* second row starts here */}
        <div className='row m-3 pt-3'>
          <div className='col-9'>
            <label htmlFor="nombreBeca" className="form-label">Nombre de la Beca por Ofrecer</label>
            <input name='scholarship_name' type="email" className="form-control" id="nombreBeca" placeholder='Nombre de la Beca' onChange={handleChangeScholarshipPost}/>
          </div>
          <div className='col-3'>
            <label htmlFor="modalidadBeca" className="form-label">Presencial o Virtual?</label>
            <select name='modality' class="form-select" id="modalidadBeca" onChange={handleChangeScholarshipPost}>
              <option selected disabled muted >Escoja una opción</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
        </div>
        {/* third row starts here */}
        <div className='row m-3 pt-3'>
          <div className='col-6'>
            <label htmlFor="areaBeca" className="form-label">Área Profesional a la que Pertenece la Beca </label>
            <input name='professional_field' type="areaProfesional" className="form-control" id="areaBeca" placeholder='Área Profesional de la Beca' onChange={handleChangeScholarshipPost}/>
          </div>
          <div className='col-4'>
            <label htmlFor="coberturaBeca" className="form-label">Cobertura Financiera de la Beca</label>
            <select name='coverage' class="form-select" id="coberturaBeca" onChange={handleChangeScholarshipPost}>
              <option name='coverage' selected disabled>Escoja una opción</option>
              <option value="Completa">Completa</option>
              <option value="Parcial">Parcial</option>
            </select>
          </div>
        </div>
        {/* fourth row starts here */}
        <div className='row mt-3 mx-3 mb-4 pt-3'>
          <div className='col-6'>
            <label htmlFor="urlBeca" className="form-label">URL para la Página de Inscripción</label>
            <input name='url_to' type="email" className="form-control" id="urlBeca" placeholder='https://' onChange={handleChangeScholarshipPost}/>
            <button className='mt-4 button-post' onClick={handleScholarshipPost} >Publicar</button>
          </div>
          <div className='col-6'>
            <label for="descripcionBeca" class="form-label" >Descripción de los Beneficios y Requerimientos para Participar</label>
            <textarea name='description' class="form-control" id="descripcionBeca" rows="4" onChange={handleChangeScholarshipPost}></textarea>
          </div>
        </div>


      </div>
      <div id="customAlertPost" class="alertMissing container justify-content-center align-items-center"></div>
    </div>
  );
}

export default FormularioBeca;
