import { useState } from "react";
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        userServices
            .register(formData)
            .then((data) => {
                if (data.success) {
                    setFormData({
                        email: "",
                        password: "",
                        role: "",
                    });
                }
            });
    };

    return (
        <div className="container justify-items-center w-50 my-5">
            <h1 className="text-center">Registro <br /> <span className="span-text">MentorMatch</span></h1>
            <div className="d-flex justify-content-center" >
                <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="logo-image"></img>
            </div>
            <div className="d-flex justify-content-center">
            <form className="form-style" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputPassword1"
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>

                    <select class="form-select" id="inputGroupSelect01" value={formData.role} name="role" onChange={handleChange}>
                        <option selected>Indica tu role...</option>
                        <option value="mentor">Mentor</option>
                        <option value="student">Estudiante</option>

                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
            </div>
        </div>
    );
};

export default Register;