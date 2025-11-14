import React, { useState, useEffect } from "react";
import Form from "../components/Form.jsx";

const Config = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({ email: "", password: "********" });
  const [errorMsn, setErrorMsn] = useState(null);
  const [successMsn, setSuccessMsn] = useState(null);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${backendUrl}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUserData({ email: data.email, password: "********" });
          setNewEmail(data.email);
        } else {
          setErrorMsn(data.msg || "Error al obtener datos del usuario");
        }
      } catch (error) {
        setErrorMsn("Error al conectar con el servidor");
      }
    };
    fetchUser();
  }, []);

  const handleConfigSubmit = async ({ newEmail, newPassword, setErrorMsn }) => {
    setErrorMsn(null);
    setSuccessMsn(null);
    const token = localStorage.getItem("token");
    const body = {};
    if (newEmail) body.email = newEmail;
    if (newPassword) body.password = newPassword;

    try {
      const res = await fetch(`${backendUrl}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        if (newEmail) setUserData((prev) => ({ ...prev, email: newEmail }));
        if (newPassword) setUserData((prev) => ({ ...prev, password: "********" }));
        setSuccessMsn("Cambios guardados correctamente");
      } else {
        setErrorMsn(data.msg || "Error al actualizar datos");
      }
    } catch (error) {
      setErrorMsn("Error al conectar con el servidor");
    }
  };

  return (
    <Form
      mode="config"
      userData={userData}
      onSubmit={handleConfigSubmit}
      successMessage={successMsn}
    />
  );
};

export default Config;