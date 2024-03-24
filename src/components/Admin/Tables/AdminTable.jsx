import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./User.css";

const AdminTable = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/listAdmin');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error, e.g., display error message to the user
    }
  };
  return (
    <div>
      <div className="user-table-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>AdminName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.adminName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default AdminTable
