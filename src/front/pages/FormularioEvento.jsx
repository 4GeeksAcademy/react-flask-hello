import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";


function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

const safeParseJSON = (str) => {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};


const FormularioEvento = () => {
  const navigate = useNavigate()
  const { id: eventId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      aceptaColaboradores: true,
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEventData = async () => {
      if (!eventId) return;

      setLoading(true);
      const token = localStorage.getItem("token");
      const payload = token ? parseJwt(token) : null;
      const userId = payload?.sub;
      if (!userId) {
        alert("Usuario no autenticado o token inválido");
        setLoading(false);
        return;
      }

      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/${userId}/eventos/${eventId}`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          alert("Error al cargar datos del evento");
          setLoading(false);
          return;
        }
        const eventData = await res.json();

        console.log("Datos cargados para editar:", eventData);

        // Asegurarse de que invitados, servicios y recursos sean arrays
        const invitadosArray = Array.isArray(eventData.invitados)
          ? eventData.invitados
          : safeParseJSON(eventData.invitados);

        const serviciosArray = Array.isArray(eventData.servicios)
          ? eventData.servicios
          : safeParseJSON(eventData.servicios);

        const recursosArray = Array.isArray(eventData.recursos)
          ? eventData.recursos
          : safeParseJSON(eventData.recursos);

        reset({
          nombre: eventData.nombre || "",
          fechaHora: eventData.fecha || "",
          ubicacion: eventData.ubicacion || "",
          descripcion: eventData.descripcion || "",
          invitados: invitadosArray.join(", "),
          maxInvitados: eventData.max_invitados || "",
          tipoActividad: eventData.tipo_actividad || "",
          vestimenta: eventData.vestimenta || "",
          aceptaColaboradores: eventData.acepta_colaboradores ?? true,
          servicios: serviciosArray.join(", "),
          recursos: recursosArray.join(", "),
        });

        setValue("aceptaColaboradores", eventData.acepta_colaboradores ?? true);

        setLoading(false);
      } catch (error) {
        alert("Error inesperado al cargar evento: " + error.message);
        setLoading(false);
      }
    };

    loadEventData();
  }, [eventId, reset, setValue]);

  const onSubmit = async (data) => {
  console.log("Datos del formulario para enviar:", data);

  // Procesar campos para backend (snake_case)
  const processedData = {
  nombre: data.nombre,
  descripcion: data.descripcion,
  fecha: data.fechaHora,
  ubicacion: data.ubicacion,
  acepta_colaboradores: data.aceptaColaboradores,
  invitados: null, // seguimos igual, invitados se envían aparte
  max_invitados: data.maxInvitados ? Number(data.maxInvitados) : null,
  tipo_actividad: data.tipoActividad,
  vestimenta: data.vestimenta,
  servicios: data.servicios
    ? data.servicios
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    : [],
  recursos: data.recursos
    ? data.recursos
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r !== "")
    : [],
};

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado");
    return;
  }
  const payload = parseJwt(token);
  const userId = payload?.sub;
  if (!userId) {
    alert("Usuario no autenticado o token inválido");
    return;
  }

  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/${userId}/eventos`;
  const url = eventId ? `${baseUrl}/${eventId}` : baseUrl;

  try {
    const res = await fetch(url, {
      method: eventId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(processedData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(
        (eventId ? "Error al modificar" : "Error al crear") +
          " evento: " +
          (errorData.message || res.statusText)
      );
      return;
    }

    const eventResponse = await res.json();
    alert(eventId ? "Evento modificado con éxito!" : "Evento creado con éxito!");

    // Si es creación de evento (no edición), hacemos POST para crear invitaciones
    if (!eventId) {
      const nuevoEventoId = eventResponse.evento.id; // asumir que el backend devuelve el ID en evento.id

      // Preparar lista de invitados
      const invitadosArray = data.invitados
        ? data.invitados
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email !== "")
        : [];

      if (invitadosArray.length > 0) {
        const urlInvitaciones = `${baseUrl}/${nuevoEventoId}/invitaciones`;

        const resInv = await fetch(urlInvitaciones, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ emails: invitadosArray }),
        });

        if (!resInv.ok) {
          const errorInv = await resInv.json();
          alert(
            "Evento creado pero error al agregar invitaciones: " +
              (errorInv.message || resInv.statusText)
          );
        } else {
          alert("Invitaciones enviadas correctamente");
        }
      }
    }

    reset();
    setValue("aceptaColaboradores", true);
    navigate("/dashboard");
  } catch (error) {
    alert("Error de red o inesperado: " + error.message);
  }
};

  if (loading) {
    return <p>Cargando datos del evento...</p>;
  }

  return (
    <div className="homepage-container pt-5 pb-5 d-flex justify-content-center">
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h1 style={{ color: '#ff2e63' }} className="mb-0 ">{eventId ? "Editar evento" : "Crear evento"}</h1>
          <div className="btn-group" role="group" aria-label="Navegación rápida">
            <button
              type="button"
              className="btn btn-dark btn-sm mx-2"
              onClick={() => navigate("/dashboard")}
              style={{ minWidth: "130px" }}
            >
              Volver al Dashboard
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => navigate("/")}
              style={{ minWidth: "130px" }}
            >
              Ir al Home
            </button>
          </div>
        </div>

        <form
          id="eventForm"
          className="row g-3 p-4 rounded shadow"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Nombre del evento - obligatorio */}
          <div className="col-md-12">
            <label htmlFor="nombre" className="form-label">
              Nombre del evento *
            </label>
            <input
              type="text"
              id="nombre"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <div className="invalid-feedback">{errors.nombre.message}</div>
            )}
          </div>

          {/* Fecha y hora - obligatorio */}
          <div className="col-md-6">
            <label htmlFor="fechaHora" className="form-label">
              Fecha y hora *
            </label>
            <input
              type="datetime-local"
              id="fechaHora"
              className={`form-control ${errors.fechaHora ? "is-invalid" : ""}`}
              {...register("fechaHora", { required: "La fecha y hora son obligatorias" })}
            />
            {errors.fechaHora && (
              <div className="invalid-feedback">{errors.fechaHora.message}</div>
            )}
          </div>

          {/* Switch acepta colaboradores - obligatorio, default true */}
          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check form-switch mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="aceptaColaboradores"
                {...register("aceptaColaboradores")}
                defaultChecked={true}
              />
              <label className="form-check-label" htmlFor="aceptaColaboradores">
                Acepta colaboradores
              </label>
            </div>
          </div>

          {/* Ubicación - opcional */}
          <div className="col-md-12">
            <label htmlFor="ubicacion" className="form-label">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              className="form-control"
              {...register("ubicacion")}
            />
          </div>

          {/* Descripción - opcional */}
          <div className="col-md-12">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="form-control"
              rows={3}
              {...register("descripcion")}
            />
          </div>

          {/* Correos electrónicos invitados - opcional, múltiples separados por coma */}
          <div className="col-md-12">
            <label htmlFor="invitados" className="form-label">
              Correos electrónicos para invitaciones (separados por coma)
            </label>
            <textarea
              id="invitados"
              className="form-control"
              rows={3}
              placeholder="ejemplo@correo.com, otro@correo.com"
              {...register("invitados")}
            />
          </div>

          {/* Cantidad máxima de invitados - opcional, solo números */}
          <div className="col-md-6">
            <label htmlFor="maxInvitados" className="form-label">
              Cantidad máxima de invitados
            </label>
            <input
              type="number"
              id="maxInvitados"
              className="form-control"
              {...register("maxInvitados", {
                valueAsNumber: true,
                min: { value: 1, message: "Debe ser un número positivo" },
              })}
            />
            {errors.maxInvitados && (
              <div className="invalid-feedback">{errors.maxInvitados.message}</div>
            )}
          </div>

          {/* Tipo de actividad - opcional */}
          <div className="col-md-6">
            <label htmlFor="tipoActividad" className="form-label">
              Tipo de actividad
            </label>
            <select
              id="tipoActividad"
              className="form-select"
              {...register("tipoActividad")}
              defaultValue=""
            >
              <option value="">Selecciona...</option>
              <option value="asado">Asado</option>
              <option value="boda">Boda</option>
              <option value="cumpleaños">Cumpleaños</option>
              <option value="reunión">Reunión</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Tipo de vestimenta recomendada - opcional */}
          <div className="col-md-12">
            <label htmlFor="vestimenta" className="form-label">
              Tipo de vestimenta recomendada
            </label>
            <input
              type="text"
              id="vestimenta"
              className="form-control"
              {...register("vestimenta")}
            />
          </div>

          {/* Servicios necesarios - opcional, múltiples separados por coma */}
          <div className="col-md-12">
            <label htmlFor="servicios" className="form-label">
              Servicios necesarios (separados por coma)
            </label>
            <input
              type="text"
              id="servicios"
              className="form-control"
              placeholder="fotógrafo, cocinero, música"
              {...register("servicios")}
            />
          </div>

          {/* Recursos necesarios - opcional, múltiples separados por coma */}
          <div className="col-md-12">
            <label htmlFor="recursos" className="form-label">
              Recursos necesarios (separados por coma)
            </label>
            <input
              type="text"
              id="recursos"
              className="form-control"
              placeholder="comida, bebida, mesas"
              {...register("recursos")}
            />
          </div>

          {/* Botón submit */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="create-event-btn mb-5 fade-in-delay">
              {eventId ? "Guardar cambios" : "Crear evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEvento;
