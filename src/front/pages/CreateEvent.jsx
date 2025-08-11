import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../api/supabaseClient.js';

export function CreateEvent() {
  const [imagePreview, setImagePreview] = useState("/Knect-logo.png");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
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
  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isValidTag = (tag) => {
    const validPattern = /^[\w-]{1,12}$/;
    return validPattern.test(tag);
  };

  const handleCategoryInput = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleCategoryKeyDown = (e) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      categoryInput.trim() !== "" &&
      formData.categories.length < 4
    ) {
      e.preventDefault();
      const newTag = categoryInput.trim();

      if (isValidTag(newTag) && !formData.categories.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          categories: [...prev.categories, newTag]
        }));
        setCategoryInput("");
      }
    }
  };

  const handleRemoveCategory = (tag) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((t) => t !== tag)
    }));
  };

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/home"); // <- antes /vistahome
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!imageFile) {
        alert("Selecciona una imagen para el evento");
        setIsLoading(false);
        return;
      }

      // 1) Subir imagen a Supabase Storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images.event")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("images.event")
        .getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // 2) Usuario actual (v1). Si usáis supabase-js v2, usa getUser()
      const user = supabase.auth.user();
      if (!user) {
        alert("Usuario no autenticado");
        setIsLoading(false);
        return;
      }

      // 3) Insertar en la tabla con hora y ubicación, y pedir id devuelto
      const { data: inserted, error: insertError } = await supabase
        .from("Evento")
        .insert([
          {
            titulo: formData.title,
            definicion: formData.description,
            fecha: formData.date,
            hora: formData.time,             // <--- añadido
            ubicacion: formData.location,    // <--- añadido (cambia a 'location' si la columna se llamara así)
            portada: publicUrl,
            creador_evento: user.id,
            categoria: JSON.stringify(formData.categories),
            max_asist:
              formData.maxGuests === "" ? null : parseInt(formData.maxGuests, 10),
          },
        ])
        .select("id")   // <--- pedimos volver con el id creado
        .single();

      if (insertError) throw insertError;

      alert("Evento creado con éxito");
      // 4) Redirigir a la lista y pasar el id recién creado (opcional para resaltar)
      navigate("/eventos", { state: { newEventId: inserted.id } });
    } catch (error) {
      console.error("Error al crear evento:", error.message);
      alert("Error al crear evento, revisa la consola.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="mb-4 flex justify-center">
        <button
          onClick={rutaVistaHome}
          disabled={isLoading}
          className={`mb-1 px-4 py-2 rounded-md ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Volver a home
        </button>
      </div>
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-8 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 leading-relaxed">
                Crear un evento
              </h2>
            </div>
            <div className="flex justify-center mb-2">
              <div className="h-35 w-35 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Imagen del evento"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mb-6 text-center">
              <p className="text-base text-gray-500 font-normal leading-relaxed">
                Completa el siguiente formulario.
              </p>
            </div>

            {/* Imagen */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen principal del evento
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Título */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nombre del evento
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
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
                value={formData.date}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                step="300"
                value={formData.time}
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
                value={formData.location}
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
                value={formData.visibility}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
        </div>
      </div>
    </div>
  );
}
