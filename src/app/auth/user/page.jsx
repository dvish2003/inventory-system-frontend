'use client'
import toast from "react-hot-toast";
import { apiClient } from "../../../lib/apiClient";
import React, { useState, useEffect } from "react";

const User = () => {

  const [users, setUsers] = useState([]);

  const initialForm = {
    name: "",
    email: "",
    password: "",
    role: "Staff"
  };

  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getAllUsers = async () => {
    const res = await apiClient("/user/getAllUsers");
    return res.data;
  };

  useEffect(() => {
    const load = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    load();
  }, []);

  const handleRowClick = (user, index) => {
  setForm(user);
  setEditIndex(index);
};

const handleEdit = (user, index) => {
  setForm(user);
  setEditIndex(index);
};

 const handleSave = async () => {
  if (!form.name || !form.email) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (editIndex !== null) {
      const response = await apiClient('/user/updateUser', 'POST', form);
      if (response.status === 'success') {
        toast.success("User updated successfully");
        const updatedUsers = [...users];
        updatedUsers[editIndex] = form;
        setUsers(updatedUsers);
      } else {
        toast.error("Failed to update user");
      }
    } else {
      // Create new user
      const response = await apiClient('/user/saveUser', 'POST', form);
      if (response.status === 'success') {
        toast.success("User saved successfully");
        const data = await getAllUsers();
        setUsers(data);
      } else {
        toast.error("Failed to save user");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    clearForm();
  }
};


const handleDelete = async (email) => {
  const newForm = {
    name: "",
    email: email,
    password: "",
    role: ""
  };

  try {
    const response = await apiClient('/user/deleteUser', 'POST', newForm);

    if (response.status === 'success') {
      toast.success("User deleted successfully");
      setUsers(users.filter(user => user.email !== email));
      clearForm();
    } else {
      toast.error("User could not be deleted");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while deleting the user");
  }
};

  const clearForm = () => {
    setForm(initialForm);
    setEditIndex(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <select
            name="role"
            value={form.role || "Staff"}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>

        </div>

        <div className="mt-4 flex gap-3">

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Save
          </button>

          <button
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Clear
          </button>

        </div>

      </div>

      <table className="w-full border">

        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (
           <tr 
  key={index} 
  className="border-t text-center hover:bg-gray-100 cursor-pointer"
  onClick={() => handleRowClick(user, index)}
>
  <td className="p-2">{user.name}</td>
  <td>{user.email}</td>
  <td>{user.password}</td>
  <td>{user.role}</td>
  <td className="space-x-2">
    <button
      onClick={(e) => { e.stopPropagation(); handleEdit(user, index); }}
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      Edit
    </button>
    <button
      onClick={(e) => { e.stopPropagation(); handleDelete(user.email); }}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  </td>
</tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default User;