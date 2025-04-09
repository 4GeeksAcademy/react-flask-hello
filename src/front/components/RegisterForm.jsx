import React from "react"
import { useState } from "react"
import { useNavigate} from "react-router"


export default function RegisterForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  })

  // Creando una función genérica para todos los campos
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

  // Para borrar los errores al corregir el campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

  // Validación del email
    if (!formData.email) {
      newErrors.email = "El email es obligatorio"
      
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor, introduzca un email válido"
      
      
      valid = false
    }

  // Validación de contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      valid = false
    }

  // Validación de confirmar contraseña 
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Por favor, confirme la contraseña"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {return}
    
    setIsLoading(true)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

      const response = await fetch(`${backendUrl}/api/auth/signup`, {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
              email: formData.email,
              password: formData.password,
              confirmarpassword: formData.confirmPassword,
          })
      })

      if(!response.ok){
          throw new Error(data.error || "Error al registrar usuario")
      }

      const data = await response.json()

      localStorage.setItem("accessToken", data.access_token)
    
      //navigate("/login") --> Aqui debe hacer navigate to registro de Felipe
      
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  
  return (
    <>
        {errors.form && (
          <div className="alert alert-danger mb-4" role="alert">
            {errors.form}
          </div>
        )}

          <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  placeholder="email@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  placeholder="Crea una contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                  <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3 btn-blue" disabled={isLoading}>
                  {isLoading ? (
                  <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creando tu cuenta...
                  </>
                  ) : (
                  "Crear cuenta"
                  )}
              </button>

              <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 text-muted small">O</span>
                  <hr className="flex-grow-1" />
              </div>

              <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                  //onClick={handleGoogleSignUp} pendiente de completar
                  disabled={isGoogleLoading}
              >
                  {isGoogleLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : (
                  <GoogleIcon className="me-2" />
                  )}
                  Continúa con Google
              </button>

              <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                  ¿Ya tienes cuenta? <br/>
                  <a href="/login" className="text-decoration-none">
                    Entrar
                  </a>
                  </p>
              </div>
          </form>
      </>
      )
    
  }


function GoogleIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
    </svg>
  )
}