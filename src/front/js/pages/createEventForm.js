import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import SuccessModal from '../component/SuccessModal';
import ErrorModal from '../component/ErrorModal';
import { useNavigate } from "react-router-dom";


function CreateEventForm() {
  const { actions, store } = useContext(Context);

  const [url_img, setUrl_img] = useState("https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg")
  const navigate = useNavigate();
  useEffect(() => {
    actions.getCategories();
  }, [actions]);

  const [formData, setFormData] = useState({
    evento: '',
    ciudad: '',
    ubicacion: '',
    descripcion: '',
    fecha: '',
    precio: '',
    max_personas: '',
    categoria: '',
    url_img: url_img
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [showErrorModal, setShowErrorModal] = useState(false)

  const changeUploadImage = async (e) => {
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "Presents_react");
    const newImage = await actions.uploadImage(data)
    setUrl_img(newImage)
    setFormData(prevState => ({
      ...prevState,
      url_img: newImage // Actualizamos el formData con la nueva URL de la imagen
    }));
  }


  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    try {
      await actions.crearEvento(formData);
      setUrl_img("https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg")
      setFormData({
        evento: '',
        ciudad: '',
        ubicacion: '',
        descripcion: '',
        fecha: '',
        precio: '',
        max_personas: '',
        categoria: '',
        url_img: url_img
      })
      navigate("/")
    } catch (error) {
      toast.error('Error al actualizar los datos del evento');

    }
  };
  const hoy = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Crear Evento</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="evento" className="form-label">Evento:</label>
              <input type="text" name="evento" className="form-control" value={formData.evento} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">Ciudad:</label>
              <input type="text" name="ciudad" className="form-control" value={formData.ciudad} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="ubicacion" className="form-label">Ubicación:</label>
              <input type="text" name="ubicacion" className="form-control" value={formData.ubicacion} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción:</label>
              <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange} required rows="3"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Fecha:</label>
              <input className='me-2' type="date" id="fecha" name="fecha" min={hoy} value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio:</label>
              <input type="text" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="max_personas" className="form-label">Max personas:</label>
              <input type="text" name="max_personas" className="form-control" value={formData.max_personas} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria:</label>
              <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} aria-label="Default select example" required>
                <option value="">Open this select menu</option>
                {store.categories?.map((el, i) => <option key={i} value={el.id}>{el.categoria}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Imagen Evento:</label>
              <input type="file" className="form-control" accept="image/*" onChange={changeUploadImage} />
            </div>
            <div className="d-grid d-flex justify-content-center">
              <button type="submit" className="btn bg-400 text-white mb-3">Crear Evento</button>
            </div>
          </form>
          {showSuccessModal && <SuccessModal onClose={() => {
            setShowSuccessModal(false)
            navigate('/');
          }} />}
          {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;