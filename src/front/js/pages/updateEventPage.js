import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UpdateEventPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [url_imgn, setUrl_img] = useState("https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg")
    const [formData, setFormData] = useState({
        evento: '',
        descripcion: '',
        ciudad: '',
        ubicacion: '',
        fecha: '',
        precio: '',
        categoria: '',
        url_img: "",
        max_personas: ''
    });

    useEffect(() => {
        const EventData = async () => {
            await actions.obtenerOneEvento(params.theid)
            const { evento, descripcion, ciudad, ubicación, fecha, precio, url_img, max_personas, categoria } = store.eventInfo.result;
            const formattedDate = new Date(fecha).toISOString().split('T')[0];
            console.log(url_img);

            setFormData({
                evento: evento,
                descripcion: descripcion,
                ciudad: ciudad,
                ubicacion: ubicación,
                fecha: formattedDate,
                precio: precio,
                max_personas: max_personas,
                categoria: categoria,
                url_img: url_img
            })

        }
        EventData();
    }, []);


    const changeUploadImage = async (e) => {
        const files = e.target.files[0];
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "Presents_react");
        const newImage = await actions.uploadImage(data)
        setFormData(prevState => ({
            ...prevState,
            url_img: newImage // Actualizamos el formData con la nueva URL de la imagen
        }));
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await actions.actualizarEvento(params.theid, formData);
            navigate(`/description/${params.theid}`);
        } catch (error) {
            console.error(error);
            toast.error('Error al actualizar los datos del evento');
        }
    };
    const hoy = new Date().toISOString().split('T')[0];

    return (
        <div className="container vh-100">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Update Event</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="mb-3 col-md-8">
                        <label htmlFor="evento" className="form-label">Event:</label>
                        <input type="text" className="form-control" id="evento" name="evento" value={formData.evento} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="ciudad" className="form-label">City:</label>
                        <input type="text" className="form-control" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-12">
                        <label htmlFor="ubicacion" className="form-label">Ubication:</label>
                        <input type="text" className="form-control" id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-12">
                        <label htmlFor="descripcion" className="form-label">Description:</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="fecha" className="form-label">Date:</label>
                        <input className='form-control me-2' type="date" id="fecha" name="fecha" min={hoy} value={formData.fecha} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="precio" className="form-label">Price:</label>
                        <input type="text" className="form-control" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="max_personas" className="form-label">Max.people:</label>
                        <input type="text" className="form-control" id="max_personas" name="max_personas" value={formData.max_personas} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="categoria" className="form-label">Event Image:</label>
                        <input type="file" className="form-control" accept="image/*" onChange={changeUploadImage} />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-400 text-white mb-3">Update Event</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
    );
};
