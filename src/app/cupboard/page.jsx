'use client'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";

const Cupboard = () => {

  const initialForm = {
    id: "",
    name: "",
    location: ""
  };

  const [form, setForm] = useState(initialForm);
  const [cupboards, setCupboards] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getAllCupboards = async () => {
    const res = await apiClient("/cupboard/getAll");
    setCupboards(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllCupboards();
  }, []);

  const handleSave = async () => {

    if (!form.name || !form.location) {
      toast.error("Fill all fields");
      return;
    }

    try {

      if (form.id) {
        const response = await apiClient("/cupboard/update", "POST", form);

        if (response.status === "success") {
          toast.success("Cupboard updated");
          getAllCupboards();
        }

      } else {

        const response = await apiClient("/cupboard/save", "POST", form);

        if (response.status === "success") {
          toast.success("Cupboard saved");
          getAllCupboards();
        }

      }

      clearForm();

    } catch (error) {
      toast.error("Something went wrong");
    }

  };

  const handleEdit = (cupboard) => {
    setForm(cupboard);
  };

  const handleDelete = async (id) => {

    try {

      const response = await apiClient("/cupboard/delete", "POST", { id });

      if (response.status === "success") {
        toast.success("Cupboard deleted");
        getAllCupboards();
      }

    } catch (error) {
      toast.error("Delete failed");
    }

  };

  const clearForm = () => {
    setForm(initialForm);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">Cupboard Management</h1>

      <div className="bg-gray-100 p-6 rounded mb-6">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Cupboard Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <div className="flex gap-3 mt-4">

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {form.id ? "Update" : "Save"}
          </button>

          <button
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

        </div>

      </div>

      <table className="w-full border">

        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {cupboards.map((cupboard) => (
            <tr key={cupboard.id} className="border-t text-center">

              <td className="p-2">{cupboard.id}</td>
              <td>{cupboard.name}</td>
              <td>{cupboard.location}</td>

              <td className="space-x-2">

                <button
                  onClick={() => handleEdit(cupboard)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cupboard.id)}
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

export default Cupboard;