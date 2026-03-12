'use client'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";

const Inventory = () => {

  const initialForm = {
    id: "",
    name: "",
    code: "",
    quantity: "",
    description: "",
    place_id: "",
    status: "In-Store"
  };

  const [form, setForm] = useState(initialForm);
  const [inventories, setInventories] = useState([]);
  const [places, setPlaces] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getInventories = async () => {
    const res = await apiClient("/inventory/getAll");
    setInventories(res.data);
  };

  const getPlaces = async () => {
    const res = await apiClient("/place/getAll");
    setPlaces(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getInventories();
    getPlaces();
  }, []);

  const handleSave = async () => {

    if (!form.name || !form.quantity || !form.place_id) {
      toast.error("Please fill required fields");
      return;
    }

    try {

      if (form.id) {

        const response = await apiClient("/inventory/update", "POST", form);

        if (response.status === "success") {
          toast.success("Inventory updated successfully");
          getInventories();
        }

      } else {

        const response = await apiClient("/inventory/save", "POST", form);

        if (response.status === "success") {
          toast.success("Inventory saved successfully");
          getInventories();
        } else {
          toast.error(response.message);
        }

      }

      clearForm();

    } catch (error) {
      toast.error("Something went wrong");
    }

  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleDelete = async (id) => {

    try {

      const response = await apiClient("/inventory/delete", "POST", { id });

      if (response.status === "success") {
        toast.success("Inventory deleted successfully");
        getInventories();
      }

    } catch {
      toast.error("Delete failed");
    }

  };

  const clearForm = () => {
    setForm(initialForm);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      <div className="bg-gray-100 p-6 rounded mb-6">

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="code"
            placeholder="Item Code"
            value={form.code}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="place_id"
            value={form.place_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Place</option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="In-Store">In-Store</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Damaged">Damaged</option>
            <option value="Missing">Missing</option>
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
            <th>Code</th>
            <th>Quantity</th>
            <th>Place</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {inventories.map((item) => (
            <tr key={item.id} className="border-t text-center">

              <td className="p-2">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.code}</td>
              <td>{item.quantity}</td>
              <td>{item.place_id}</td>
              <td>{item.status}</td>

              <td className="space-x-2">

                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
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

export default Inventory;