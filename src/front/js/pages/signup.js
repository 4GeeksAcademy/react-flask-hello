import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';


function Singup() {
  const [lastName,setLastName]= useState("")
  const [firstName,setFirstName]= useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confpassword, setConfpassword] = useState("")
  const { store, actions } = useContext(Context)
  const navigate= useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (password !== confpassword) {
      alert('La contraseña no coincide con la confirmacion')
  }
  else{
    let logged= await actions.signup(firstName, lastName, email, password, phone, confpassword)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfpassword("")
  }
   }
    

  return (
   
    <form className='container' onSubmit={handleSubmit}>
      <h1 className='d-flex justify-content-start mb-4'>Regístrate</h1>
      <div className=''>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputEmail1" className="form-label">Nombre</label>
      <input type="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Ingresa tu nombre' onChange={(e) => setFirstName(e.target.value)}/>
    </div>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputPassword1" className="form-label">Apellido</label>
      <input type="apellido" className="form-control" id="exampleInputPassword1" placeholder='Ingresa tu apellido' onChange={(e) => setLastName(e.target.value)}/>
    </div>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputPassword1" className="form-label">Email</label>
      <input type="email" className="form-control" id="exampleInputPassword1" placeholder='Ingresa tu email' onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputPassword1" className="form-label">Telefono de contacto</label>
      <input type="contacto" className="form-control" id="exampleInputPassword1" placeholder='Ingresa un telefono de contacto' onChange={(e) => setPhone(e.target.value)}/>
    </div>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputPassword1" className="form-label">Contraseña</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Ingresa una contraseña'onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="mb-3 texto-amarillo">
      <label for="exampleInputPassword1" className="form-label">Confirmar contraseña</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Confrima tu contraseña'onChange={(e) => setConfpassword(e.target.value)}/>
    </div>
    <button type="submit" className="bg-azul-oscuro d-grid gap-2 col-6 mx-auto">Continuar</button>
    </div>
    <div className= "d-flex justify-content-center mt-4">
      <p>Ya tienes una cuenta?</p> <Link to={"/login"}><p className='texto-amarillo'> Ingresa</p></Link>
    </div>
     <div className="mb-3 form-check d-flex justify-content-center">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Estoy de acuerdo con los Terminos del Servicio y la Política de Privacidad</label>
    </div>
  </form>
  
  );
}

export default Singup;