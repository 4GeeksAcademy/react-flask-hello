// src/front/pages/CreateEvent.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.js";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../utils/Config";
import { notifyError, notifySuccess } from "../utils/Notifications";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    maxGuests: "",
    categories: [],
    portada: "",
    price: 0,
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const { eventId } = useParams();
  const { store } = useGlobalReducer();
  const navigate = useNavigate();

  // Si cambia la URL de la portada, reseteamos el estado de error de imagen
  useEffect(() => {
    setImgError(false);
  }, [formData.portada]);

  useEffect(() => {
    if (eventId) {
      const findEvent = store.misEventos.find((e) => e.id == eventId);

      if (!findEvent) {
        navigate("/mis-eventos");
        return;
      }

      const categories = findEvent.categoria
        ? findEvent.categoria.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const newFormat = {
        title: findEvent.titulo || "",
        description: findEvent.definicion || "",
        date: findEvent.fecha || "",
        maxGuests: findEvent.max_asist ?? "",
        categories,
        portada: findEvent.portada || "",
        price: findEvent.precio ?? 0,
      };

      setFormData(newFormat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isValidTag = (tag) => /^[\w-]{1,12}$/.test(tag);

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
          categories: [...prev.categories, newTag],
        }));
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

      if (eventId) {
        // ACTUALIZAR
        await fetch(backendUrl + `events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        notifySuccess("Actualizado exitosamente!");
        navigate("/mis-eventos");
      } else {
        // CREAR
        await fetch(backendUrl + `events/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // si el backend lo requiere
          },
          body: JSON.stringify(payload),
        });
        notifySuccess("Evento creado exitosamente!");
        navigate("/home");
      }
    } catch (error) {
      notifyError("Error de red o servidor");
      console.error("Error en fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="create-event">
      {/* Video de fondo */}
      <video
        className="create-event__bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        {/* CEl video */}
        <source src="https://cdn.pixabay.com/video/2022/07/29/125976-735666724_large.mp4" type="video/mp4" />
        {/* <source src="https://cdn.pixabay.com/video/2023/08/29/1775498_large.mp4" type="video/mp4" /> */}
      </video>

      {/* Capa oscura */}
      <div className="create-event__bg-overlay" />

      {/* TARJETA / FORMULARIO */}
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

        <h1 className="create-event__title">
          {eventId ? "Actualizar evento" : "Crear evento"}
        </h1>
        <p className="create-event__subtitle">Completa el formulario</p>

        {/* Preview circular */}
        <div className="thumb">
          {formData.portada && !imgError ? (
            <img
              src={formData.portada}
              alt="Portada del evento"
              className="thumb__img"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="thumb__placeholder">Imagen del evento</span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="create-event__form">
          {/* Imagen */}
          <div className="form-row">
            <label htmlFor="portada">Imagen principal del evento</label>
            <input
              id="portada"
              type="text"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <small className="help">
              Puedes pegar una URL de imagen (por ejemplo, de Unsplash).
            </small>
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
              Máximo 4 etiquetas · 12 caracteres máx. · Solo letras, números y
              guiones
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
                if (["e", "E", "+", "-", ".", ","].includes(e.key))
                  e.preventDefault();
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

          {/* Precio */}
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
                if (["e", "E", "+", "-", ".", ","].includes(e.key))
                  e.preventDefault();
              }}
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Precio del evento"
              disabled={isLoading}
            />
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
              {eventId ? "Actualizar evento" : "Crear evento"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
