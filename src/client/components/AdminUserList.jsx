import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (response.success) {
          setUsers(response.data.users);
        } else {
          throw new Error(response.error.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }
    getUsers();
  }, []);

  const filteredUsers = searchParams
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchParams.toLowerCase())
      )
    : users;

  return (
    <>
      <h1>Admin User List</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/admin/products">Manage Products</Link>
      </div>
      <div>
        Search:{" "}
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminUserList;
