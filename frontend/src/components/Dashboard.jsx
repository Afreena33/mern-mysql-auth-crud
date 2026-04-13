import { useEffect, useState } from "react";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems([
      { id: 1, title: "Task 1", description: "Demo task", status: "active" },
      { id: 2, title: "Task 2", description: "Another task", status: "pending" },
    ]);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.title) {
      setError("Title required ❌");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      status: "active",
    };

    setItems([...items, newItem]);
    setForm({ title: "", description: "" });
    setMessage("Item added ✅");
    setError("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;

    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    setMessage("Deleted ✅");
    setError("");
  };

  const handleUpdate = () => {
    const updated = items.map((item) => {
      if (item.id === editingItem.id) {
        return editingItem;
      }
      return item;
    });

    setItems(updated);
    setEditingItem(null);
    setMessage("Updated ✅");
    setError("");
  };

  // ✅ STATS CALCULATION
  const total = items.length;
  const active = items.filter(i => i.status === "active").length;
  const pending = items.filter(i => i.status === "pending").length;
  const completed = items.filter(i => i.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Alerts */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Dashboard
        </h1>

        {/* ✅ STATS UI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-blue-100 p-4 rounded text-center">
            <p>Total</p>
            <h2 className="text-xl font-bold">{total}</h2>
          </div>

          <div className="bg-green-100 p-4 rounded text-center">
            <p>Active</p>
            <h2 className="text-xl font-bold">{active}</h2>
          </div>

          <div className="bg-yellow-100 p-4 rounded text-center">
            <p>Pending</p>
            <h2 className="text-xl font-bold">{pending}</h2>
          </div>

          <div className="bg-purple-100 p-4 rounded text-center">
            <p>Completed</p>
            <h2 className="text-xl font-bold">{completed}</h2>
          </div>

        </div>

        {/* Add Form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {/* Items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 p-4 rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>

              {/* ✅ STATUS */}
              <p className="text-sm text-gray-500">
                Status: {item.status}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="bg-yellow-400 px-3 py-1 rounded text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">

            <h2 className="text-lg font-bold mb-4">Edit Item</h2>

            <input
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  title: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-2"
            />

            <input
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;