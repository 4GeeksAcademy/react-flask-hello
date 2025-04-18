import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dash_admin.css";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import Report from "../../components/Reports/Reports";
import UserFormModal from "../../components/UserFormModal/UserFormModal";


const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFields, setUserFields] = useState([]);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { store } = useGlobalReducer();
  const token = store.auth.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserFields(res.data);
      setReportModalOpen(true);
    } catch (err) {
      console.error("Error fetching fields:", err);
      setUserFields([]);
      setReportModalOpen(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/users?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const filteredUsers = users
    .filter((u) => u.rolId !== 1)
    .filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className="dashboard-admin-container">
      <h2 className="dashboard-title">Dashboard Admin</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="create-user-button" onClick={() => setCreateModalOpen(true)}>➕ Crear Usuario</button>
      </div>

      <div className="user-cards-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <h4>{user.name} {user.lastname}</h4>
            <p>{user.email}</p>
            <p><strong>DNI:</strong> {user.dni}</p>

            <div className="card-actions">
              <button onClick={() => handleUserClick(user)}>📁 Subir Informe</button>
              <button onClick={() => { setEditingUser(user); setEditModalOpen(true); }} className="edit-btn">✏️ Editar</button>
              <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">🗑️ Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {reportModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={() => setReportModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Report
              userId={selectedUser.id}
              fields={userFields}
              onClose={() => setReportModalOpen(false)}
              onUploaded={() => setReportModalOpen(false)}
            />
          </div>
        </div>
      )}

      <UserFormModal
        isOpen={editModalOpen || createModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setCreateModalOpen(false);
          setEditingUser(null);
        }}
        userToEdit={editingUser}
        onSave={(newOrUpdatedUser) => {
          setUsers((prevUsers) => {
            const exists = prevUsers.find((u) => u.id === newOrUpdatedUser.id);
            if (exists) {
              return prevUsers.map((u) =>
                u.id === newOrUpdatedUser.id ? newOrUpdatedUser : u
              );
            } else {
              return [...prevUsers, newOrUpdatedUser];
            }
          });
        }}
      />

    </div>
  );
};

export default DashboardAdmin;
