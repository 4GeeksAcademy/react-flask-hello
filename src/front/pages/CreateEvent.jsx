import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom"
import { backendUrl } from '../utils/Config';




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

            const respuestaFormulario = await fetch( backendUrl + `event/${userId}`, {
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
           

            {/* Descripción */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="description"
                value={datosFormulario.description}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={3}
                required
              ></textarea>
            </div>

            {/* Categorías (chips) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría por etiquetas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={categoryInput}
                onChange={handleCategoryInput}
                onKeyDown={handleCategoryKeyDown}
                placeholder={
                  formData.categories.length >= 4
                    ? "Máximo 4 etiquetas"
                    : "Añade una etiqueta y pulsa Enter"
                }
                maxLength={12}
                disabled={formData.categories.length >= 4 || isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required={formData.categories.length === 0}
              />
              <p className="text-xs text-gray-400 mt-1">
                Máximo 4 etiquetas · 12 caracteres máx. · Solo letras, números y guiones
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(tag)}
                      disabled={isLoading}
                      className="ml-2 text-gray-400 hover:text-red-400 focus:outline-none"
                      style={{ fontSize: "1rem", lineHeight: "1" }}
                      aria-label={`Eliminar ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Fecha */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={datosFormulario.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Hora */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Hora
              </label>
              <input
                type="time"
                name="time"
                value={datosFormulario.time}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Ubicación */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ubicación o enlace
              </label>
              <input
                type="text"
                name="location"
                value={datosFormulario.location}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Visibilidad */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Visibilidad
              </label>
              <select
                name="visibility"
                value={datosFormulario.visibility}
                onChange={handleChange}
            >
                <option value="public">Público</option>
                <option value="private">Privado</option>
              </select>
            </div>

            {/* Máximo asistentes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Máximo de asistentes (opcional)
              </label>
              <input
                type="text"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[1-9]\d*$/.test(value)) {
                    setFormData((prev) => ({ ...prev, maxGuests: value }));
                  }
                }}
                placeholder="Mantener vacío para ilimitado"
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {formData.maxGuests !== "" && formData.maxGuests <= 0 && (
                <p className="text-sm text-red-500 mt-1">
                  El número debe ser mayor que 0 o dejarse vacío.
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                disabled={isLoading}
                className={`px-4 py-2 rounded-md ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => navigate("/eventos")}  // <- ahora vuelve a la lista
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Crear evento"
                )}
              </button>
            </div>
          </form>
         );
}
