import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dash_admin.css";
const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", lastname: "", dni: "", rolId: 1 });
  const [error, setError] = useState("");

  // Recuperar token almacenado 
  const token = localStorage.getItem("token");

  // lista de usuarios 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/users`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("User recieved", res.data)
        setUsers(res.data);
        if (res.data.length > 0) setSelectedUser(res.data[0]);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users");
      }
    };
    fetchUsers();
  }, [token]);

  // Función para crear un nuevo usuario
  const handleCreateUser = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUser({ name: "", email: "", password: "", lastname: "", dni: "", rolId: 1 });
      const updatedUsers = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/users`);
      setUsers(updatedUsers.data);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Error creating user");
    }
  };




  // Función para actualizar un usuario
  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/users`,
        editingUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((user) => (user.id === editingUser.id ? res.data : user)));
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Error updating user");
    }
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.filter((user) => user.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Error deleting user");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="dashboard-grid">
        {/* Lista de Usuarios y CRUD */}
        <div className="users-section">
          <h3 className="section-title">Users</h3>
          <ul className="users-list">
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => setSelectedUser(user)}
              >
                <span>{user.name}</span>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingUser(user);
                    }}
                    className="action-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="create-user-form">
            <h4 className="form-title">Create New User</h4>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="form-input"
            />
            <input
              type="text"
              placeholder="Lastname"
              value={newUser.lastname}
              onChange={(e) =>
                setNewUser({ ...newUser, lastname: e.target.value })
              }
              className="form-input"
            />
            <input
              type="text"
              placeholder="DNI"
              value={newUser.dni}
              onChange={(e) =>
                setNewUser({ ...newUser, dni: e.target.value })
              }
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="form-input"
            />
            <input
              type="number"
              placeholder="Rol ID"
              value={newUser.rolId}
              onChange={(e) =>
                setNewUser({ ...newUser, rolId: parseInt(e.target.value) })
              }
              className="form-input"
            />
            <button onClick={handleCreateUser} className="submit-button">
              Create User
            </button>
          </div>
        </div>


        {/* Detalles del Usuario y Edición */}
        <div className="user-details-section">
          <h3 className="section-title">User Details</h3>
          {selectedUser ? (
            <div className="user-details-card">
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.name} {selectedUser.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>DNI:</strong> {selectedUser.dni}
              </p>
              <p>
                <strong>Rol:</strong> {selectedUser.rolId}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(selectedUser.created_at).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Select a user to view details</p>
          )}

          {editingUser && (
            <div className="edit-user-form">
              <h4 className="form-title">Edit User</h4>
              <input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="form-input"
              />
              <input
                type="text"
                placeholder="Lastname"
                value={editingUser.lastname}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, lastname: e.target.value })
                }
                className="form-input"
              />
              <input
                type="text"
                placeholder="DNI"
                value={editingUser.dni}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, dni: e.target.value })
                }
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="form-input"
              />
              <input
                type="password"
                placeholder="New Password (optional)"
                value={editingUser.password || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, password: e.target.value })
                }
                className="form-input"
              />
              <input
                type="number"
                placeholder="Rol ID"
                value={editingUser.rolId}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, rolId: parseInt(e.target.value) })
                }
                className="form-input"
              />
              <div className="form-actions">
                <button onClick={handleUpdateUser} className="submit-button">
                  Update
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;