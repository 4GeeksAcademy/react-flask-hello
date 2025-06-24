import { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const resp = await fetch(backendUrl+"/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await resp.json();
            if (resp.ok) {
                alert("Successful registration!")
            } else {
                alert(data.message || "Registration error!");
            }
        } catch (err) {
            alert("Server error!")
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <form className="container card" style={{ width: "100%", maxWidth: "800px" }}>
                <div className="row mt-2">
                    <div className="col-6">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="col-12">
                    <label for="inputFullName" className="form-label">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" id="inputFullName" placeholder="Full Name" />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" id="inputAddress" placeholder="123 Main ST" />
                </div>
                <div className="row">
                    <div className="col-6">
                        <label for="inputPhone" className="form-label">Phone</label>
                        <input type="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" id="inputPhone" />
                    </div>
                    
                </div>
                
                <div className="col-12 mb-2 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;