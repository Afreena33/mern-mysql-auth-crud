import API from "./axios";

// Get all items
export const getItems = () => API.get("/items");

// Create item
export const createItem = (data) =>
  API.post("/items", data);

// Update item
export const updateItem = (id, data) =>
  API.put(`/items/${id}`, data);

// Delete item
export const deleteItem = (id) =>
  API.delete(`/items/${id}`);

// Stats
export const getStats = () =>
  API.get("/stats");