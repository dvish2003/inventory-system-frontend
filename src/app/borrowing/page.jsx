'use client'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";

const Borrowing = () => {

  const initialForm = {
    id: "",
    inventory_item_id: "",
    borrower_name: "",
    contact_details: "",
    borrow_date: "",
    expected_return_date: "",
    quantity_borrowed: "",
    status: "Borrowed"
  };

  const [form, setForm] = useState(initialForm);
  const [borrowings, setBorrowings] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getBorrowings = async () => {
    const res = await apiClient("/borrowing/getAll");
    setBorrowings(res.data);
  };

  const getInventoryItems = async () => {
    const res = await apiClient("/inventory/getAll");
    setInventoryItems(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBorrowings();
    getInventoryItems();
  }, []);

  const handleSave = async () => {

    if (!form.inventory_item_id || !form.borrower_name || !form.quantity_borrowed) {
      toast.error("Please fill required fields");
      return;
    }

    try {

      if (form.id) {

        const response = await apiClient("/borrowing/update", "POST", form);

        if (response.status === "success") {
          toast.success("Borrowing updated");
          getBorrowings();
        }

      } else {

        const response = await apiClient("/borrowing/save", "POST", form);

        if (response.status === "success") {
          toast.success("Borrowing saved");
          getBorrowings();
        }

      }

      clearForm();

    } catch {
      toast.error("Something went wrong");
    }

  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleDelete = async (id) => {

    try {

      const response = await apiClient("/borrowing/delete", "POST", { id });

      if (response.status === "success") {
        toast.success("Borrowing deleted");
        getBorrowings();
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

      <h1 className="text-2xl font-bold mb-6">Borrowing Management</h1>

      <div className="bg-gray-100 p-6 rounded mb-6">

        <div className="grid grid-cols-3 gap-4">

          <select
            name="inventory_item_id"
            value={form.inventory_item_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Inventory Item</option>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
{item.name} (Available: {item.quantity})
</option>
            ))}
          </select>

          <input
            type="text"
            name="borrower_name"
            placeholder="Borrower Name"
            value={form.borrower_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="contact_details"
            placeholder="Contact Details"
            value={form.contact_details}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="borrow_date"
            value={form.borrow_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="expected_return_date"
            value={form.expected_return_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="quantity_borrowed"
            placeholder="Quantity"
            value={form.quantity_borrowed}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Late">Late</option>
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
            <th>Item</th>
            <th>Borrower</th>
            <th>Contact</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {borrowings.map((item) => (
            <tr key={item.id} className="border-t text-center">

              <td className="p-2">{item.id}</td>
              <td>{item.inventory_item_id}</td>
              <td>{item.borrower_name}</td>
              <td>{item.contact_details}</td>
              <td>{item.borrow_date}</td>
              <td>{item.expected_return_date}</td>
              <td>{item.quantity_borrowed}</td>
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

export default Borrowing;