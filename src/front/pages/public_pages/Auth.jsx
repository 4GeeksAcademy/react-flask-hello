import { useLocation } from "react-router-dom"
import AuthForm from "../../components/auth-components/AuthForm"
import { useEffect } from "react"

const Auth = () => {

    const location = useLocation()

    const {type} = location.state

    const signupFields = {type: "signup",title: "Sign up", button: "Sign up", fields: [{fieldName: "Username", type: "text", placeholder: "example"}, {fieldName: "Email", type: "email", placeholder: "email@email.com"},{fieldName:"Password", type : "password", placeholder:"password"}, {fieldName: "Confirm password", type: "password", placeholder:"password"},{fieldName: "I agree to the terms and conditions", type: "checkbox"} ] }
    const loginFields = { type: "login", title: "Login", button: "Login", fields: [{ fieldName: "Username/Email", type: "text", placeholder:"username/email@email.com" }, {fieldName: "Password", type: "password", placeholder:"password"}, {fieldName: "Stay signed in", type: "checkbox"}] }

    const color = type == "login" ? "a" : "b"

    useEffect(()=>{
        console.log(location)
    },[])

    return (
        <div className="container-fluid flex-fill">
            <div className="row h-100">
                <div className="col-lg-6 d-none d-lg-block  ">
                    <div className="h-100">
                        <img className="object-fit-cover h-100" src="https://i.pinimg.com/736x/4a/b3/f4/4ab3f4db6e10ff071af3624325c59c37.jpg" />
                    </div>
                </div>
                <div className={`col-lg-6 col-12 p-0 ${color == "a" ? "back-color-1": "back-color-3"} ps-5`}>
                    <div className={`d-flex flex-column align-items-center justify-content-center h-100  ${color== "a" && "border-color-3 border-start border-3" }`}>
                        <AuthForm color={color} fields={type == "login" ? loginFields : signupFields}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Auth