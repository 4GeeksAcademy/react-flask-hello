import React from "react";
import { FormProvider, useForm } from "react-hook-form";


const Registro = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        fetch("https://fluffy-winner-r4wg4jg4jg97cxqpv-3001.app.github.dev/api/signup/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: data.nombre,
                email: data.email,
                telefono: data.telefono,
                password: data.password
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.message || "Error al registrar usuario");
                    });
                }
                return res.json();
            })
            .then(data => {
                alert("Usuario registrado exitosamente");
                reset(); 
                console.log(data)
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    };

    return (
        <div className="registerHeadTittle m-auto">
            <h1>Formulario de Registro</h1>
            <div id="registerForm" className="container mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row p-4 rounded align-items-center" id="imputRegisterForm">
                        <div className="col-lg-8 col-12">

                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    {...register("nombre", {
                                        required: "Este campo es obligatorio",
                                        pattern: {
                                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                            message: "Solo letras y espacios"
                                        }
                                    })}
                                />
                                {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    {...register("email", {
                                        required: "El correo es obligatorio",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Correo inválido"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telefono"
                                    {...register("telefono", {
                                        required: "El teléfono es obligatorio",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Solo números"
                                        }
                                    })}
                                />
                                {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "Mínimo 6 caracteres"
                                        },
                                        maxLength: {
                                            value: 8,
                                            message: "Máximo 8 caracteres"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    {...register("confirmPassword", {
                                        required: "Confirma tu contraseña",
                                        validate: (value) =>
                                            value === watch("password") || "Las contraseñas no coinciden"
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-danger">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="text-center mt-4">
                                <button type="submit" className="btn-enviarForm" disabled={!isValid}>
                                    Enviar Formulario
                                </button>
                            </div>
                        </div>

                        <div id="registerImg" className="col-lg-4 col-12">
                            <img
                                src="https://imgmedia.larepublica.pe/640x371/larepublica/original/2022/06/17/62acbcc9acce01340a3f8344.webp"
                                alt="Decoración"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;
