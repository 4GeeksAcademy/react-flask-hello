import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../api/supabaseClient.js";
import { backendUrl } from "../utils/Config";
import { notifyError, notifySuccess } from "../utils/Notifications";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",               // <-- Lo de antes
    maxGuests: "",
    categories: [],
    portada: "",            // url final (publicUrl)
    price: 0,
    visibility: "public",   // <-- Interfaz añadida
    reminder: false         // <-- Interfaz añadida
  });

  // imagen
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("/Knect-logo.png");

  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  let { eventId } = useParams();
  const { store } = useGlobalReducer();
  const navigate = useNavigate();

  // Cargar datos si estamos editando
  useEffect(() => {
    if (!eventId) return;
    const found = store?.misEventos?.find((e) => e.id == eventId);
    if (!found) {
      navigate("/mis-eventos");
      return;
    }
    const cats = (found.categoria || "").split(",").map(s => s.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      title: found.titulo || "",
      description: found.definicion || "",
      date: found.fecha || "",
      time: found.hora || "",
      maxGuests: found.max_asist ?? "",
      categories: cats,
      portada: found.portada || "",
      price: found.precio ?? 0,
    }));
    if (found.portada) setImagePreview(found.portada);
  }, [eventId, navigate, store]);

  // ------------ handlers ------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const isValidTag = (tag) => /^[\w-]{1,12}$/.test(tag);

  const handleCategoryInput = (e) => setCategoryInput(e.target.value);

  const handleCategoryKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && categoryInput.trim() !== "" && formData.categories.length < 4) {
      e.preventDefault();
      const t = categoryInput.trim();
      if (isValidTag(t) && !formData.categories.includes(t)) {
        setFormData((prev) => ({ ...prev, categories: [...prev.categories, t] }));
        setCategoryInput("");
      }
    }
  };

  const handleRemoveCategory = (tag) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((t) => t !== tag),
    }));
  };

  const rutaVistaHome = () => navigate("/home");

  // subir imagen si hay file
  const uploadImageIfNeeded = async () => {
    if (!imageFile) return formData.portada || ""; // con esto conserva la que había

    const ext = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `events/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images.event")                  // <-- cambia el nombre si vuestro bucket esdiferente
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error(uploadError);
      throw new Error("No se pudo subir la imagen");
    }

    const { data } = supabase.storage.from("images.event").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Para alta: requiere imagen
      if (!eventId && !imageFile && !formData.portada) {
        notifyError("Selecciona una imagen para el evento");
        setIsLoading(false);
        return;
      }

      // 1) subir imagen 
      const portadaUrl = await uploadImageIfNeeded();

      // 2) payload para el backend actual 
      const payload = {
        titulo: formData.title,
        definicion: formData.description,
        fecha: formData.date,
        hora: formData.time || null,                         // (si backend ya lo soporta)
        categoria: formData.categories.join(", "),
        precio: formData.price || 0,
        max_asist: formData.maxGuests || null,
        portada: portadaUrl || "",
        // visibilidad: formData.visibility,                 // <- descomenta cuando el backend lo acepte
        // recordatorio: formData.reminder,                  // <- descomenta cuando el backend lo acepte
      };

      if (eventId) {
        await fetch(`${backendUrl}events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        notifySuccess("Actualizado exitosamente!");
      } else {
        await fetch(`${backendUrl}events/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // si el backend lo requiere
          },
          body: JSON.stringify(payload),
        });
        notifySuccess("Evento creado exitosamente!");
      }

      // 3) ver la lista
      navigate("/eventos");
    } catch (err) {
      console.error(err);
      notifyError("Error al crear/actualizar el evento");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------ La interfaz del usuario ------------
  return (
    <main className="create-event">
      <section className="create-event__card">
        <div className="create-event__topbar">
          <button onClick={rutaVistaHome} disabled={isLoading} className="btn btn-ghost" type="button">
            ← Volver a home
          </button>
        </div>

        <h1 className="create-event__title">{eventId ? "Actualizar evento" : "Crear evento"}</h1>
        <p className="create-event__subtitle">Completa el formulario</p>

        {/* Preview circular */}
        <div className="thumb">
          {imagePreview ? (
            <img src={imagePreview} alt="Imagen del evento" className="thumb__img" />
          ) : (
            <span className="thumb__placeholder">Imagen del evento</span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="create-event__form">
          {/* Imagen  */}
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

          {/* Categorías */}
          <div className="form-row">
            <label htmlFor="tags">Categoría por etiquetas <span aria-hidden="true">*</span></label>
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
            <small className="help">Máximo 4 etiquetas · 12 caracteres máx. · Solo letras, números y guiones</small>

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

          {/* Fecha */}
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

          {/* Hora  */}
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
            />
          </div>

          {/* Visibilidad (UI) */}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, maxGuests: e.target.value }))}
              onKeyDown={(e) => { if (["e","E","+","-",".",","].includes(e.key)) e.preventDefault(); }}
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Mantener vacío para ilimitado"
              disabled={isLoading}
            />
            {formData.maxGuests !== "" && Number(formData.maxGuests) < 1 && (
              <small className="help is-error">El número debe ser mayor que 0 o dejarse vacío.</small>
            )}
          </div>

          {/* Recordatorio (UI) */}
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

          {/* Precio */}
          <div className="form-row form-row--half">
            <label htmlFor="price">Precio</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              onKeyDown={(e) => { if (["e","E","+","-",".",","].includes(e.key)) e.preventDefault(); }}
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="Precio del evento"
              disabled={isLoading}
            />
          </div>

          {/* Acciones */}
          <div className="form-actions">
            <button type="button" disabled={isLoading} className="btn btn-ghost" onClick={rutaVistaHome}>
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              {eventId ? "Actualizar evento" : "Crear evento"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
