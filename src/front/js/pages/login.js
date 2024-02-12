import React, {useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate,Link } from 'react-router-dom'
import { NavBar } from "../component/navbar";
import Image5 from "../../img/image5.jpg";



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
    <div className="login">
        <NavBar />
        <div className="hero">
            <img className="hero__image" src={Image5} />
            <div className="login-page">
            <div className='container login-form'>
                <form 
                     id='contact-form' className='login-form__input'>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder='e-mail'/>
                    <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder='password'/>
                    <button type="button" onClick={loginUser}><strong>Login</strong></button>
                </form>
            {error && <p>{error}</p>}
            </div>
        </div>
        </div>
        
    </div>
    )
}