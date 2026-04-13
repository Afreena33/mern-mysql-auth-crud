const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getStats,
} = require("../controllers/itemController");

router.get("/", auth, getItems);
router.post("/", auth, createItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);
router.get("/stats", auth, getStats);

module.exports = router;