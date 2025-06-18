// frontend/src/App.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API_URL = process.env.REACT_APP_API_URL; // dari .env frontend

  // Gunakan useCallback agar tidak bikin warning di useEffect
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/getUsers`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [API_URL]); // dependency di sini karena pakai API_URL

  const [major, setMajor] = useState("");

  const handleAdd = async () => {
    if (name) {
      try {
        await axios.post(`${API_URL}/addUser`, { Name: name, Major: major });
        setName("");
        setMajor(""); // clear major
        fetchUsers();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // tidak error lagi karena pakai useCallback

  return (
    <div style={{ padding: 20 }}>
      <h1>User List</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="Enter major (optional)"
      />
      <button onClick={handleAdd}>Add User</button>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.Name} - {u.Major || "No Major"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
