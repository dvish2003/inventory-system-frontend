'use client'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";

const Place = () => {

  const initialForm = {
    id: "",
    name: "",
    cupboard_id: ""
  };

  const [form, setForm] = useState(initialForm);
  const [places, setPlaces] = useState([]);
  const [cupboards, setCupboards] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getCupboards = async () => {
    const res = await apiClient("/cupboard/getAll");
    setCupboards(res.data);
  };

  const getPlaces = async () => {
    const res = await apiClient("/place/getAll");
    setPlaces(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCupboards();
    getPlaces();
  }, []);

  const handleSave = async () => {

    if (!form.name || !form.cupboard_id) {
      toast.error("Fill all fields");
      return;
    }

    try {

      if (form.id) {

        const response = await apiClient("/place/update", "POST", form);

        if (response.status === "success") {
          toast.success("Place updated");
          getPlaces();
        }

      } else {

        const response = await apiClient("/place/save", "POST", form);

        if (response.status === "success") {
          toast.success("Place saved");
          getPlaces();
        }

      }

      clearForm();

    } catch (error) {
      toast.error("Something went wrong");
    }

  };

  const handleEdit = (place) => {
    setForm(place);
  };

  const handleDelete = async (id) => {

    try {

      const response = await apiClient("/place/delete", "POST", { id });

      if (response.status === "success") {
        toast.success("Place deleted");
        getPlaces();
      }

    } catch {
      toast.error("Delete failed");
    }

  };

  const clearForm = () => {
    setForm(initialForm);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">Place Management</h1>

      <div className="bg-gray-100 p-6 rounded mb-6">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Place Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="cupboard_id"
            value={form.cupboard_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Cupboard</option>
            {cupboards.map((cupboard) => (
              <option key={cupboard.id} value={cupboard.id}>
                {cupboard.name}
              </option>
            ))}
          </select>

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
            <th>Cupboard ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {places.map((place) => (
            <tr key={place.id} className="border-t text-center">

              <td className="p-2">{place.id}</td>
              <td>{place.name}</td>
              <td>{place.cupboard_id}</td>

              <td className="space-x-2">

                <button
                  onClick={() => handleEdit(place)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(place.id)}
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

export default Place;