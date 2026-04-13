const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// ERROR HANDLER
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  console.error(err); // show error in terminal

  res.status(err.status || 500).json({
    msg: err.message || "Internal Server Error"
  });
});