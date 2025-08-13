import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom"
import { backendUrl } from '../utils/Config';
import { notifyError, notifySuccess } from '../utils/Notifications';




export const CreateEvent = () => {
    const navigate = useNavigate();
    const [datosFormulario, setDatosFormulario] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        visibility: "public",
        maxGuests: "",
        reminder: false,
        categories: [],
        price: 0,
        portada: ""
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDatosFormulario((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId) {
                notifyError("Usuario no autenticado. Inicia sesión primero.");
                return;
            }


            // Mapeo de campos para que coincidan con el backend
            const payload = {
                titulo: datosFormulario.title,
                definicion: datosFormulario.description,
                fecha: datosFormulario.date,
                categoria: datosFormulario.categories.join(", "), // si son varias
                precio: datosFormulario.price || 0, // añade price en el front si lo quieres
                max_asist: datosFormulario.maxGuests || null,
                portada: datosFormulario.portada || "", // si tienes imagen
            };

            const respuestaFormulario = await fetch(backendUrl + `events/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // opcional si el backend lo requiere
                },
                body: JSON.stringify(payload)
            });

            const data = await respuestaFormulario.json();
            console.log('Respuesta backend:', data);

            if (respuestaFormulario.ok) {
                notifySuccess("Evento creado exitosamente!");
                navigate('/home');
            } else {
                alert(data.error || 'Error al crear evento, vuelve a intentarlo');
            }
        } catch (error) {
            notifyError('Error de red o servidor');
            console.error('Error en fetch:', error);

        }
    };

    return (
        <form onSubmit={handleForm} style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>Crear nuevo evento</h2>

            <label>Título:</label>
            <input
                type="text"
                name="title"
                value={datosFormulario.title}
                onChange={handleChange}
                required
            />

            <label>Descripción:</label>
            <textarea
                name="description"
                value={datosFormulario.description}
                onChange={handleChange}
            />

            <label>Fecha:</label>
            <input
                type="date"
                name="date"
                value={datosFormulario.date}
                onChange={handleChange}
                required
            />

            <label>Hora:</label>
            <input
                type="time"
                name="time"
                value={datosFormulario.time}
                onChange={handleChange}
            />

            <label>Ubicación:</label>
            <input
                type="text"
                name="location"
                value={datosFormulario.location}
                onChange={handleChange}
            />

            <label>Visibilidad:</label>
            <select
                name="visibility"
                value={datosFormulario.visibility}
                onChange={handleChange}
            >
                <option value="public">Público</option>
                <option value="private">Privado</option>
            </select>

            <label>Máximo de invitados:</label>
            <input
                type="number"
                name="maxGuests"
                value={datosFormulario.maxGuests}
                onChange={handleChange}
            />

            <label>
                <input
                    type="checkbox"
                    name="reminder"
                    checked={datosFormulario.reminder}
                    onChange={handleChange}
                />
                ¿Enviar recordatorio?
            </label>

            {/* Puedes añadir categorías como un input de texto o un selector múltiple */}
            <label>Categorías (separadas por comas):</label>
            <input
                type="text"
                name="categories"
                value={datosFormulario.categories.join(", ")}
                onChange={(e) =>
                    setDatosFormulario((prev) => ({
                        ...prev,
                        categories: e.target.value.split(",").map((cat) => cat.trim())
                    }))
                }
            />

            <button type="submit" style={{ marginTop: "20px" }}>
                Crear evento
            </button>
        </form>
    );
};