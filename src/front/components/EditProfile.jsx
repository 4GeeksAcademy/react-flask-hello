import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    sports: "",
    level: "",
    avatar_url: "",
    latitude: "",
    longitude: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error("Error fetching user");
        const data = await resp.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUser();
  }, [userId, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!resp.ok) throw new Error("Error updating profile");
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
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
      <Card className="p-4 bg-secondary text-light" style={{ maxWidth: "500px", borderRadius: "20px" }}>
        <h3 className="text-center mb-4">Edit Profile</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="biography"
              value={formData.biography || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sports</Form.Label>
            <Form.Control
              type="text"
              name="sports"
              value={formData.sports || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="text"
              name="level"
              value={formData.level || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              name="avatar_url"
              value={formData.avatar_url || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate("/profile")}>
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
