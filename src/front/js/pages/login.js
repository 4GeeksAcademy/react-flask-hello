import React, {useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate,Link } from 'react-router-dom'


export const Login = () => {
    
    const {store,actions}=useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const loginUser =  async () => {
        const loginSuccessful = await actions.loginUserExisting({
            email,
            password
        })

        if(loginSuccessful){
            navigate("/userdata");
            return;
        }

        setEmail("")
        setPassword("")
        setError("User or password incorrect");


    }
  
    return (
      <div className='container-form'>
          <form 
          id='contact-form' className='form-signup'>
              <h6>Login</h6>
              <label className='label-signup' for="email">Email:</label>
              <input className='input-signup' type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
    
              <label className='label-signup' for="password">Password:</label>
              <input className='input-signup' type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
  
              <button className="button-signup" type="button" onClick={loginUser}>Login</button>
          </form>
          {error && <p>{error}</p>}

          <div className='goHome-login'>
            <Link to="/">Go to Home</Link>
            </div>

      </div>
    )
}