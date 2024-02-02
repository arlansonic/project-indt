import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accessLevel: "",
  });
  const userAccessLevel = localStorage.getItem("accessLevel");
  const isUserAdmin = userAccessLevel === "admin";
  const isUser = userAccessLevel === "user";
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUsers(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessLevel");
    navigate("/");
  };  

  const handleSelectUser = (userId) => {
    if (selectedUserId === userId) {
      setEditMode(false);
      setSelectedUserId(null);
    } else {
      const selectedUser = users.find((user) => user.id === userId);
      if (selectedUser) {
        setUserFormData({
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          accessLevel: selectedUser.accessLevel,
        });
        setSelectedUserId(userId);
        setEditMode(true);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.patch(
      `http://localhost:3000/users/${selectedUserId}`,
      userFormData
    );
    setEditMode(false);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    await axios.delete(`http://localhost:3000/users/${userId}`);
    fetchUsers();
  };

  const handleChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Gerenciamento de Usuários</h1>
      </div>
      <div>
        <ul className="user-list">
          {users.map((user) => (
            <div className="user-item">
              {user.firstName} {user.lastName} - {user.email}
              {(isUserAdmin || (isUser && user.id === selectedUserId)) && (
                <div className="user-item" key={user.id}>
                  <button onClick={() => handleSelectUser(user.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user.id)}>Deletar</button>
                  {editMode && selectedUserId === user.id && (
                    <form onSubmit={handleUpdate} className="edit-form">
                      <input
                        type="text"
                        name="firstName"
                        value={userFormData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={userFormData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={userFormData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      <select
                        name="accessLevel"
                        value={userFormData.accessLevel}
                        onChange={handleChange}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button type="submit">Atualizar Usuário</button>
                    </form>
                  )}
                </div>
              )}
              <div className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
