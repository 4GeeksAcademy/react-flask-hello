import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const SignUp = () => {
    const [validate, setValidate] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            fetch("https://expert-space-carnival-pv7rrpvx65936576-3001.app.github.dev/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    email,
                    password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        alert("Usuario creado correctamente");
                        window.location.href = "/";
                    } else {
                        alert("Error al crear el usuario");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        setValidate(true);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <div className="p-4 border rounded bg-white shadow">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form noValidate validated={validate} onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Nombre obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" required onChange={(e) => setLastName(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Apedillos obligatorios.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" required on onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Email valido Obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Contraseña obligatoria.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
