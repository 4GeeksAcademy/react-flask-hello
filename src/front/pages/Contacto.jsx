import { useState } from "react";

export const Contacto = () => {
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
        info: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulario enviado");
    };

    return (
        <div className="container mt-5">
            <h1>Contacto</h1>
            <form onSubmit={handleSubmit} className="mt-4" style={{maxWidth: 500}}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Información adicional</label>
                    <textarea
                        className="form-control"
                        name="info"
                        rows={4}
                        value={form.info}
                        onChange={handleChange}
                        placeholder="Describe aqui tu mensaje (:"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};