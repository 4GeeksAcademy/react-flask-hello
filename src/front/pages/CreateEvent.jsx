import { useState } from "react";
import { supabase } from '../../api/supabaseClient.js';
import { useNavigate, useRevalidator } from "react-router-dom"
import { backendUrl } from '../utils/Config';
import { notifyError, notifySuccess } from '../utils/Notifications';

export function CreateEvent() {
  const [imagePreview, setImagePreview] = useState("/Knect-logo.png");
  const [imageFile, setImageFile] = useState(null);
  const [imgError, setImgError] = useState(false); // 

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
      setImgError(false); // por si falla (Código de IA)
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
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {


      const payload = {
        titulo: formData.title,
        definicion: formData.description,
        fecha: formData.date,
        categoria: formData.categories.join(", "),
        precio: formData.price || 0,
        max_asist: formData.maxGuests || null,
        portada: formData.portada || "",
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


      notifySuccess("Evento creado exitosamente!");
      navigate('/home');
    } catch (error) {
      notifyError('Error de red o servidor');
      console.error('Error en fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="create-event">
      <section className="create-event__card">

        <div className="create-event__topbar">
          <button
            onClick={rutaVistaHome}
            disabled={isLoading}
            className="btn btn-ghost"
            type="button"
          >
            ← Volver a home
          </button>
        </div>

        <h1 className="create-event__title">Crear un evento</h1>
        <p className="create-event__subtitle">Completa el formulario</p>

        {/* Preview circular */}
        <div className="thumb">
          {!imgError ? (
            <img
              src={imagePreview}
              alt=""
              onError={() => setImgError(true)}
              className="thumb__img"
            />
          ) : (
            <span className="thumb__placeholder">Imagen del evento</span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="create-event__form">
          {/* Imagen */}
          <div className="form-row">
            <label htmlFor="image">Imagen principal del evento</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </div>

          {/* Título */}
          <div className="form-row">
            <label htmlFor="title">Nombre del evento</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* Descripción */}
          <div className="form-row">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
              rows={3}
              required
            />
          </div>

          {/* Categorías (chips) */}
          <div className="form-row">
            <label htmlFor="tags">
              Categoría por etiquetas <span aria-hidden="true">*</span>
            </label>
            <input
              id="tags"
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
              required={formData.categories.length === 0}
            />
            <small className="help">
              Máximo 4 etiquetas · 12 caracteres máx. · Solo letras, números y guiones
            </small>

            <div className="chips">
              {formData.categories.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(tag)}
                    disabled={isLoading}
                    className="chip__close"
                    aria-label={`Eliminar ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="form-row form-row--half">
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-row form-row--half">
            <label htmlFor="time">Hora</label>
            <input
              id="time"
              type="time"
              name="time"
              step="300"
              value={formData.time}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* Ubicación */}
          <div className="form-row">
            <label htmlFor="location">Ubicación o enlace</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="C/ Ejemplo 12 · o https://meet…"
              required
            />
          </div>

          {/* Visibilidad */}
          <div className="form-row form-row--half">
            <label htmlFor="visibility">Visibilidad</label>
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="public">Público</option>
              <option value="private">Privado</option>
            </select>
          </div>

          {/* Máximo asistentes */}
          <div className="form-row form-row--half">
            <label htmlFor="maxGuests">Máximo de asistentes (opcional)</label>
            <input
              id="maxGuests"
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, maxGuests: e.target.value }))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", ".", ","].includes(e.key)) e.preventDefault();
              }}
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Mantener vacío para ilimitado"
              disabled={isLoading}
            />
            {formData.maxGuests !== "" && Number(formData.maxGuests) < 1 && (
              <small className="help is-error">
                El número debe ser mayor que 0 o dejarse vacío.
              </small>
            )}
          </div>

          <div className="form-row form-row--half">
            <label htmlFor="price">Precio</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", ".", ","].includes(e.key)) e.preventDefault();
              }}
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Precio del evento"
              disabled={isLoading}
            />
          </div>

          {/* Recordatorio  */}
          <div className="form-row">
            <label className="create-event__checkbox">
              <input
                type="checkbox"
                name="reminder"
                checked={formData.reminder}
                onChange={handleChange}
                disabled={isLoading}
              />
              ¿Enviar recordatorio?
            </label>
          </div>

          {/* Acciones */}
          <div className="form-actions">
            <button
              type="button"
              disabled={isLoading}
              className="btn btn-ghost"
              onClick={rutaVistaHome}
            >
              Cancelar
            </button>

            <button type="submit" disabled={isLoading} className="btn btn-primary">
              {isLoading ? "Creando…" : "Crear evento"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
