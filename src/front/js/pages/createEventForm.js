import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import SuccessModal from '../component/SuccessModal';
import ErrorModal from '../component/ErrorModal';
import { useNavigate } from "react-router-dom";


function CreateEventForm() {
  const { actions, store } = useContext(Context);
  const [altura, setAltura] = useState(window.innerWidth < 768 ? '' : '100vh');
  const [url_img, setUrl_img] = useState("https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg")
  const navigate = useNavigate();
  useEffect(() => {
    actions.getCategories();

    const cambiarAltura = () => {
      setAltura(window.innerWidth < 768 ? '' : '100vh');
    };

    window.addEventListener('resize', cambiarAltura);

    return () => {
      window.removeEventListener('resize', cambiarAltura);
    };

  }, []);

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
    <div className="container" style={{ height: altura }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Create Event</h2>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-8">
              <label htmlFor="inputEmail4" className="form-label">Event:</label>
              <input type="text" name="evento" className="form-control" value={formData.evento} onChange={handleChange} required/>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPassword4" className="form-label">City:</label>
              <input type="text" name="ciudad" className="form-control" value={formData.ciudad} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="ubicacion" className="form-label">Location:</label>
              <input type="text" name="ubicacion" className="form-control" value={formData.ubicacion} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="descripcion" className="form-label">Description:</label>
              <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange} required rows="3"></textarea>
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="fecha" className="form-label">Date:</label>
              <input className='form-control me-2' type="date" id="fecha" name="fecha" min={hoy} value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="precio" className="form-label">Price:</label>
              <input type="text" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="max_personas" className="form-label">Max.people:</label>
              <input type="text" name="max_personas" className="form-control" value={formData.max_personas} onChange={handleChange} required />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="categoria" className="form-label">Category:</label>
              <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} aria-label="Default select example" required>
                <option value="">Select category</option>
                {store.categories?.map((el, i) => <option key={i} value={el.id}>{el.categoria}</option>)}
              </select>
            </div>
            <div className="mb-3 col-md-8">
              <label htmlFor="categoria" className="form-label">Event Image:</label>
              <input type="file" className="form-control" accept="image/*" onChange={changeUploadImage} />
            </div>
            <div className="d-grid d-flex justify-content-center">
              <button type="submit" className="btn bg-400 text-white mb-3">Create Event</button>
            </div>
          </form>
          {/* {showSuccessModal && <SuccessModal onClose={() => {
            setShowSuccessModal(false)
            navigate('/');
          }} />}
          {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />} */}
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;