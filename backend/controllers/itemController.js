const db = require("../config/db");

// GET items
const getItems = async (req, res) => {
  const [items] = await db.query("SELECT * FROM items WHERE user_id=?", [
    req.user.id,
  ]);
  res.json(items);
};

// CREATE item
const createItem = async (req, res) => {
  const { title, description, status } = req.body;

  await db.query(
    "INSERT INTO items (title, description, status, user_id) VALUES (?, ?, ?, ?)",
    [title, description, status, req.user.id]
  );

  res.json({ msg: "Item created" });
};

// UPDATE item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  await db.query(
    "UPDATE items SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, id]
  );

  res.json({ msg: "Item updated" });
};

// DELETE item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM items WHERE id=?", [id]);

  res.json({ msg: "Item deleted" });
};

// STATS API
const getStats = async (req, res) => {
  const [total] = await db.query(
    "SELECT COUNT(*) as total FROM items WHERE user_id=?",
    [req.user.id]
  );

  const [active] = await db.query(
    "SELECT COUNT(*) as active FROM items WHERE status='active' AND user_id=?",
    [req.user.id]
  );

  const [pending] = await db.query(
    "SELECT COUNT(*) as pending FROM items WHERE status='pending' AND user_id=?",
    [req.user.id]
  );

  const [completed] = await db.query(
    "SELECT COUNT(*) as completed FROM items WHERE status='completed' AND user_id=?",
    [req.user.id]
  );

  res.json({
    total: total[0].total,
    active: active[0].active,
    pending: pending[0].pending,
    completed: completed[0].completed,
  });
};
module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getStats,
};