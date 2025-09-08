import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dash_admin.css";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", lastname: "", dni: "", rolId: 1 });
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Estados para Field
  const [userFields, setUserFields] = useState([]);
  const [fieldCreateModalOpen, setFieldCreateModalOpen] = useState(false);
  const [fieldEditModalOpen, setFieldEditModalOpen] = useState(false);
  const [newField, setNewField] = useState({ name: "", area: "" });
  const [editingField, setEditingField] = useState(null);

  // Estados para Reports y Budgets (ejemplo)
  const [userReports, setUserReports] = useState([]);
  const [userBudgets, setUserBudgets] = useState([]);

  const { store } = useGlobalReducer();
  const token = store.auth.token;

  // Recuperar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/users`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.users || [];
        setUsers(data);
        if (data.length > 0) setSelectedUser(data[0]);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users");
      }
    };
    fetchUsers();
  }, [token]);

  // Filtrar usuarios según searchTerm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener Field asociado al usuario seleccionado
  useEffect(() => {
    if (!selectedUser) return;
    const fetchFields = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser.id}/fields`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fields received:", res.data);
        setUserFields(res.data);
      } catch (err) {
        console.error("Error fetching user fields:", err);
      }
    };
    fetchFields();
  }, [selectedUser, token]);

  // Obtención de Reports
  useEffect(() => {
    if (!selectedUser) return;
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user_reports/${selectedUser.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserReports(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, [selectedUser, token]);

  // Obtención de Budgets
  useEffect(() => {
    if (!selectedUser) return;
    const fetchBudgets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/usuario/${selectedUser.id}/presupuestos`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserBudgets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching budgets:", err);
      }
    };
    fetchBudgets();
  }, [selectedUser, token]);

  const handleCreateUser = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUser({ name: "", email: "", password: "", lastname: "", dni: "", rolId: 1 });
      const updatedUsers = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = Array.isArray(updatedUsers.data)
        ? updatedUsers.data
        : updatedUsers.data.users || [];
      setUsers(data);
      setCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Error creating user");
    }
  };

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
      setEditModalOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Error updating user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/users?id=${userId}`,
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

  // Funciones para Reports
  const handleDeleteReport = async (reportId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete/${reportId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserReports(userReports.filter((report) => report.id !== reportId));
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  // Funciones para Field (CRUD para Tierras)
  const handleCreateField = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fields`,
        newField,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserFields(res.data);
      setNewField({ name: "", area: "" });
      setFieldCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating field:", err);
    }
  };

  const handleUpdateField = async () => {
    if (!editingField) return;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fields/${editingField.id}`,
        editingField,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserFields(res.data);
      setEditingField(null);
      setFieldEditModalOpen(false);
    } catch (err) {
      console.error("Error updating field:", err);
    }
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fields/${fieldId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserFields(null);
    } catch (err) {
      console.error("Error deleting field:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="dashboard-grid">
        {/* Columna de usuarios (30%) */}
        <div className="users-section" style={{ width: "30%" }}>
          <h3 className="section-title">Users</h3>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <ul className="users-list">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => setSelectedUser(user)}
              >
                <span>{user.name}</span>
                {/* Se han removido aquí los botones de acciones */}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="submit-button"
            style={{ marginTop: "1rem" }}
          >
            Create User
          </button>
        </div>

        {/* Detalles del usuario y secciones extra */}
        <div className="user-details-section" style={{ width: "80%" }}>
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

              {/* Aquí se colocan los botones de acciones de usuario */}
              <div className="user-details-actions">
                <button
                  onClick={() => {
                    setEditingUser(selectedUser);
                    setEditModalOpen(true);
                  }}
                  className="action-button edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </div>

              {/* Sección Field (Tierras) */}
              <div className="fields-section">
                <h4 className="section-title">Registered Field</h4>
                {userFields ? (
                  <div>
                    <p>
                      <strong>Name:</strong> {userFields.name}
                    </p>
                    <p>
                      <strong>Area:</strong> {userFields.area}
                    </p>
                    <div className="field-actions">
                      <button
                        onClick={() => {
                          setEditingField(userFields);
                          setFieldEditModalOpen(true);
                        }}
                        className="action-button edit-button"
                      >
                        Edit Field
                      </button>
                      <button
                        onClick={() => handleDeleteField(userFields.id)}
                        className="action-button delete-button"
                      >
                        Delete Field
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>No field found for this user.</p>
                    <button
                      onClick={() => setFieldCreateModalOpen(true)}
                      className="submit-button"
                    >
                      Create Field
                    </button>
                  </div>
                )}
              </div>

              {/* Sección Reports */}
              <div className="extra-info">
                <h4 className="section-title">Reports</h4>
                {userReports.length > 0 ? (
                  <ul className="fields-list">
                    {userReports.map((report) => (
                      <li key={report.id}>
                        <strong>{report.title}</strong> - {report.description}
                        <br />
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}${report.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Report
                        </a>
                        <br />
                        <p><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
                        <button onClick={() => handleDeleteReport(report.id)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reports found.</p>
                )}
              </div>

              {/* Sección Budgets */}
              <div className="budget-section">
                <h4 className="section-title">Budgets</h4>
                {userBudgets.length > 0 ? (
                  <ul className="fields-list">
                    {userBudgets.map((budget) => (
                      <li key={budget.id}>
                        <strong>{budget.description}</strong> - ${budget.cost}
                        <br />
                        <p><strong>Created At:</strong> {new Date(budget.created_at).toLocaleString()}</p>
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/presupuesto/${budget.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No budgets found.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Select a user to view details</p>
          )}
        </div>
      </div>

      {/* Modal para crear usuario */}
      {createModalOpen && (
        <div className="modal-overlay" onClick={() => setCreateModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="section-title">Create New User</h3>
            <div className="create-user-form">
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
              <div className="form-actions">
                <button onClick={handleCreateUser} className="submit-button">
                  Create
                </button>
                <button onClick={() => setCreateModalOpen(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {editModalOpen && editingUser && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="section-title">Edit User</h3>
            <div className="edit-user-form">
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
                  onClick={() => {
                    setEditModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear Field */}
      {fieldCreateModalOpen && (
        <div className="modal-overlay" onClick={() => setFieldCreateModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="section-title">Create Field</h3>
            <div className="create-field-form">
              <input
                type="text"
                placeholder="Name"
                value={newField.name}
                onChange={(e) =>
                  setNewField({ ...newField, name: e.target.value })
                }
                className="form-input"
              />
              <input
                type="text"
                placeholder="Area"
                value={newField.area}
                onChange={(e) =>
                  setNewField({ ...newField, area: e.target.value })
                }
                className="form-input"
              />
              <div className="form-actions">
                <button onClick={handleCreateField} className="submit-button">
                  Create
                </button>
                <button onClick={() => setFieldCreateModalOpen(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar Field */}
      {fieldEditModalOpen && editingField && (
        <div className="modal-overlay" onClick={() => setFieldEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="section-title">Edit Field</h3>
            <div className="edit-field-form">
              <input
                type="text"
                placeholder="Name"
                value={editingField.name}
                onChange={(e) =>
                  setEditingField({ ...editingField, name: e.target.value })
                }
                className="form-input"
              />
              <input
                type="text"
                placeholder="Area"
                value={editingField.area}
                onChange={(e) =>
                  setEditingField({ ...editingField, area: e.target.value })
                }
                className="form-input"
              />
              <div className="form-actions">
                <button onClick={handleUpdateField} className="submit-button">
                  Update
                </button>
                <button onClick={() => {
                  setFieldEditModalOpen(false);
                  setEditingField(null);
                }} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardAdmin;
