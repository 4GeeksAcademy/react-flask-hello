import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  

  const { actions } = useContext(Context)

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      location === ""
    ) {
      actions.showNotification("Complete all fields", "danger");
    } else {

    actions
      .signup(
        email,
        password,
        firstName,
        lastName,
        phone,
        location,
      )

       

      .then((res) =>{ navigate('/login')
      actions.showNotification(res.message,"success")
    })
      .catch((error) => {
        
       actions.showNotification(error.message,"danger")
      })
  }
}



  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className='p-5 ' style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 6%, rgba(128,128,128,1) 30%, rgba(255,255,255,1) 50%, rgba(138,138,138,1) 70%, rgba(0,0,0,1) 94%)" }}>
      <h1 className='mx-auto text-center text-white p-3' style={{ fontSize: '3rem' }}>
        RUL Rules!
      </h1>
      <form
        style={{ borderRadius: "25px" }} className='  card col-12 col-lg-6 mx-auto mb-5 bg-black text-white' onSubmit={handleSubmit}>
        <div className='m-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Email address</h5>
          </label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            id='email'
          />
        </div>
        <div className='m-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            <h5>Password</h5>
          </label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            id='password'
          />
        </div>
        <div className='m-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>First Name</h5>
          </label>
          <input
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            className='form-control'
            id='firstName'
          />
        </div>
        <div className='m-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Last Name</h5>
          </label>
          <input
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            className='form-control'
            id='lastName'
          />
        </div>
        <div className='m-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Phone</h5>
          </label>
          <input
            type='text'
            onChange={(e) => setPhone(e.target.value)}
            className='form-control'
            id='Phone'
          />
        </div>
        <div className='m-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Location</h5>
          </label>
          <input
            type='text'
            onChange={(e) => setLocation(e.target.value)}
            className='form-control'
            id='location'
          />
        </div>
        <button
          style={{ cursor: 'pointer' }}
          type='submit'
          className='btn btn-light  mx-auto m-3 rounded-pill'
        >
          <h5>Create account</h5>
        </button>
      </form>
      <div className=' mb-5  w-50 mx-auto'>
        <h5
          className='text-center text-white'
          style={{ cursor: 'pointer' }}
          onClick={handleLogin}
        >
          if you already have an account go to Login
        </h5>
      </div>
    </div>
  )
}

export default Signup