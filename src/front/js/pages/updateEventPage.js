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

    // setUrl_img(formData.url_img)
    // console.log(url_imgn)

    const changeUploadImage = async (e) => {
        const files = e.target.files[0];
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "Presents_react");
        const newImage = await actions.uploadImage(data)
        // setUrl_img(newImage)
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
        <div className="container mt-5 vh-100">
            <h2>Actualizar Evento</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="evento" className="form-label">Evento</label>
                    <input type="text" className="form-control" id="evento" name="evento" value={formData.evento} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input type="text" className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input type="text" className="form-control" id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input className='me-2' type="date" id="fecha" name="fecha" min={hoy} value={formData.fecha} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input type="text" className="form-control" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Imagen Evento:</label>
                    <input type="file" className="form-control" accept="image/*" onChange={changeUploadImage} />
                </div>
                <div className="mb-3">
                    <label htmlFor="max_personas" className="form-label">Máximo de personas</label>
                    <input type="text" className="form-control" id="max_personas" name="max_personas" value={formData.max_personas} onChange={handleChange} required />
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-400 text-white mb-3">Actualizar Evento</button>
                </div>

            </form>
        </div>
    );
};
