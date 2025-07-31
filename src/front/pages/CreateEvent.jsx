import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => { // Maneja los cambios en los campos del formulario
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => { // Maneja el cambio de img
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isValidTag = (tag) => {
    const validPattern = /^[\w-]{1,12}$/; // Esto solo permite letras, números y guiones, con un máximo de 12 caracteres
    return validPattern.test(tag);
  };

  const handleCategoryInput = (e) => { // Maneja la entrada de categoría
    setCategoryInput(e.target.value);
  };

  const handleCategoryKeyDown = (e) => { // Maneja la tecla presionada para añadir categorías
    if (
      (e.key === "Enter" || e.key === ",") && // Verifica si se presiona Enter y a;adida tb la coma
      categoryInput.trim() !== "" &&
      formData.categories.length < 4
    ) {
      e.preventDefault();
      const newTag = categoryInput.trim();

      if (
        isValidTag(newTag) &&
        !formData.categories.includes(newTag)
      ) {
        setFormData((prev) => ({
          ...prev,
          categories: [...prev.categories, newTag]
        }));
        setCategoryInput("");
      }
    }
  };

  const handleRemoveCategory = (tag) => { // Logiaca que limina la categoria
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((t) => t !== tag)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", formData, imageFile);
    // Aquí va la lógica para enviar a Supabase
  };

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="mb-4 flex justify-center">
        <button
          onClick={rutaVistaHome}
          className="mb-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"> Volver a home
        </button>
      </div>
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-8 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 leading-relaxed"> Crear un evento
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
              <p className="text-base text-gray-500 font-normal leading-relaxed"> Completa el siguiente formulario.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1"> Imagen principal del evento
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">  Nombre del evento
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={3}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría por etiquetas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={categoryInput}
                onChange={handleCategoryInput}
                onKeyDown={handleCategoryKeyDown}
                placeholder={ // se rellena el placeholder al llenar las 4 etiquetas y por defecto presenta el segundo mensaje
                  formData.categories.length >= 4
                    ? "Máximo 4 etiquetas"
                    : "Añade una etiqueta y pulsa Enter"
                }
                maxLength={12}
                disabled={formData.categories.length >= 4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required={formData.categories.length === 0}
              />
              <p className="text-xs text-gray-400 mt-1"> Máximo 4 etiquetas · 12 caracteres máx. · Solo letras, números y guiones
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(tag)}
                      className="ml-2 text-gray-400 hover:text-red-400 focus:outline-none"
                      style={{ fontSize: "1rem", lineHeight: "1" }}
                      aria-label={`Eliminar ${tag}`} > ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Fecha
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Hora
              </label>
              <input
                type="time"
                name="time"
                step="300"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Ubicación o enlace
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Visibilidad
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="public">Público</option>
                <option value="private">Privado</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Máximo de asistentes (opcional)
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
                placeholder="Mantener vacio para ilimitado"
                inputMode="numeric"
                pattern="[0-9]*"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />

              {formData.maxGuests !== "" && formData.maxGuests <= 0 && (
                <p className="text-sm text-red-500 mt-1">
                  El número debe ser mayor que 0 o dejarse vacío.
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"> Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"> Crear evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
