import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom"




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
        categories: []
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

            const respuestaFormulario = await fetch(`https://bookish-space-pancake-wrx9v5w7wv49c9vxw-3001.app.github.dev/event/${userId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // opcional si el backend lo requiere
                },
                body: JSON.stringify(datosFormulario)
            });

            const data = await respuestaFormulario.json();
            console.log('Respuesta backend:', data);

            if (respuestaFormulario.ok) {
                // Registro correcto, redirigir
                alert("Evento creado correctamente")
                navigate('/home');
            } else {
                alert(data.error || 'Error al crear evento, vuelve a intentarlo');
            }
        } catch (error) {
            console.error('Error en fetch:', error);
            alert('Error de red o servidor');
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