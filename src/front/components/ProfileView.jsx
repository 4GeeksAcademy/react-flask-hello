import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

export const ProfileView = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id"); // guarda este valor al hacer login

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error("Error fetching user");
        const data = await resp.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) fetchUser();
  }, [userId, token]);

  if (!user)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="light" />
      </div>
    );

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-light py-5"
    >
      <Card className="p-4 bg-secondary text-center" style={{ maxWidth: "400px", borderRadius: "20px" }}>
        <div className="mb-3">
          <img
            src={user.avatar_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="avatar"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>
        <h4>{user.name}</h4>
        <p className="text-light opacity-75 mb-1">{user.email}</p>
        <p className="text-light small">{user.biography || "No biography yet"}</p>

        <hr />
        <div className="text-start px-3">
          <p><strong>Sports:</strong> {user.sports || "Not specified"}</p>
          <p><strong>Level:</strong> {user.level || "Not specified"}</p>
        </div>

        <Button
          variant="warning"
          className="mt-3"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>
      </Card>
    </Container>
  );
};
