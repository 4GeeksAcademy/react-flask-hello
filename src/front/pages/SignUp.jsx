import { useState } from "react";

export function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        is_admin: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch("https://turbo-funicular-wr54xg64jwq73g74v-3001.app.github.dev/api/signup", {
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
                        <input type="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="col-12">
                    <label for="inputFullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputFullName" placeholder="Full Name" />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="123 Main ST" />
                </div>
                <div className="row">
                    <div className="col-6">
                        <label for="inputPhone" className="form-label">Phone</label>
                        <input type="phone" className="form-control" id="inputPhone" />
                    </div>
                    <div className="col-6">
                        <label for="inputID" className="form-label">ID</label>
                        <input type="ID" className="form-control" id="inputID" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" onChange={handleChange}/>
                        <label className="form-check-label" for="gridCheck">
                            Admin?
                        </label>
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